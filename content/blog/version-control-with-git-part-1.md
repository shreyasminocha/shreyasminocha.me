---
title: 'Version control with git #1'
description: This post is a gentle introduction to version control with git. Learn about version control, create a git repository and check its status.
date: 2017-04-03
tags: [git]
---

This post is the first in my "Version control with git" series. This series expects no prior experience with git or version control. Mild familiarity with the command line is preferred.

## What version control is

Imagine you are working on a software project. After months of hard work, you are able to publish the first version of your software. Soon, a bug in your software is discovered. You make the necessary amendments. However, it turns out, the changes you just introduced break the entire program. Unfortunately, you had made no backups and now have to manually revert all your changes.

What can be done to avoid such a disastrous outcome? One option might be to have several versions of the same file in a directory with a structure like this:

```
my-project/
  |-- v1.0.0
  |-- v1.0.1
  |-- v1.1.0
  |-- v1.2.0
  |-- v2.0.0
  ...
```

This is a very basic form of version control. However, hopefully you can already see where this is going as your project grows larger and larger. Some of the disadvantages of such a system include--

* Having multiple copies of your project isn't very space efficient, especially as it grows larger.
* It is very error-prone as one might accidentally make changes in the wrong directory.

And all of this is before we have even considered multiple people collaborating on a project. As you can see, this is not a very efficient way of solving our problem.

> A version control system is a system that records changes to a file or set of files over time so that you can recall specific versions later.

Most version control systems allow you to revert files to a previous version, revert entire projects to previous versions, compare changes across releases, see who made the last change that might have introduced a critical bug and more. The most popular version control system today is git. Git was invented by Linus Torvalds to keep the source code of the linux kernel under revision control. It is popular among developers because of it's speed, local nature, quick branching mechanism(we'll get into that later) and other distinguishing features which we might cover at a later stage. Why waste time talking, let's get our hands dirty!

## Installing git

Git is cross-platform, that means it is available for all major platforms including Linux, macOS as well as Windows. The installation process is fairly straightforward on the former two while slightly more involved on the former. We'll skip the installation process in this tutorial, but you can find instructions to setup git [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## First time setup

We will stick to only basic setup for this tutorial but this should be sufficient for most beginners. Run the following commands one at a time in a new terminal window(or in git bash, if you are on Windows), replacing the example identity with yours:

```unix
git config --global user.name "John Doe"
```
```unix
git config --global user.email johndoe@example.com
```
## Structure of a git command

Users mildly familiar with the command line will recognize the git syntax to be similar to that of most commands. nearly all git commands follow a similar structure, given below:

```unix
git [COMMAND_NAME] -[OPTIONS] [ARGUMENTS]
```

The first part, `git`, is the name of the program we are running that is git. The next part, `[COMMAND_NAME]` is the specific git command we are trying to invoke. The `-[OPTIONS]` are modifiers we use will modify the behaviour of the command. These are optional(as the name suggests) and can be omitted as per requirement. The last section `[ARGUMENTS]` is required in some git commands, providing things such as files to compare etc.

## Initializing a git repository

As per version control terminology, a project that is under version control is called a repository. Let us get our hands dirty by creating a new example project and initializing a git repository there. Open a terminal window and run the following command in the directory you would like your project to be created.

```unix
mkdir 'git-newbie'
```

This command creates a directory, `git-newbie` in the directory we run the command in. Next, let us move into this directory and 'initialize' a new git repository.

```unix
cd git-newbie
```
```unix
git init
```

The first moves us into the `git-newbie` folder and the next command `git init` initializes a new git repository in our folder. Now if you run `ls -a` in our project folder, You should see something like:

```
./  ../  .git/
```

Notice the directory `.git`? That is an invisible directory that git uses to store all its data. Don't worry, it won't show up as part of your source code.

Note: The `./` folder that shows up in the output just represents the current directory while the `../` folder represents the parent folder. These are not part of your project and exist only for symbolic purposes.

## Checking the status of our repository

Git has a command that allows you to see what changes you have made since the last commit(snapshot of your project) and whether it is up to date with the remote(more on remotes in the future). This command is `git status`. Let us try this in our project. Move to the project in the terminal(using `cd`) and run:

```unix
git status
```

This should output:

```
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)
```

The output explains that we are on the branch `master`(we'll cover branches in a future post) and that there is nothing to commit. Commits are, as mentioned earlier snapshots of the different stages of your project. For example, once you introduce a new feature, fix a bug or make any logical change to your project, you are expected to commit. We'll cover how to make commits and choosing commit messages in the future.

Let us create a new file. This can be done from the command line(or git bash, on windows) by running:

```unix
touch newfile
```

Edit the file in your favourite text editor to include any text of your choice. Let us try running `git status` now:

```
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        newfile

nothing added to commit but untracked files present (use "git add" to track)
```

Git is telling us that there are untracked files(namely `newfile`) present in our project. These are files that git does not watch for changes. How to track and ignore files is outside the scope of this first post, but we will get into that in another post soon.

## In conclusion

In the first post of this series, we covered:

* What version control systems are
* An introduction to git
* How to initialize a git repository
* How to check the status of a repo

We will be covering how to track files, make 'commits' and more in the next post in this series. Stay tuned!
