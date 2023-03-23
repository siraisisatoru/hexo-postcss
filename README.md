# hexo-tailwindcss-script
The repository is a user script for apply Tailwindcss render within HEXO framework.

For some reason, I tried to use tailwind in my Hexo blog. I did some research and found one [repo](https://github.com/bennyxguo/hexo-renderer-tailwindcss) that act as a hexo renderer for Tailwindcss. Unfortunately, the repo didn't update for two years and I kept getting error due to outdated postcss js. To fix the problem, I cloned the library and put them into scripts folder.

---
1. Use node js install modules.
```shell
$ npm install postcss postcss-import postcss-load-config tailwindcss
```

At the point the repo get published, the versions of each library are listed below:

``` json
    "postcss": "^8.4.21",
    "postcss-import": "^15.1.0",
    "postcss-load-config": "^4.0.1",
    "tailwindcss": "^3.2.7"
```

2. Download all files in this repo and put under `scripts/` or `themes/<yourtheme>/scripts/` folder

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

3. Create `.postcssrc.js` at your Hexo root folder

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
}
```

6. Modify the `tailwind.config.js` to render the ejs template

This is the trickiest part that I didn't see any where mention this.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./themes/<yourtheme>/layout/**/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

7. Add `main.css` to your `themes/<yourtheme>/source/css/` folder.

```
.
├── ...
├── scripts
│   ├── css
│   │   └── main.css
├── scripts
└── ...
```

8. Add the following to `main.css`

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

9. Add the `main.css` to your template (possibly in `head.ejs`).
```js
    <%- css(['css/main.css']) %> 
```

---

Up to this point, Tailwind renderer should be working like normal. 

A side note is the `content` field in `tailwind.config.js` file. The field should cover all templates that uses Tailwinds.


