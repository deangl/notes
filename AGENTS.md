# AGENTS.md

Personal Jekyll notebook hosted on GitHub Pages as a project page (base URL `/notes/`). Built with the `just-the-docs` theme via `remote_theme` (GitHub Pages builds it automatically; no vendored theme files). The real content is Chinese study notes.

## Where notes live

- All notes are Markdown files directly in `docs/` (e.g. `docs/量子力学.md`). Chinese filenames are the norm — keep them.
- Images go in `docs/img/` (also `tests/img/` for test pages). Attachments in `att/`.
- `index.md` auto-lists every page by category — no manual index upkeep. (No `tags.md`; the theme ships full-text search instead.)

## Frontmatter for every note

```yaml
---
title: "笔记标题"
output: html_document
mainfont: msyh
use_math: true
toc: false
categories: [数学]      # must match a value from `category-list` in _config.yml
tags: [标签, ...]
---
```

- `categories` must be one of `数学 | 金融 | 物理 | 计算机` (`category-list` in `_config.yml`). Anything else lands in 未分类. Note the field is plural (`categories`, `tags`), and `output: html_document` is required (leftover from R Markdown — keep it).
- `use_math: true` loads MathJax via `_includes/head_custom.html` (Just the Docs' customization hook) → `_mathjax_support.html` (MathJax v3, jsdelivr CDN). `toc:` is now a harmless leftover — the theme renders a sidebar TOC automatically. Both optional.

## Custom overrides (all Just the Docs hooks, site side)

- `_includes/components/site_nav.html` — replaces the theme nav: categories from `site.category-list` with drill-down article lists (theme's `.nav-list`/`.nav-list-expander` markup, so expand/collapse + current-page highlight still work). New notes appear automatically via `site.html_pages | where_exp`.
- `_includes/header_custom.html` + `_includes/js/custom.js` — sidebar is hidden by default on desktop; the header hamburger toggles `body.jtd-nav-open`.
- `_sass/custom/custom.scss` — hides the sidebar by default and widens `.main` to 80% of page width.

## Content conventions (these are enforced by quirks, not taste)

- **No wikilinks.** Use relative links: `[说明](./目标文件.md)` — the `jekyll-relative-links` plugin rewrites `.md` targets at build. Same for images: `![alt](./img/foo.png)`.
- **Math:** inline `$...$`, display `$$...$$`. Kramdown bug: an underscore in inline math (e.g. subscripts) can be parsed as italics and drop the `$` delimiters — workaround is a space before the underscore in the math.
- Don't touch `tests/` — inherited from upstream slate and only matters for test pages.

## Build & verify

- `bundle exec jekyll build` (output `_site/`), or `bundle exec jekyll serve` for local preview.
- `Gemfile` pins the `github-pages` gem (what GitHub Pages runs); `jekyll-remote-theme` is the plugin that loads the theme. `Gemfile.lock` is gitignored.
- Ruby/bundler are not required for editing notes, but there is no other lint/test for note content. `script/cibuild` just runs `jekyll build`.

## Git

- Branch is `main`, remote `git@github.com:deangl/notes.git`. Commit messages are terse Chinese (`格式`, `补说明`) — match that style.
- `.aider*` files/dirs, `docs/笔记.code-workspace`, and `docs/.aider.tags.cache.v7` are tooling artifacts — ignore them.
