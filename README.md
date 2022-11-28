# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.33 kB        53.8 kB
├   └ css/99a26f05793b97c3.css             816 B
├   /_app                                  0 B            51.5 kB
├ ○ /404                                   850 B          52.3 kB
├ ○ /500                                   853 B          52.4 kB
├ ○ /about                                 1 kB           52.5 kB
├   └ css/9b0b296fa88c5256.css             267 B
├ λ /api/auth/[...nextauth]                0 B            51.5 kB
├ λ /api/entries                           0 B            51.5 kB
├ λ /api/entry/[title]                     0 B            51.5 kB
├ λ /api/entry/create                      0 B            51.5 kB
├ λ /api/entry/delete                      0 B            51.5 kB
├ λ /api/entry/update                      0 B            51.5 kB
├ ○ /auth/error                            853 B          52.4 kB
├ ○ /auth/signin                           1.8 kB         53.3 kB
├ ○ /entries                               1.53 kB        57.7 kB
├   └ css/af11e2ac5b16ed00.css             341 B
└ λ /entry/[title]                         3.87 kB          60 kB
    └ css/76cf859b64ae83ab.css             746 B
+ First Load JS shared by all              52.9 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-f6c53fc0239c4d08.js  15.5 kB
  ├ chunks/webpack-22dd45e58b18d144.js     2.09 kB
  └ css/0ee730ced71a96c3.css               1.45 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)

```

## saving 40kb by switching out react with preact
