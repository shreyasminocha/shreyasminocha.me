---
title: A rather complete regex to match dates
description: Stretching the limits of regular expressions.
date: 2018-08-16
tags: [regex, programming]
---

Inspired by a (now deleted) question on StackOverflow.

Someone on StackOverflow was attempting to match dates with a regular expression in PHP. I decided to take on the task of constructing this regex for fun.

This post is a slightly longer version of my answer to the question.

## Problem statement

Construct a regex to match dates of the form `YYYY-MMM-DD`.

### Conditions to satisfy

-   `YYYY` is between 1900 and 9999 inclusive.
-   `MMM` is one of `JAN`, `FEB`, `MAR` etc.
-   `00` should not be a valid `DD`
-   Only valid dates for each month should work.
-   `FEB-29` should be matched only for leap years. Keep in mind that [100 and 400 divisibility rules](//stackoverflow.com/questions/725098/leap-year-calculation) for leap year detection should also be satisfied.

### Examples

Should match:

-   `1920-JAN-31`
-   `2001-NOV-21`
-   `1920-FEB-29`
-   `1921-FEB-28`
-   `1920-FEB-28`
-   `9920-FEB-28`
-   `2920-FEB-28`

Shouldn't match:

-   `2900-FEB-29`
-   `1921-FEB-29`
-   `1920-JAN-35`
-   `1920-FEB-30`
-   `1920-FEB-31`
-   `1920-FOO-28`
-   `1920-APR-31`
-   `1820-NOV-02`
-   `1920-NOV-00`

## Solution

### TLDR;

```txt
^((?!(?:[02468][^048]|[13579][^26])00-FEB-29)(?:19|[2-9]\d)(?!(?:[02468][^048]|[13579][^26])-FEB-29)\d\d)-(?!FEB-3[01])(?!APR-31)(?!JUN-31)(?!SEP-31)(?!NOV-31)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-(?!00)((?:[0-2][0-9]|3[01]))$
```

238 characters. I could probably cut it down a little more if I removed the capture groups for the components and removed `?:`'s from some groups.

### Explanation

This explanation is intended for people who already have familiarity with regex rules. If that's not you, you might want to learn those first. You could start with rexegg.com.

```js
^    // beginning of line

(    // capture group for year
    (?!    // match leap date for multiples of 400 but not for other multiples of 100
        (?:
            [02468][^048]|[13579][^26]    // clever hack based on a pattern in 4's multiples
        )

        00-FEB-29
    )

    (?:19|[2-90]\d)    // match years from 1900 to 9999

    (?!    // do not match years not divisible by 4
        (?:
            [02468][^048]|[13579][^26]    // same hack as earlier
        )

        -FEB-29
    )

    \d\d
)

-    // separator

// do not match dates beyond the month's last

(?!FEB-3[01])
(?!(?:APR|JUN|SEP|NOV)-31)


(    // capture group for month
    JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC
)

-    // separator

(?!00)    // do not match a zero date

(    // capture group for date
    (?:[0-2][0-9]|3[01])    // 00–29 or 30–31
)

$    // end of line
```

I didn't explain the "clever hack" for leap year detection above. I'll do that now.

All two digit multiples of 4 are either an even digit followed by one of `0`, `4`, `8` or an odd digit followed by one of `2` and `6`. Since we're using a negative lookahead to check for invalid years, we negate this condition to arrive at `[02468][^048]|[13579][^26]`. This pattern is used twice. Once for the first two digits of the year (because `XY00` years are leap only when `XY` is a multiple of 4) and once for the last two digits of the year (because a year is not leap if its last two digits are not divisible by four).

---

Was that fun? Absolutely! Is this approach practical? Hell no!

Play with this regex on [my RegExr demo](//regexr.com/3tdu7).
