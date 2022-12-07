# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

## pwa installable` ` ` < 200kB`

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.72 kB        57.3 kB
├   └ css/c0900a3eed464988.css             1.08 kB
├   /_app                                  0 B            53.6 kB
├ ○ /404                                   871 B          54.5 kB
├ ○ /500                                   867 B          54.5 kB
├ ○ /about                                 4.72 kB        58.3 kB
├   └ css/c1a03470332c5744.css             391 B
├ λ /api/auth/[...nextauth]                0 B            53.6 kB
├ λ /api/entries                           0 B            53.6 kB
├ λ /api/entries/[limit]                   0 B            53.6 kB
├ λ /api/entry/[title]                     0 B            53.6 kB
├ λ /api/entry/create                      0 B            53.6 kB
├ λ /api/entry/delete                      0 B            53.6 kB
├ λ /api/entry/update                      0 B            53.6 kB
├ ○ /auth/error                            871 B          54.5 kB
├ ○ /auth/signin                           1.81 kB        55.4 kB
├ ○ /entries                               2.9 kB         61.5 kB
├   └ css/33fcc036ea2c6c4b.css             989 B
└ λ /entry/[title]                         4.52 kB        63.1 kB
    └ css/e75b3562b0f66e60.css             1.36 kB
+ First Load JS shared by all              55.1 kB
  ├ chunks/main-6bcc21a1bc19028f.js        36.1 kB
  ├ chunks/pages/_app-c64fbc58a56bd5cc.js  15.3 kB
  ├ chunks/webpack-eae4c72fb212c76f.js     2.15 kB
  └ css/e41ca63aab46d652.css               1.49 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
