# `nextjs ssr demo app`

## nextjs api, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      672 B          88.4 kB
├   /_app                                  0 B            87.7 kB
├ ○ /404                                   321 B            88 kB
├ ○ /500                                   331 B            88 kB
├ ○ /about                                 601 B          88.3 kB
├ λ /api/auth/[...nextauth]                0 B            87.7 kB
├ λ /api/form/create-post                  0 B            87.7 kB
├ λ /api/post/[title]                      0 B            87.7 kB
├ λ /api/posts/all                         0 B            87.7 kB
├ ○ /auth/error                            353 B          88.1 kB
├ ○ /auth/session                          2.44 kB        90.1 kB
├ ○ /auth/signin                           2.01 kB        89.7 kB
├ λ /post/[title]                          886 B          88.6 kB
└ λ /posts                                 877 B          88.6 kB
+ First Load JS shared by all              88.6 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-00eab77237cd1288.js        25.7 kB
  ├ chunks/pages/_app-4f4960653dc1d238.js  14.7 kB
  ├ chunks/webpack-9b3959541390b4ea.js     1.89 kB
  └ css/9160f49fdbc84efd.css               947 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
