# shreyasminocha.me

Source code for [my personal website](//shreyasminocha.me). Built using [hugo](//gohugo.io).

[![Netlify Status](https://api.netlify.com/api/v1/badges/08906d39-b81a-49a1-bf88-72dcc0d24d0a/deploy-status)](https://app.netlify.com/sites/shreyasminocha/deploys)

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

Deployments are made using Netlify which is configured through [`netlify.toml`](netlify.toml).

## License

Source code is licensed under the [MIT license](//tldrlegal.com/license/mit-license).

Website content (including blog posts) is licensed under [Attribution-ShareAlike 4.0 International](//creativecommons.org/licenses/by-sa/4.0/).
