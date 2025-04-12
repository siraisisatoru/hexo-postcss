# hexo-postcss

[![Publish Package to npmjs](https://github.com/siraisisatoru/hexo-postcss/actions/workflows/publish.yml/badge.svg)](https://github.com/siraisisatoru/hexo-postcss/actions/workflows/publish.yml)

A simple hexo plugin for postcss rendering.

# Install manually

This package was a user script for using Tailwindcss in HEXO that users needed to install manually. The full detailed guide can be found in the [full detailed guide](./Manual%20install%20guide.md) and installed manually as it was before.

For some reason, I tried to use Tailwind in my Hexo blog. I did some research and found one [repo](https://github.com/bennyxguo/hexo-renderer-tailwindcss) that acts as a HEXO renderer for Tailwindcss. Unfortunately, the repo didn't update for years and I kept getting errors due to outdated postcss js. To fix the problem, I cloned the library and put it into the scripts folder.

# How to install

Now the functionality of this package is borden to support postcss while dropping TailwindCSS support by defailt.

1. Install this package:

```sh
npm i hexo-postcss
```

2. Create `.postcssrc.js` in your Hexo root folder

Example:

```
.
├── ...
├── scripts
├── source
├── themes
├── .postcssrc.js
└── ...
```

3. `.postcssrc.js`

```
module.exports = {
    from: undefined,
    plugins: {
      '<your plugins>': {},
    }
  }
```

# Using it with TailwindCSS v4

Follow `How to install` first. The steps below are identical to the manual installation guide. This section is a wrapper of the [official document](https://tailwindcss.com/docs/installation/using-postcss). In tailwind version 4, they changed the way to set configurations and thus less installation needed. (Don't even need `tailwind.config.js`)

1. Use node js to install modules.

```shell
$ npm install tailwindcss @tailwindcss/postcss
```

2. Modify `.postcssrc.js`

```
module.exports = {
    from: undefined,
    plugins: {
        "@tailwindcss/postcss": {},
    }
  }
```

3. Add `main.css` to your `themes/<yourtheme>/source/css/` folder.

```
.
├── ...
├── themes
│   └── <yourtheme>
│       └── source
│           └── css
│               └── main.css
├── scripts
└── ...
```

4. Add the following to `main.css`

```css
@import "tailwindcss";
```

5. Add the `main.css` to your template (possibly in `head.ejs`).

```js
    <%- css(['css/main.css']) %>
```

# Using it with TailwindCSS v3

Follow `How to install` first. The steps below are identical to the manual installation guide.

1. Use node js to install modules.

```shell
$ npm install tailwindcss@3 autoprefixer postcss-import
```

At the point of this guide creation, the packages' versions are listed as follows.

```json
"autoprefixer": "^10.4.19",
"postcss-import": "^16.1.0",
"tailwindcss": "^3.4.3",
```

2. Modify `.postcssrc.js`

```
module.exports = {
    from: undefined,
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {},
    }
  }
```

3. Initial Tailwind to get `tailwind.config.js`

```shell
npx tailwindcss init
```

Yeild:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

4. Modify the `tailwind.config.js` to render the ejs template

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./themes/<yourtheme>/layout/**/*.ejs"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

5. Add `main.css` to your `themes/<yourtheme>/source/css/` folder.

```
.
├── ...
├── themes
│   └── <yourtheme>
│       └── source
│           └── css
│               └── main.css
├── scripts
└── ...
```

6. Add the following to `main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. Add the `main.css` to your template (possibly in `head.ejs`).

```js
    <%- css(['css/main.css']) %>
```

---

Up to this point, the Tailwind renderer should be working like normal.

A side note is the `content` field in `tailwind.config.js` file. The field should cover all templates that use Tailwind.

---

Additional notes:
In case you want to use plug-ins, just install the plug-in and update the `tailwind.config.js`

Example:

```shell
npm install daisyui
```

For TailwindCSS v3:
Add the following to `tailwind.config.js`.

```js
  plugins: [require("daisyui")],
```

For TailwindCSS v4:
Modify the `main.css`
```css
@import "tailwindcss";
@plugin "daisyui" {
    themes: light --default;
}
```

---

# Contributing

Any new ideas want to add to the project are welcome. Please submit a pull request or open up an issue and we can discuss further.

# License

The original library [hexo-renderer-tailwindcss](https://github.com/bennyxguo/hexo-renderer-tailwindcss) is using MIT license for their project. MIT license is applied for this repository.
