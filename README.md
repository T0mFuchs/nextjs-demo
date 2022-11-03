# `nextjs ssr demo app`

## nextjs api, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log

Route (pages)                              Size     First Load JS
┌ ○ /                                      2.21 kB        89.7 kB
├   /_app                                  0 B            87.5 kB
├ ○ /404                                   321 B          87.8 kB
├ ○ /500                                   329 B          87.9 kB
├ ○ /about                                 524 B          88.1 kB
├ λ /api/auth/[...nextauth]                0 B            87.5 kB
├ λ /api/post/[id]                         0 B            87.5 kB
├ λ /api/posts                             0 B            87.5 kB
├ λ /api/posts/all                         0 B            87.5 kB
├ ○ /auth/error                            353 B          87.9 kB
├ ○ /auth/session                          795 B          88.3 kB
├ ○ /auth/signin                           1.93 kB        89.5 kB
├ λ /post/[id]                             803 B          88.3 kB
└ λ /posts                                 798 B          88.3 kB
+ First Load JS shared by all              88.5 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-e8908d846c622fd4.js        25.7 kB
  ├ chunks/pages/_app-55be7272815a08a6.js  14.7 kB
  ├ chunks/webpack-f62345bcb7be5b32.js     1.67 kB
  └ css/5e738c7f1da791c9.css               942 B

```