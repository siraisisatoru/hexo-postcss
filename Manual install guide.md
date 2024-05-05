# Use this package as a user script

Before this package was published as an npm package, it was a user script that users needed to manually download and place in their HEXO project.

This file is a detailed guide on how to install this package manually.

---

1. Use node js to install modules.

```shell
$ npm install postcss postcss-import postcss-load-config autoprefixer tailwindcss
```

At the point of this guide creation, the packages' versions are listed as follows.

```json
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "postcss-import": "^16.1.0",
    "postcss-load-config": "^5.1.0",
    "tailwindcss": "^3.4.3"
```

2. Download all files in this repo and put them under `scripts/` or `themes/<yourtheme>/scripts/` folder

Example:

```
.
├── ...
├── scripts
│   ├── lib
│   │   ├── renderer.js
│   └── index.js
└── ...
```

3. Create `.postcssrc.js` in your Hexo root folder

Example:

```
.
├── ...
├── scripts
│   ├── lib
│   │   ├── renderer.js
│   └── index.js
├── .postcssrc.js
└── ...
```

4. `.postcssrc.js`

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

5. Initial Tailwind to get `tailwind.config.js`

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

6. Modify the `tailwind.config.js` to render the ejs template

This is the trickiest part that I didn't see any where mention this.

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

7. Add `main.css` to your `themes/<yourtheme>/source/css/` folder.

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

8. Add the following to `main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

9. Add the `main.css` to your template (possibly in `head.ejs`).

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

then add the following to `tailwind.config.js`.

```js
  plugins: [require("daisyui")],
```

---
