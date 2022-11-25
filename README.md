# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      1.58 kB        50.7 kB
├   /_app                                  0 B            49.1 kB
├ ○ /404                                   379 B          49.5 kB
├ ○ /500                                   384 B          49.5 kB
├ ○ /about                                 505 B          49.6 kB
├ λ /api/auth/[...nextauth]                0 B            49.1 kB
├ λ /api/entries                           0 B            49.1 kB
├ λ /api/entry/[title]                     0 B            49.1 kB
├ λ /api/entry/create                      0 B            49.1 kB
├ λ /api/entry/delete                      0 B            49.1 kB
├ λ /api/entry/update                      0 B            49.1 kB
├ ○ /auth/error                            378 B          49.5 kB
├ ○ /auth/signin                           1.81 kB        50.9 kB
├ ○ /entries                               772 B          54.5 kB
└ λ /entry/[title]                         1.78 kB        55.5 kB
+ First Load JS shared by all              50.2 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-cc693f0fbbd843a1.js  14.4 kB
  ├ chunks/webpack-ee7e63bc15b31913.js     815 B
  └ css/b3844ce5f70c0cbb.css               1.11 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)     
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
