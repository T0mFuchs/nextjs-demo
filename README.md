# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.8 kB         55.5 kB
├   └ css/c222e228215a81c3.css             1.09 kB
├   /_app                                  0 B            51.7 kB
├ ○ /404                                   850 B          52.6 kB
├ ○ /500                                   853 B          52.6 kB
├ ○ /about                                 1 kB           52.7 kB
├   └ css/ff25a046e1bd492a.css             286 B
├ λ /api/auth/[...nextauth]                0 B            51.7 kB
├ λ /api/entries                           0 B            51.7 kB
├ λ /api/entry/[title]                     0 B            51.7 kB
├ λ /api/entry/create                      0 B            51.7 kB
├ λ /api/entry/delete                      0 B            51.7 kB
├ λ /api/entry/update                      0 B            51.7 kB
├ ○ /auth/error                            853 B          52.6 kB
├ ○ /auth/signin                           1.8 kB         53.5 kB
├ ○ /entries                               1.72 kB        58.1 kB
├   └ css/f7f68cdf288dae5f.css             538 B
└ λ /entry/[title]                         3.93 kB        60.3 kB
    └ css/979276f40788a481.css             1.1 kB
+ First Load JS shared by all              53.2 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-b5ce6bf331842b67.js  15.7 kB
  ├ chunks/webpack-c054a97c5dc4e1c0.js     2.09 kB
  └ css/9e654bdbcf4d9a53.css               1.49 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
