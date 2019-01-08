# shreyasminocha.me

Source code for [my personal website](//shreyasminocha.me). Built using [hugo](//gohugo.io).

## Structure

- `archetypes`: files with standard frontmatter for each collection.
- `content`: blog posts, about page, other collections.
- `layout`
    - `_default`: templates that specify how content will be rendered to static pages.
    - `partials`: small re-usable portions portions meant to reduce duplication across layouts.
    - `shortcodes`: similar to `partials` but meant for reuse within content.
- `static`: static files—images, stylesheets, scripts, fonts etc
- `config.yml`

## Testing

### Running a server for development

```sh
hugo serve -p <port> --disableLiveReload --noHTTPCache --buildDrafts
```

I personally use [hotel](//github.com/typicode/hotel) for managing development servers, so after

```sh
hotel add --name shreyasminocha 'hugo serve -p $PORT --disableLiveReload --noHTTPCache --buildDrafts'
```

...and some configuration, I can access my local dev server at `shreyasminocha.localhost`.

### Running linters

Install dev dependencies:

```sh
npm install
```

Run tests with:

```sh
npm test # Currently just runs `gulp`
```

Or more specifically, assuming you have `gulp` installed globally, run it with:

```sh
gulp
```

## Deployments

I've set up a dual-remote for my local copy of this repo. When I push to origin, code gets pushed to both this repository and a bare repository on my VPS.

```sh
$ git remote -v
origin  git@github.com:shreyasminocha/shreyasminocha.me.git (fetch)
origin  ssh://<host>/home/shreyasminocha/shreyasminocha.me (push)
origin  https://github.com/shreyasminocha/shreyasminocha.me (push)
```

The bare repository has a post-receive hook that creates a copy of the files of the repo in a temporary directory, runs `hugo` on the copy and stores the generated file in a directory which the server expects files to be in.

```sh
$ cat shreyasminocha.me.git/hooks/post-receive
#!/bin/sh

TMP_DIR=/tmp/shreyasminocha.me
WEB_DIR=/var/www/shreyasminocha.me

# remove any untracked files and directories
git --work-tree=${TMP_DIR} clean -fd

# force checkout of the latest deploy
git --work-tree=${TMP_DIR} checkout --force

cd $TMP_DIR
ls -a
git submodule update
hugo -s $TMP_DIR -d $WEB_DIR --cleanDestinationDir --minify
```

## License

Source code is licensed under the [MIT license](//tldrlegal.com/license/mit-license).

Website content (including blog posts) is licensed under [Attribution-NonCommercial-NoDerivatives 4.0 International](//creativecommons.org/licenses/by-nc-nd/4.0).
