---
title: Replacing Gitea with `git`, `ssh`, and GitList
description: When Gitea is overkill, `git` and `ssh` in combination with a couple of other tools should suffice.
date: 2020-08-21
tags: [programming, git, tutorial]
---

I used to self-host a [Gitea](https://gitea.io) instance for myself. I found, however, that I used but a fraction of what it had to offer. Git is well-equipped with tools for [running a git service on the server](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server), though. I've since implemented a simple git-with-ssh set-up with [GitList](https://gitlist.org) as the web interface.

## Assumptions

-   You have `git` installed and a user `git` exists
-   You have SSH set up

---

Copy Gitea's repository directory, into `git`'s home directory (usually `/home/git`). This directory will house your repositories.

On your system, [generate a SSH key pair](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key) with `ssh-keygen` and append the public key (a `.pub` file) to `/home/git/.ssh/authorized_keys` on the server.

Make sure the user `	git` has read-write permissions to the repos in `/home/git`.

At this point you can probably try cloning and pushing to the server. `git@host:path/to/repo.git`. If the path does not begin with ` /`, it will be assumed to be relative to `/home/git`.

When pushing, you'll probably run into errors if you copied Gitea's repositories folder. Gitea adds a few hooks to each repository's `hooks` directory which prevent you from pushing to them unless they're managed via Gitea. Particularly, it adds `pre-recieve`, `post-receive` and `update` hooks and you'd want to get rid of those.

New repositories can be initialized with:

```sh
git init --bare example.git
```

Once again, make sure permissions are in order. I set the owner to my own user, but created a unix group with me and `git` in it and set group read-write permissions. Do set permissions for `other` users to `o=r` (read-only) for "public" repositories and `o=` for "private" repositories. This should also make the private repositories inaccessible from the [web frontend](#web-frontend) you'll set up.

```sh
$ ls -la /git/shreyas
[…]
drwxrwxr-x 20 shreyas shreyas-git […] <public repo>.git
drwxrwxr-x  5 shreyas shreyas-git […] <public repo>.git
drwxrwx---  7 shreyas shreyas-git […] <private repo>.git
drwxrwx---  8 shreyas shreyas-git […] <private repo>.git
drwxrwxr-x  7 shreyas shreyas-git […] <public repo>.git
drwxrwx---  7 shreyas shreyas-git […] <private repo>.git
drwxrwxr-x  8 shreyas shreyas-git […] <public repo>.git
drwxrwx---  7 shreyas shreyas-git […] <private repo>.git
[…]
```

```sh
$ cat /etc/group | grep '^shreyas-git'
shreyas-git:x:1002:shreyas,git
```

## Security

To prevent people SSHing as `git` from doing "non-git things", you should set `git`'s shell to `git-shell`. Confirm that `git-shell` is installed. Then, if `/etc/shells` doesn't already include `git-shell`, add it:

```sh
$ which git-shell >> /etc/shells
```

Set `git`'s shell to `git-shell`:

```sh
$ sudo chsh git -s $(which git-shell)
```

To prevent other SSH wackiness, prefix `no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty` to the keys in `/home/git/.ssh/authorized_keys`:

```sh
$ cat /home/git/.ssh/authorized_keys
no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ssh-rsa AAAAB3NzaC1yc2EAA […]
```

## Web frontend

You have more than one option for the web interface for your git repos, including [GitWeb](https://git-scm.com/book/en/v2/Git-on-the-Server-GitWeb) and GitList, but I eventually went with GitList. Keep in mind that these are merely read-only web frontends for your repositories and not remotely comparable to Gitea, [GitLab](https://docs.gitlab.com/ce/), and the like. You may choose to skip this step entirely if it's not something you need or want.

[GitList's installation instructions](https://github.com/klaussilveira/gitlist#installation) are fairly complete, but the tl;dr is that you have to [download a copy of GitList](https://github.com/klaussilveira/gitlist/releases/latest) into `/var/www/gitlist`, give your web server write permissions to `/var/www/gitlist/cache`, and [configure your web server](https://github.com/klaussilveira/gitlist/blob/master/INSTALL.md#webserver-configuration) to make GitList accessible. You'll also need to configure some important settings in `/var/www/gitlist/config.ini`. `config.ini-example` has a well-commented example. Some important settings:

-   `git.repositories[]`
-   `git.hidden[]`
-   `app.theme`: `bootstrap3` (opinionated)
-   `clone_button.show_ssh_remote`, `clone_button.show_http_remote`
-   `clone_button.ssh_url_subdir`, `clone_button.http_url_subdir`
-   `date.timezone`

## Additional steps

Optionally, you could:

-   [Set up `git-http-backend`](https://git-scm.com/docs/git-http-backend). I recommend doing this so that public repositories can be cloned over http, but I haven't got around to doing it yet.
-   [Set up a git daemon](https://git-scm.com/book/en/v2/Git-on-the-Server-Git-Daemon) to serve repos over the `git://` protocol. If you set up http-backend, this is mostly redundant.