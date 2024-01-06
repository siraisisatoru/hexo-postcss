# hexo-tailwindcss-script
The repository is a user script for applying Tailwindcss render within HEXO framework.

For some reason, I tried to use Tailwind in my Hexo blog. I did some research and found one [repo](https://github.com/bennyxguo/hexo-renderer-tailwindcss) that acts as a HEXO renderer for Tailwindcss. Unfortunately, the repo didn't update for two years and I kept getting errors due to outdated postcss js. To fix the problem, I cloned the library and put it into the scripts folder.

---
1. Use node js to install modules.
```shell
$ npm install postcss postcss-import postcss-load-config tailwindcss autoprefixer
```

At the point the repo gets published, the versions of each library are listed below:
``` json
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.21",
    "postcss-import": "^15.1.0",
    "postcss-load-config": "^4.0.1",
    "tailwindcss": "^3.2.7"
```

---
update 30-12-2023
Just verified and tested the script, and it still works. The most recent versions are as follows:

```json 
    "postcss": "^8.4.32",
    "postcss-import": "^15.1.0",
    "postcss-load-config": "^5.0.2",
    "tailwindcss": "^3.4.0"
```



---



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
├── themes
│   └── <yourtheme>
│       └── source
│           └── css
│               └── main.css
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

Up to this point, the Tailwind renderer should be working like normal. 

A side note is the `content` field in `tailwind.config.js` file. The field should cover all templates that use Tailwinds.

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
