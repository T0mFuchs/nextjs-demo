# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.8 kB         55.3 kB
├   └ css/131c78cf2d797b4e.css             1.09 kB
├   /_app                                  0 B            51.5 kB
├ ○ /404                                   850 B          52.4 kB
├ ○ /500                                   853 B          52.4 kB
├ ○ /about                                 1 kB           52.5 kB
├   └ css/ff25a046e1bd492a.css             286 B
├ λ /api/auth/[...nextauth]                0 B            51.5 kB
├ λ /api/entries                           0 B            51.5 kB
├ λ /api/entry/[title]                     0 B            51.5 kB
├ λ /api/entry/create                      0 B            51.5 kB
├ λ /api/entry/delete                      0 B            51.5 kB
├ λ /api/entry/update                      0 B            51.5 kB
├ ○ /auth/error                            853 B          52.4 kB
├ ○ /auth/signin                           1.8 kB         53.3 kB
├ ○ /entries                               1.75 kB        57.9 kB
├   └ css/1efc628c16cd5da2.css             508 B
└ λ /entry/[title]                         3.93 kB        60.1 kB
    └ css/b7516c0fe7707b92.css             1.06 kB
+ First Load JS shared by all              53 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-700ff7a0e01ede07.js  15.5 kB
  ├ chunks/webpack-03915dfa1c9904a8.js     2.09 kB
  └ css/188628ddd4c9321a.css               1.51 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
