---
title: Removing Tracking Query Parameters Using uBlock Origin
description: Highlighting the wonderful "URL Tracking Protection" list available through uBlockOrigin
date: 2026-03-06
tags: [web, privacy]
---

You may have seen long, nasty URLs like this:

```txt
https://example.com/foo/bar?
  utm_source=facebook
  &utm_medium=paid_social
  &utm_campaign=black_friday_2026
  &utm_content=video_ad_v3
  &fbclid=jP9E9BgKicVDj2lxq
  &gclid=aHwni74nifKEVggf
  &segment=cart_abandoner_7d
  &ab=checkout_v2
```

You may know that the parts of the URL that look like `&utm_medium=paid_social` are called [query parameters](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Query).
You may know that some of these, such as `utm_source`, are typically used for analytics and tracking.
You may have heard that you should [remove these before sharing URLs](https://activistchecklist.org/links/).
But not all query parameters are semantically redundant, and trial-and-error to remove the "useless" and privacy-invasive ones can be tedious.

uBlock Origin supports a filter List called "AdGuard/uBO - URL Tracking Protection" which strips well-known tracking query parameters.
It uses a [volunteer-built list](https://github.com/uBlockOrigin/uAssets/blob/master/filters/privacy-removeparam.txt) to do this.
It can be enabled under "Filter lists" on uBO's preferences page.

![Hovering over the checkbox for the 'AdGuard/uBO – URL Tracking Protection' list on the 'Filter lists' tab on uBlockOrigin's preferences page](/img/removing-tracking-query-params/ubo-url-tracking-protection.png)

The [filter syntax to remove a query parameter](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#removeparam) looks like this:

```txt
||imdb.com$removeparam=ref_
```

This filter removes the parameter `ref_=...` from URLs on `imdb.com` and its subdomains.
If you omit the part before the `$`, the filter would apply to every URL.
You can add your own filters under "My filters".
The [uAssets filter repository](https://github.com/uBlockOrigin/uAssets) also accepts contributions.
