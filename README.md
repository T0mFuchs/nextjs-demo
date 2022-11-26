# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      1.68 kB        50.6 kB
├   └ css/82bc067f2163df71.css             577 B
├   /_app                                  0 B              49 kB
├ ○ /404                                   381 B          49.3 kB
├ ○ /500                                   383 B          49.3 kB
├ ○ /about                                 514 B          49.5 kB
├ λ /api/auth/[...nextauth]                0 B              49 kB
├ λ /api/entries                           0 B              49 kB
├ λ /api/entry/[title]                     0 B              49 kB
├ λ /api/entry/create                      0 B              49 kB
├ λ /api/entry/delete                      0 B              49 kB
├ λ /api/entry/update                      0 B              49 kB
├ ○ /auth/error                            381 B          49.3 kB
├ ○ /auth/signin                           1.8 kB         50.8 kB
├ ○ /entries (316 ms)                      1.52 kB        55.1 kB
├   └ css/af11e2ac5b16ed00.css             341 B
└ λ /entry/[title]                         1.87 kB        55.5 kB
+ First Load JS shared by all              50.1 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-7b270afa7474dcdf.js  14.3 kB
  ├ chunks/webpack-ee7e63bc15b31913.js     815 B
  └ css/6d31298fab92fc98.css               1.13 kB
```

## saving 40kb by switching out react with preact
