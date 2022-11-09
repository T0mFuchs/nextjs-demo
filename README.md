# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      869 B          96.5 kB
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
  ├ chunks/pages/_app-b4aab8f3b9b39fe5.js  22.1 kB
  ├ chunks/webpack-8de46b752ea9dd90.js     1.93 kB
  └ css/aa08fd536e200125.css               1.08 kB
```
