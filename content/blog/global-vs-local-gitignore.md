---
title: Global `gitignore` versus local `gitignore`
description: Use the right `gitignore` for the job.
date: 2020-07-09
tags: [programming, git]
---

As you might be aware, [git supports global `gitignore` files](https://www.peterbe.com/plog/gitinfoexclude), allowing us to define ignore patterns for files across system.

The global gitignore is best reserved for patterns for things like:

- OS-specific junk (`.DS_Store`, …)
- editor-specific stuff (`.vscode`, `.sublime-workspace`, …)
- personal notes etc (e.g. `.todo`, `.notes/`, …)

Everyone needs different combinations of these—repositories' local `.gitignore`s shouldn't be cluttered with these.

The local `.gitignore` should, instead, hold project-specific patterns. These may be related to your dependency management tools, frameworks, coverage checking tools, the rest.

This isn't an original thought by any means, but it's a big pet-peeve 🐶.