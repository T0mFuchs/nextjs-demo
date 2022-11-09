# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      765 B          89.2 kB
├   /_app                                  0 B            88.4 kB
├ ○ /404                                   319 B          88.7 kB
├ ○ /500                                   326 B          88.8 kB
├ ○ /about                                 686 B          89.1 kB
├ λ /api/auth/[...nextauth]                0 B            88.4 kB
├ λ /api/post/[title]                      0 B            88.4 kB
├ λ /api/post/create                       0 B            88.4 kB
├ λ /api/post/delete                       0 B            88.4 kB
├ λ /api/post/update                       0 B            88.4 kB
├ λ /api/posts                             0 B            88.4 kB
├ λ /api/posts/all                         0 B            88.4 kB
├ ○ /auth/error                            351 B          88.8 kB
├ ○ /auth/session                          2.55 kB          91 kB
├ ○ /auth/signin                           2.09 kB        90.5 kB
├ λ /post/[title]                          12.5 kB         101 kB
└ λ /posts                                 982 B          89.4 kB
+ First Load JS shared by all              89.4 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-34f3befc735d0f51.js        26.3 kB
  ├ chunks/pages/_app-3594752f437fcad2.js  14.8 kB
  ├ chunks/webpack-d063a97e2ffd75a9.js     1.92 kB
  └ css/fd1ac4a90deca1b8.css               937 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
