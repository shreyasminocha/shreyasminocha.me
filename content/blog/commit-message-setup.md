---
title: My commit message workflow
description: Tweaks I've made to make the perfect commit message writing workflow for myself.
date: 2018-06-22
tags: [git, productivity, workflow]
---

{{< figure src="/img/commit-message-setup/commit-message-example.jpg" alt="My commit message workflow" caption="My commit message workflow" >}}

I use Sublime Text 3 for most of my text-editing needs. I've also set it as my core editor.

```sh
git config --global core.editor "subl -n -w"
```

**Note**: The above requires the you to install the `subl` command if it doesn't work out of the box. Installation instructions: [macOS](//stackoverflow.com/questions/16199581/open-sublime-text-from-terminal-in-macos) · [Linux](//askubuntu.com/a/274197) · [Windows](//stackoverflow.com/a/25577833/3363528).

Earlier, I used to use [a package](//packagecontrol.io/packages/Git%20Commit%20Message%20Syntax) to provide syntax highlighting for commit messages. However, build 3170 has brought native support for various git formats, commit message included.

Sublime allows you to override settings for specific syntaxes. You can edit these from ‹Preferences› → ‹Settings – Syntax Specific›. Here's my `Git Commit.sublime-settings` file:

```json
{
    "rulers": [50, 72],
    "spell_check": true,
    "word_wrap": "true",
    "wrap_width": 72,
    "font_size": 14,
    "draw_centered": true
}
```

**Note**: VS Code fans can do it [this way](//github.com/Microsoft/vscode-docs/blob/master/docs/getstarted/tips-and-tricks.md#language-specific-settings).

Somewhere on the internet, I found a template for commit messages:

```sh
# If applied, this commit will…


# Explain why this change is being made

# Provide links to any relevant tickets, articles or other resources
```

This template makes it easier to frame commits in accordance with the seven rules I mentioned earlier. I can't seem to remember *where* I found this, but in my attempts to trace it, I found [a blog post](//codeinthehole.com/tips/a-useful-template-for-commit-messages) providing a very similar template. As it turns out, git allows you to use a text file as a template for your commit messages.

```sh
git config --global commit.template "/Users/example/dotfiles/commit-msg-template"
```

When I started using this template, I had a small pet peeve about my setup. Running `git commit` would fire up Sublime with the cursor on the first line and to actually *write* the message, I would have to move the cursor one line below. With research and some experimentation, I solved the issue:

```sh
git config --global core.editor = "sublime -n -w $1:2"
```

The `$1:2` at the end of the value opens the argument with the cursor on row 2.

Another one of my pet-peeves with the commit message text is this little snippet above the commented out `git status`:

```sh
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```

While helpful to the newbie, this little notice ended up becoming an annoyance. I found a [helpful answer on StackOverflow](//stackoverflow.com/a/3967136) which advised using a [global `prepare-commit-msg` hook](//git-scm.com/docs/githooks#_prepare_commit_msg). If you don't already have a global git hooks directory, create one and tell git about it:

```sh
git config --global core.hookspath "/Users/example/dotfiles/git-hooks"
```

Create `prepare-commit-msg` in said directory with the following content:

```sh
#!/usr/bin/env bash

/usr/bin/perl -i.bak -ne 'print unless(m/^. Please enter the commit message/..m/^#$/)' "$1"
```

Make sure the hook is set to be executable with `chmod +x`. Now that pesky help notice will bother you no more.

{{< figure src="/img/commit-message-setup/uninformative-messages.png" alt="Xkcd about uninformative commit messages" caption="Every other project 😂" >}}

Recently, I found [this really cool utility](//github.com/clns/node-commit-msg) which allows you to validate commit messages from the command line. I use a modified form of the utility in a [global `commit-msg` hook](//git-scm.com/docs/githooks#_commit_msg) to automatically validate every commit I make. Create `commit-msg` in your global git hooks directory:

```sh
#!/usr/bin/env bash

commit-msg file $1
```

**Note**: The above requires the `commit-msg` command to be on your `$PATH`. Install it using `npm i -g commit-msg` manually from [source code](//github.com/clns/node-commit-msg).

Again, make sure the script is set to be executable. The result of this hook is that the commit would abort if my commit message does not meet the criteria.

![An example of an invalid commit message](/img/commit-message-setup/failed-commit.jpg)

{{< figure src="/img/commit-message-setup/uninformative-messages.png" alt="An example of a failing commit message" caption="A failing commit message" >}}

Thanks for reading!

## Further reading

- [Tim Pope's note about commit messages](//tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [Commit guideline suggestions from Pro Git](//www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
- [Linus Torvald's note about commit messages](//github.com/torvalds/subsurface-for-dirk/blob/master/README#L92-L120)
- [Commit message formatting guidelines from the Spring Project](//github.com/spring-projects/spring-framework/blob/30bce7/CONTRIBUTING.md#format-commit-messages)
