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
- `config.yml`: configuration

## Deployments

Deployments are made using Vercel.

## License

Source code is licensed under the [MIT license](LICENSE).

Website content (including blog posts) is licensed under [Attribution-ShareAlike 4.0 International](content/license.md).
