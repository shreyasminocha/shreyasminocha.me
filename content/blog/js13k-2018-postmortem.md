---
title: JS13kGames 2018 Postmortem
description: A reflection on my experiences participating in JS13kGames 2018
date: 2018-09-23
tags: [js13kgames, reflection]
---

As you’ll find out, the phrase “[postmortem](//www.merriam-webster.com/dictionary/postmortem)” is quite apt for this write-up.

{{< figure src="/img/js13k-2018-postmortem/wifihunt.jpeg" alt="Screenshot of WifiHunt" caption="The game in action" >}}

I finally managed to participate this year.

Out of my excitement for the competition, I spent some days running up to the competition building a [Gulp workflow](//github.com/shreyasminocha/js13k-boilerplate) based off [Ayman Farhat's boilerplate](//github.com/aymanfarhat/js13k-starter) for the competition.

I quite liked the theme “offline” and I spent around three days  brainstorming and looking for inspiration.

{{< figure src="/img/js13k-2018-postmortem/brainstorming.jpeg" caption="Brainstorming" alt="A Mindmap of my initial ideas" >}}

Eventually, I settled on an idea: an exploratory game with the objective is to look for WiFi networks in the wild and complete download and upload goals. I spent the rest of the week making some notes about my game’s features, gameplay etc. This being my first time creating a game or even working with HTML5 Canvas, I had no idea how feasible my plans would be in terms of time. Moreover, as a first time code golf game jam entrant, I couldn’t estimate how much code I would be able to fit into the thirteen kilobyte[^1] limit. In retrospect, I should have started coding earlier and figured out the finer details along the way.

By day ten, I had barely written any code (big mistake). I had, however, made a list of some WiFi networks for the game and had a nice set of notes detailing my game’s features. Unfortunately, I had school going on throughout the competition which resulted in me getting a lot less time to work on my entry. Notable commitments at that time were my Yearbook work, mid-year exam (which began on September 11) preparation and SAT (which I’ll be giving on October 6) preparation.

My strategy was to first complete the logical aspects of my game and then get into the graphics. That _might_ have worked well had I started coding a _bit_ earlier than I did. It being my first time building a game, I decided to use [Kontra](//straker.github.io/kontra/download). That did make my work a bit easier while making me slightly guilty about “cheating”. I made up for the guilt by inspecting Kontra’s source code. I’ll probably do without it next year.

By day twelve, I had written a prototype of my `AccessPoint` class. By day eighteen, I was (or at least felt I was) done with the logical component of my game. I began working on the game’s graphics on day twenty-two. This part was more challenging and consequently more rewarding. I even posted a message in the [JS13k slack](//js13kgames.slack.com) about the very small success of getting a simple colour changing battery indicator to work (I had never used `ctx.fillRect` in the past 😛). By day twenty-three, I had implemented most indicators and dialog boxes. With one week left to the deadline, last minute panic set in.

In the final week, I made way too many compromises to meet the deadline. The first thing I ditched was my plan of drawing the road in perspective. I found getting the mathematics of drawing the road at arbitrary angles of rotation to be quite a challenge. I didn't have time for it. I ditched powerups (battery boost, extra money etc), shading the network indicator according to signal strength and jittery, more realistic network speeds. I also didn’t have time for trial-like networks wherein they’re free for `x` seconds but paid after that. Perhaps the most glaring flaw in my submission is the drawing of trees at angles. I was trying to get this right a couple of hours before the deadline but in vain. I should have probably spent those last few hours fixing issues more fundamental to gameplay such as clipping the player within a definite radius of the centre to avoid confusion caused by an empty network list. I also wish I had spent more time coming up with more networks of each type. And yikes, in all the rush I forgot to implement a “Game Over: you won/lost” screen 😱

I was working on the game till five minutes before the deadline and submitted just two minutes short of the deadline. I didn’t even get to test the game or have someone play it in front of me. This was another one of my biggest mistakes. I didn't even know if my game is beatable! Next time I’ll try to get my game to a stage where it is “playable” a bit early on so that my entry can benefit more from others’ feedback.

{{< figure src="/img/js13k-2018-postmortem/ryan's-feedback.jpeg" caption="Ryan's feedback on my game" >}}

{{< figure src="/img/js13k-2018-postmortem/jupi's-feedback.jpeg" caption="Jupi's replies on Slack" >}}

> TFW you install `advzip` thinking that you’ll shave-off some last bytes and feel good about yourself but you end up not even completing your game.
>
> —Me on the JS13k Slack

While school, studies and my lack of time management resulted in my entry not living up to my standards, this post would be incomplete without acknowledging how much I got out of the whole experience. I gained not only technical knowledge but also confidence. I ventured out to do something I’d never done in the past and while everything didn’t go as I had planned, I managed to submit a playable game in time. I got satisfaction out of even the smallest of successes, especially those in graphics. It was definitely fun.

I’d like to shout out to the lovely people on the [JS13k Slack](//js13kgames.slack.com), especially @herebefrogs, @xem, @end3r, @the_coder, @madmarcel, @udxs and @kamyl (I’m very sorry if I’ve missed someone out). You assisted, motivated and encouraged me. At first, your knowledge intimated me but later it inspired me. To be honest, I wouldn’t have got this far without you guys.

{{< figure src="/img/js13k-2018-postmortem/love-you-all.jpeg" caption="Thanks for the help!" alt="Asking for advice on the Slack" >}}

You can find my [submitted entry](//2018.js13kgames.com/entries/wifihunt) on [the competition’s website](//2018.js13kgames.com) and the [source code](//github.com/shreyasminocha/WiFiHunt)(which unfortunately isn't as neat as I'd like it to be at the moment) on [Github](//github.com).

I might continue working on this game a while later. I’ll update this post with a link to the post-competition version if I manage to make one.

--------------------------------------------------------------------------------

## Statistics

- Final zip size: 7334 bytes
- Final source code size (compressed): 20351 bytes
- Final source code size (uncompressed): 44 kilobytes

{{< figure src="/img/js13k-2018-postmortem/additions-deletions.jpeg" caption="Additions and deletions per week" alt="Addition/deletion statistics from Github" >}}

## Commit log

```sh
git log --before '13 Sep' --reverse --date=format:'%d %b' --pretty=format:'%cd  %s'
```

```txt
17 Aug  Initial commit
24 Aug  Update ESLint configuration
24 Aug  Prototype keyboard controls
24 Aug  Refactor navigation code
25 Aug  Prototype access points
25 Aug  Organize javascript files
25 Aug  Mangle javascript further
25 Aug  Format and tailor kontra
25 Aug  Prototype access points
25 Aug  Prototype pausing and network listing
26 Aug  Prototype battery depletion
26 Aug  Add a player sprite
27 Aug  Fix canvas size and responsiveness
27 Aug  Move keyboard code into named functions
27 Aug  Implement the ability to connect
27 Aug  Disable controls in paused state
28 Aug  Add license and update readme
29 Aug  Remove achievements for the time being
29 Aug  Recompress player sprite
29 Aug  Implement naive goal completion
29 Aug  Fix linting tasks
29 Aug  Satisfy htmllint
30 Aug  Fix a bug occurring on completion
30 Aug  Remove JSDoc comments from kontra
30 Aug  Add help message
30 Aug  Allow opening help after shutting network list
30 Aug  Implement intuitive controls for network list
30 Aug  Re-organize toggle functions
30 Aug  Fix disabled movement in some cases
30 Aug  Implement password protected APs
30 Aug  Satisfy eslint
30 Aug  Store AP passwords as hashes
31 Aug  Reorganize files
31 Aug  Disconnect from AP if player leaves its range
31 Aug  Implement non-linear `speedAt`
31 Aug  Set up Travis
31 Aug  Add missing devDependencies
04 Sep  Add a battery indicator
05 Sep  Implement network indicator
05 Sep  Rotate network indicator
06 Sep  Change indicator colour range
06 Sep  Implement pause dialog box
07 Sep  Implement network list
07 Sep  Implement money indicator
07 Sep  Add remaining goal indicator
07 Sep  Add a speed indicator
07 Sep  Get rid of useless debug statements
08 Sep  Implement paid access points
08 Sep  Refactor the game
08 Sep  Remove help from within game
09 Sep  Add position indicator
09 Sep  Make rotation less fine
09 Sep  Add icons to network list
10 Sep  Add static road
10 Sep  Add static trees
11 Sep  Make the zebra crossing move with the player
12 Sep  Make trees dynamic
12 Sep  Add the ability to move backwards
12 Sep  Add cursor indicator to network list
13 Sep  Replace dummy AP data
13 Sep  Implement scene rotation
13 Sep  Update movement keys
13 Sep  Fix a critical bug
13 Sep  Implement tree rotation
13 Sep  Add some more networks
```

[^1]: Technically, the limit is thirteen kibibytes. [1 kilobyte = 1000 bytes while 1 kibibyte = 1024 bytes](//wikipedia.org/en/Binary_prefix).
