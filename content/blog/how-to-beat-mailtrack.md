---
title: How to beat MailTrack
description: How to avoid being tracked from within your inbox and why you shouldn't be using mail tracking anyway.
date: 2019-09-04
tags: [privacy, tips]
---

You're probably aware of MailTrack and other similar services that allow you to track whether the recipient of your email has read it. Several newsletters and marketing emails also come with similar forms of tracking. Through this post, I'll:

1. Explain how email tracking works.
2. Tell you how you can avoid it.
3. Try to convince you to not use mail tracking, at least in your personal interactions.
4. Bonus: try to convince you to use plaintext email for most intents.

## How (most) email tracking works

The basis of MailTrack is a tiny image that is loaded remotely. This is different from attachments, mind you. Most emails we send and receive are sent across as HTML (aka "rich text") by default. Here's a line from the "source code" of a MailTrack-enabled email I received.

```html
<img width=3D"0" height=3D"0" class=3D"mailtrack-img" alt=3D"" style=3D"display:flex" src=3D"https://mailtrack.io/trace/mail/b*****2=812bf8e***************2d4db84f091.png?u=3D7*****">
```

To quote [MailTrack's blog post](//mailtrack.io/blog/email-tracking):

> Email marketing tools … add a web beacon to their senders’ email in order to tell if recipients have opened the email or not. This beacon consists of a small image pixel that is loaded from the service provider’s web server.

The fact that the image with a unique URL—identifying both the thread and the sender (`?u=`)—was *loaded at all*, signals to MailTrack (or any other service) that the email was opened.

## How to avoid mail tracking

To quote [MailTrack's blog post](//mailtrack.io/blog/email-tracking) once again:

> The efficiency of email tracking technology has increased substantially over the last several years, due to the tendency of email servers to [show images by default](https://mailtrack.io/blog?p=336).

This suggests that disabling the loading of images by default, pixel-based tracking can be avoided. And indeed, it works.

### ProtonMail

_Settings_, _Account_, _Email Content_, _Load remote content_, "Manual".

### Gmail

_Settings_, _General_, _Images_, "Ask before displaying external images - This option also disables dynamic email."

### Mail for macOS

_Preferences_, _Viewing_, uncheck "Load remote content in messages"

Some of the better email clients have this setting disabled by default.

**Note**: Disabling loading of images is not fool-proof. HTML mail opens up other tracking (and attacking) vectors too, from what I know.

## Why you shouldn't, in my opinion, use mail tracking

Emails were never meant to be tracked. Email isn't meant to be a real-time medium of communication—we have a ton of tools (Signal, Telegram, and professionally Slack) for that. Tracking emails is an *invasion of your recipients' privacy*. I've heard of people getting asked for justifications for having opened emails (as reported by MailTrack), but not having replied. It's email, not texting. Mail tracking can also create *trust deficits*. It may also warp the dynamics of email conversations for the worse.

Don't track email. Trust your recipients.

## Do you really need HTML email though?

For most intents and purposes, HTML mail is overkill and plaintext mail is just fine. Inline images can be replaced by attachments. There are plenty of ways to emphasize without HTML email—`*an* _example_ of /ways to emphasize/ with **plaintext**`. They're more accessible and their potential for hiding attack vectors is a lot lower than that of HTML email. A valid exception to this rule, perhaps, would be marketing emails and newsletters. Even with those, care should be taken to include a plaintext version for users that might prefer (or have no choice but to use) plaintext email.

### See also

- [useplaintext.email](//useplaintext.email) summaries the arguments for plaintext email a lot better than I do. The [related HackerNews thread](//news.ycombinator.com/item?id=20513987) is probably also worth reading.
