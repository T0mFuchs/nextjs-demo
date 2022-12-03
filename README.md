# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.73 kB        55.1 kB
├   └ css/4b64b53892e69626.css             1.08 kB
├   /_app                                  0 B            51.4 kB
├ ○ /404                                   874 B          52.3 kB
├ ○ /500                                   876 B          52.3 kB
├ ○ /about                                 993 B          52.4 kB
├   └ css/677506dd93a9a020.css             298 B
├ λ /api/auth/[...nextauth]                0 B            51.4 kB
├ λ /api/entries                           0 B            51.4 kB
├ λ /api/entry/[title]                     0 B            51.4 kB
├ λ /api/entry/create                      0 B            51.4 kB
├ λ /api/entry/delete                      0 B            51.4 kB
├ λ /api/entry/update                      0 B            51.4 kB
├ ○ /auth/error                            876 B          52.3 kB
├ ○ /auth/signin                           1.8 kB         53.2 kB
├ ○ /entries                               2.45 kB        58.8 kB
├   └ css/14130e694611b789.css             881 B
└ λ /entry/[title]                         4.52 kB        60.9 kB
    └ css/6abc367449a7b213.css             1.36 kB
+ First Load JS shared by all              52.9 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-2e7ecc20cb071874.js  15.4 kB
  ├ chunks/webpack-0362911ccf94ee8f.js     2.14 kB
  └ css/c52d0b9dbaad3393.css               1.48 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
