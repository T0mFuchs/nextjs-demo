# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      783 B          85.8 kB
├   /_app                                  0 B            85.1 kB
├ ○ /404                                   321 B          85.4 kB
├ ○ /500 (327 ms)                          329 B          85.4 kB
├ ○ /about                                 796 B          85.9 kB
├ λ /api/auth/[...nextauth]                0 B            85.1 kB
├ λ /api/post/[title]                      0 B            85.1 kB
├ λ /api/post/create                       0 B            85.1 kB
├ λ /api/post/delete                       0 B            85.1 kB
├ λ /api/post/update                       0 B            85.1 kB
├ λ /api/posts                             0 B            85.1 kB
├ λ /api/posts/gettwenty                   0 B            85.1 kB
├ ○ /auth/error                            353 B          85.4 kB
├ ○ /auth/session (487 ms)                 1.19 kB        86.2 kB
├ ○ /auth/signin                           2.08 kB        87.1 kB
├ λ /post/[title]                          13.5 kB         105 kB
└ ○ /posts                                 1.93 kB        93.7 kB
+ First Load JS shared by all              86.1 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-e8908d846c622fd4.js        25.7 kB
  ├ chunks/pages/_app-831cdf11acdf0434.js  11.6 kB
  ├ chunks/webpack-b234d28f863c29af.js     2.36 kB
  └ css/6fdce991e5b3e2e1.css               1.08 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
