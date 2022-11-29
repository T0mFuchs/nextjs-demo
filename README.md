# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.77 kB        55.3 kB
├   └ css/4cb5ee845b9f7047.css             1.08 kB
├   /_app                                  0 B            51.5 kB
├ ○ /404                                   850 B          52.3 kB
├ ○ /500                                   853 B          52.3 kB
├ ○ /about                                 1 kB           52.5 kB
├   └ css/ff25a046e1bd492a.css             286 B
├ λ /api/auth/[...nextauth]                0 B            51.5 kB
├ λ /api/entries                           0 B            51.5 kB
├ λ /api/entry/[title]                     0 B            51.5 kB
├ λ /api/entry/create                      0 B            51.5 kB
├ λ /api/entry/delete                      0 B            51.5 kB
├ λ /api/entry/update                      0 B            51.5 kB
├ ○ /auth/error                            853 B          52.3 kB
├ ○ /auth/signin                           1.8 kB         53.3 kB
├ ○ /entries                               1.53 kB        57.7 kB
├   └ css/52a30a976849a8af.css             333 B
└ λ /entry/[title]                         3.91 kB        60.1 kB
    └ css/77aea7bea3c59355.css             1.06 kB
+ First Load JS shared by all              52.9 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-ec5cda1e285231e5.js  15.5 kB
  ├ chunks/webpack-96930909108edfad.js     2.09 kB
  └ css/25620681ef6687dc.css               1.41 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
