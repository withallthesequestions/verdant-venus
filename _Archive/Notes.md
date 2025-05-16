

1. Filenames starting with underscore eg `_FileName.astro` are ignored by Astro.
2. Backups placed in /_Archive
3. Install version is 5.7.13
4. Where does Astro like to put its css?
    - In `src/styles`, there is a `global.css`
5. If you're using content collections, they must be in `content` folder, and must be configured in `src/content.config.ts`
6. Filename best practices: 
	- File names should allow numerical sorting. Eg `post-001.md`. Using naive numbers like `post-3` prevents numerical sorting.
	- Prefer all-lowercase kebab-case formatting, ie `names-like-this.md`. This works in case-insensitive situations.
7. CSS best practices
	- use REM sizing, use HSL coloring. 
	- See color roles: https://m3.material.io/styles/color/roles

99. Github-related:
	- If you're hosting a page on github, the following should be in your `astro.config.mjs`:
	```mjs
	// @ts-check
	import { defineConfig } from 'astro/config';

	// https://astro.build/config
	export default defineConfig({});

	/* if instead it's going on github: */
	export default defineConfig({
		site: 'https://withallthesequestions.github.io',
		base: 'tremendous-telescope',
	});

	```
	- Github config: https://docs.astro.build/en/guides/deploy/github/

## Default Project Structure

File Directory:
```
├── .astro
├── public/
│   └── favicon.svg 
└── src/
    ├── components/
    ├── content/
    ├── layouts/
    ├── pages/
    │   ├── posts/
    │   │   └── post-1.md      
    │   ├── tags/
    │   │   └── [tag].astro
    │   └── rss.xml.js
    ├── scripts/
    │   └── menu.js
    ├── styles/
    │   └── global.css
    ├── consts.ts
    └── env.d.ts
.gitignore
astro.config.mjs
package-lock.json
package.json
README.md
astro.config.mjs
tsconfig.json
```

Component and Layout Structure
- *Pages*: Each page is built with the file content, plus:
    - A *layout*
        - With slots (optional)
            - Slots can be named or unnamed.
    - *Components*
    - Imported props, eg
        `const { title } = Astro.props;`
        `<h1>{title}</h1>`

## Content Layer

- Content Loader API pulls in data (which can be from a variety of places), then turns it into content collections for the page to use.
	- It's an upgrade to the older content collections.


SETUP:
You need 2 things: 
1. A configured collection
	- Config file/location: `src/content.config.ts`. See here for details: https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
	- In here, you must define a collection (import `defineCollection`), specify a loader (for local files, use `glob()` or `file()`), specify a schema, then export it `export const collections = { log };`
	```ts
	import { defineCollection, z } from 'astro:content';
	import { glob } from 'astro/loaders';

	const log = defineCollection({
		/* Retrieve all Markdown and MDX files in your blog directory. */
		loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data/logs' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			tags: z.array(z.string()),
			draft: z.boolean(),
		}),
	});
	export const collections = { log };
	```
2. The collection imported on a page:
	- Eg,
	```js
	import { getCollection } from 'astro:content';
	const allBlogPosts = await getCollection('log');
	console.log(allBlogPosts);
	```
3. Note, some formats automatically generate unique ids for each item in the collection. Others, like `file()` require you to give each an id. 

## CSS Norms

- Local styling:
	- Pages Styling (src/pages/*.astro)
	- Layout Styling (src/layouts/*.astro)
	- Component Styling (src/components/*.astro)
	- Content Styling (src/content/*.astro)

- `src/styles/global.css` holds global styles.
	- Notes: sr-only = screen reader only?
```css
/*
  The CSS in this style tag is based off of Bear Blog's default CSS.
  https://github.com/HermanMartinus/bearblog/blob/297026a877bc2ab2b3bdfbd6b9f7961c350917dd/templates/styles/blog/default.css
  License MIT: https://github.com/HermanMartinus/bearblog/blob/master/LICENSE.md
 */

:root {
	--accent: #2337ff;
	--accent-dark: #000d8a;
	--black: 15, 18, 25;
	--gray: 96, 115, 159;
	--gray-light: 229, 233, 240;
	--gray-dark: 34, 41, 57;
	--gray-gradient: rgba(var(--gray-light), 50%), #fff;
	--box-shadow:
		0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%),
		0 16px 32px rgba(var(--gray), 33%);
}
@font-face {
	font-family: 'Atkinson';
	src: url('/fonts/atkinson-regular.woff') format('woff');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'Atkinson';
	src: url('/fonts/atkinson-bold.woff') format('woff');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}
body {
	font-family: 'Atkinson', sans-serif;
	margin: 0;
	padding: 0;
	text-align: left;
	background: linear-gradient(var(--gray-gradient)) no-repeat;
	background-size: 100% 600px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	color: rgb(var(--gray-dark));
	font-size: 20px;
	line-height: 1.7;
}
main {
	width: 720px;
	max-width: calc(100% - 2em);
	margin: auto;
	padding: 3em 1em;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0 0 0.5rem 0;
	color: rgb(var(--black));
	line-height: 1.2;
}
h1 {
	font-size: 3.052em;
}
h2 {
	font-size: 2.441em;
}
h3 {
	font-size: 1.953em;
}
h4 {
	font-size: 1.563em;
}
h5 {
	font-size: 1.25em;
}
strong,
b {
	font-weight: 700;
}
a {
	color: var(--accent);
}
a:hover {
	color: var(--accent);
}
p {
	margin-bottom: 1em;
}
.prose p {
	margin-bottom: 2em;
}
textarea {
	width: 100%;
	font-size: 16px;
}
input {
	font-size: 16px;
}
table {
	width: 100%;
}
img {
	max-width: 100%;
	height: auto;
	border-radius: 8px;
}
code {
	padding: 2px 5px;
	background-color: rgb(var(--gray-light));
	border-radius: 2px;
}
pre {
	padding: 1.5em;
	border-radius: 8px;
}
pre > code {
	all: unset;
}
blockquote {
	border-left: 4px solid var(--accent);
	padding: 0 0 0 20px;
	margin: 0px;
	font-size: 1.333em;
}
hr {
	border: none;
	border-top: 1px solid rgb(var(--gray-light));
}
@media (max-width: 720px) {
	body {
		font-size: 18px;
	}
	main {
		padding: 1em;
	}
}

.sr-only {
	border: 0;
	padding: 0;
	margin: 0;
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
	/* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
	clip: rect(1px 1px 1px 1px);
	/* maybe deprecated but we need to support legacy browsers */
	clip: rect(1px, 1px, 1px, 1px);
	/* modern browsers, clip-path works inwards from each corner */
	clip-path: inset(50%);
	/* added line to stop words getting smushed together (as they go onto separate lines and some screen readers do not understand line feeds as a space */
	white-space: nowrap;
}
```

## Content Layer

- Starting in Astro 5.0, they replace content collections with the content layer. 