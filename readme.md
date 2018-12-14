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

The bare respository has a post-receive hook that creates a copy of the files of the repo in a temporary directory, runs `hugo` on the copy and stores the generated file in a directory which nginx expects files to be in.

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

Nginx configuration:

```nginx
$ cat /etc/nginx/sites-enabled/shreyasminocha.me
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;

    root /var/www/shreyasminocha.me;
    index index.html;
    server_name shreyasminocha.me www.shreyasminocha.me;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico)$ {
        expires 30d;
    }

    location ~* \.(css|js)$ {
        expires 7d;
    }

    ssl on;
    ssl_certificate /etc/letsencrypt/live/shreyasminocha.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shreyasminocha.me/privkey.pem;

    gzip on;
    gzip_types application/javascript image/* text/css;
    gunzip on;
}

server {
    listen 0.0.0.0:80;

    server_name shreyasminocha.me www.shreyasminocha.me;
    rewrite ^ https://$host$request_uri? permanent;
}
```

I've enabled http/2. I've also set up https with a key generated using Let's Encrypt. The final `server` directive redirects all http requests to their https equivalent with a permanent redirect.

## License

Source code is licensed under the [MIT license](//tldrlegal.com/license/mit-license).

Website content (including blog posts) is licensed under [Attribution-NonCommercial-NoDerivatives 4.0 International](//creativecommons.org/licenses/by-nc-nd/4.0).
