# `nextjs ssr demo app`

## nextjs api, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.28 kB          90 kB
├   /_app                                  0 B            87.7 kB
├ ○ /404                                   321 B            88 kB
├ ○ /500                                   329 B            88 kB
├ ○ /about                                 588 B          88.3 kB
├ λ /api/auth/[...nextauth]                0 B            87.7 kB
├ λ /api/form/create-post                  0 B            87.7 kB
├ λ /api/post/[id]                         0 B            87.7 kB
├ λ /api/posts                             0 B            87.7 kB
├ λ /api/posts/all                         0 B            87.7 kB
├ ○ /auth/error                            353 B          88.1 kB
├ ○ /auth/session                          16.5 kB         104 kB
├ ○ /auth/signin                           2 kB           89.7 kB
├ λ /post/[id]                             867 B          88.6 kB
└ λ /posts                                 862 B          88.6 kB
+ First Load JS shared by all              88.6 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-e8908d846c622fd4.js        25.7 kB
  ├ chunks/pages/_app-d69112ac38a40665.js  14.7 kB
  ├ chunks/webpack-3784993de2207fd9.js     1.86 kB
  └ css/840706503e4577c9.css               942 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
