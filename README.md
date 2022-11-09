# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      875 B          96.5 kB
├   /_app                                  0 B            95.7 kB
├ ○ /404                                   319 B            96 kB
├ ○ /500                                   326 B            96 kB
├ ○ /about                                 780 B          96.4 kB
├ λ /api/auth/[...nextauth]                0 B            95.7 kB
├ λ /api/post/[title]                      0 B            95.7 kB
├ λ /api/post/create                       0 B            95.7 kB
├ λ /api/post/delete                       0 B            95.7 kB
├ λ /api/post/update                       0 B            95.7 kB
├ λ /api/posts                             0 B            95.7 kB
├ λ /api/posts/gettwenty                   0 B            95.7 kB
├ ○ /auth/error                            351 B            96 kB
├ ○ /auth/session                          2.64 kB        98.3 kB
├ ○ /auth/signin                           2.08 kB        97.7 kB
├ λ /post/[title]                          12.7 kB         113 kB
└ ○ /posts                                 1 kB            101 kB
+ First Load JS shared by all              96.7 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-34f3befc735d0f51.js        26.3 kB
  ├ chunks/pages/_app-152a50ed17e4fb10.js  22.1 kB
  ├ chunks/webpack-fecf8920f4c53479.js     1.93 kB
  └ css/d27af5a33d237bf8.css               1.06 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)    
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
