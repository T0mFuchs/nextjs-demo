# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      751 B          96.4 kB
├   /_app                                  0 B            95.6 kB
├ ○ /404                                   319 B            96 kB
├ ○ /500                                   326 B            96 kB
├ ○ /about                                 676 B          96.3 kB
├ λ /api/auth/[...nextauth]                0 B            95.6 kB
├ λ /api/post/[title]                      0 B            95.6 kB
├ λ /api/post/create                       0 B            95.6 kB
├ λ /api/post/delete                       0 B            95.6 kB
├ λ /api/post/update                       0 B            95.6 kB
├ λ /api/posts                             0 B            95.6 kB
├ λ /api/posts/all                         0 B            95.6 kB
├ ○ /auth/error                            351 B            96 kB
├ ○ /auth/session                          2.54 kB        98.2 kB
├ ○ /auth/signin                           2.08 kB        97.7 kB
├ λ /post/[title]                          12.6 kB         108 kB
└ ○ /posts                                 929 B          96.6 kB
+ First Load JS shared by all              96.7 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-34f3befc735d0f51.js        26.3 kB
  ├ chunks/pages/_app-cb37969b856238d1.js  22 kB
  ├ chunks/webpack-6f7d19f01805e653.js     1.93 kB
  └ css/4b4d0ab75a718ce1.css               1.04 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)    
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
