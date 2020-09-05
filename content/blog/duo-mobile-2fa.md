---
title: Duo Mobile 2FA? HOTP with extra steps
description: Studying a reverse-engineered app to understand how Duo obfuscates HOTP to artificially introduce incompatibility.
date: 2020-09-05
tags: [programming]
---

I needed to set up [Duo](https://duo.com)-based Two Factor Authentication (2FA) for my University's Single Sign-On. Duo has a mobile app option, which functions almost identically to ordinary HOTP 2FA. They insist on having users install [their mobile app](https://guide.duo.com/android). Since I already used [andOTP](https://github.com/andOTP/andOTP) for 2FA, however, I figured I could use that for this too. To my surprise, andOTP didn't recognize the QR code or the secret that Duo generated. I eventually gave up and set up a [security key](https://en.wikipedia.org/wiki/Universal_2nd_Factor), skipping the mobile-based OTP option altogether.

> Ditching perfectly adequate open standards and making the replacements proprietary, incompatible, and inaccessible.

A few weeks later, I came across an app named ['DuOTP'](https://f-droid.org/en/packages/net.scintill.duotp) on [FDroid](https://f-droid.org) which promised to make Duo work with regular OTP apps like andOTP and Authy. Sure enough, it worked! Apparently Duo uses [HOTP](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm)—an open standard—under the hood but wraps it with their own API[^1]. I can only assume that this additional layer serves the sole purpose of making their codes outwardly incompatible with other 2FA token generating apps and introducing a dependence on their mobile app[^2].

[^1]: Pretty sure it's an undocumented API too.
[^2]: Unsurprisingly, it's proprietary.

Tactics of this sort aren't uncommon, unfortunately. Ditching perfectly adequate open standards and making the replacements proprietary, incompatible, and inaccessible. This particular case is particularly ridiculous since Duo didn't even reinvent 2FA—they just added a layer of obfuscation around it!

I looked through [DuOTP's source code](https://github.com/scintill/DuOTP-android) (which in turn takes hints from [this script](https://github.com/revalo/duo-bypass)) to see how it does its *magic*.

{{< img src="/img/duo-mobile-2fa/qr.png" caption="Duo QR code screen" alt="'Activate Duo Mobile for Android' followed by a QR code and a set of instructions" >}}

Scanning the QR code, we get `g2FnOKPFmFNBoHXvPt7u-YXBpLWIwY2Q0MWVmLmR1b3NlY3VyaXR5LmNvbQ`.

This has two components, separated by a hyphen:

-   `g2FnOKPFmFNBoHXvPt7u`: the Duo secret
-   `YXBpLWIwY2Q0MWVmLmR1b3NlY3VyaXR5LmNvbQ`: the API domain, base64-encoded, to which we'll make a request shortly

Decoding the domain:

```sh
$ echo 'YXBpLWIwY2Q0MWVmLmR1b3NlY3VyaXR5LmNvbQ==' | base64 --decode
api-b0cd41ef.duosecurity.com
```

We now want to make a `POST` request to `/push/v2/activation/:secret`. You can make the `POST` request without a body. I assume that this request activates the generated OTP for the user's account, in addition to just returning data about the secret.

```sh
$ http post https://api-b0cd41ef.duosecurity.com/push/v2/activation/g2FnOKPFmFNBoHXvPt7u
```

These are the response headers:

```http
HTTP/1.1 200 OK
Cache-Control: no-store
Connection: keep-alive
Content-Encoding: gzip
Content-Security-Policy: default-src 'self'; frame-src 'self' ; img-src 'self' ; connect-src 'self'
Content-Type: application/json
Date: Fri, 21 Aug 2020 18:58:08 GMT
Pragma: no-cache
Server: Duo/1.0
Strict-Transport-Security: max-age=31536000
Transfer-Encoding: chunked
```

More importantly, here's the JSON body of the response (with some fields redacted):

```json
{
    "response": {
        "akey": "********************",
        "customer_name": "*****",
        "force_disable_analytics": false,
        "has_backup_restore": true,
        "has_bluetooth_approve": false,
        "has_trusted_endpoints": false,
        "has_trusted_endpoints_permission_flow": false,
        "hotp_secret": "1013b66b8c3fa2b9e4cfd6537c66136b",
        "instant_restore_status": "disabled",
        "pkey": "********************",
        "reactivation_token": "********************************",
        "requires_fips_android": false,
        "requires_mdm": 0,
        "security_checkup_enabled": false,
        "urg_secret": "********************************"
    },
    "stat": "OK"
}
```

Perhaps the most important field of the response body is `.response.hotp_secret`. We've finally acquired the HOTP secret! We can now use this secret in OTP generators that aren't Duo Mobile.

An additional step that the DuOTP app performs is the generation of an [`otpauth` URI](https://github.com/google/google-authenticator/wiki/Key-Uri-Format), which any OTP app worth its salt supports opening.

```js
`otpauth://hotp/${encodeURIComponent(username)}?secret=${base32.encode(hotpSecret)}&issuer=${encodeURIComponent(customerName)}&counter=0`
```

When DuOTP attempts to open the generated URI, the user will be prompted to choose one of the OTP apps installed on their phone and the app will then take it from there.
