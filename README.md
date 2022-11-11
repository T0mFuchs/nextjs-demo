# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      783 B          92.8 kB
├   /_app                                  0 B            92.1 kB
├ ○ /404                                   321 B          92.4 kB
├ ○ /500                                   329 B          92.4 kB
├ ○ /about (304 ms)                        772 B          92.8 kB
├ λ /api/auth/[...nextauth]                0 B            92.1 kB
├ λ /api/post/[title]                      0 B            92.1 kB
├ λ /api/post/create                       0 B            92.1 kB
├ λ /api/post/delete                       0 B            92.1 kB
├ λ /api/post/update                       0 B            92.1 kB
├ λ /api/posts                             0 B            92.1 kB
├ λ /api/posts/gettwenty                   0 B            92.1 kB
├ ○ /auth/error                            353 B          92.4 kB
├ ○ /auth/session                          1.19 kB        93.2 kB
├ ○ /auth/signin                           2.08 kB        94.1 kB
├ λ /post/[title]                          13.5 kB         112 kB
└ ○ /posts                                 1.93 kB         101 kB
+ First Load JS shared by all              93.1 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-e8908d846c622fd4.js        25.7 kB
  ├ chunks/pages/_app-b9c6fefd84777d47.js  18.6 kB
  ├ chunks/webpack-b73eaf758e47b881.js     2.35 kB
  └ css/7690e2f58499feb4.css               1.09 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)    
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
