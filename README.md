# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.34 kB        53.8 kB
├   └ css/54945673a051d473.css             827 B
├   /_app                                  0 B            51.5 kB
├ ○ /404                                   850 B          52.3 kB
├ ○ /500                                   852 B          52.3 kB
├ ○ /about                                 981 B          52.4 kB
├ λ /api/auth/[...nextauth]                0 B            51.5 kB
├ λ /api/entries                           0 B            51.5 kB
├ λ /api/entry/[title]                     0 B            51.5 kB
├ λ /api/entry/create                      0 B            51.5 kB
├ λ /api/entry/delete                      0 B            51.5 kB
├ λ /api/entry/update                      0 B            51.5 kB
├ ○ /auth/error                            381 B          51.8 kB
├ ○ /auth/signin                           1.8 kB         53.3 kB
├ ○ /entries                               1.53 kB        57.7 kB
├   └ css/af11e2ac5b16ed00.css             341 B
└ λ /entry/[title]                         3.63 kB        59.8 kB
    └ css/273f595848c4b646.css             149 B
+ First Load JS shared by all              52.9 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-b1e136b070524e65.js  15.5 kB
  ├ chunks/webpack-24c7afdabf93f5e1.js     2.08 kB
  └ css/890f18af796485d4.css               1.41 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
