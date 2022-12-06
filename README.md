# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

## pwa installable

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.71 kB        57.3 kB
├   └ css/c0900a3eed464988.css             1.08 kB
├   /_app                                  0 B            53.6 kB
├ ○ /404                                   871 B          54.5 kB
├ ○ /500                                   867 B          54.5 kB
├ ○ /about                                 991 B          54.6 kB
├   └ css/677506dd93a9a020.css             298 B
├ λ /api/auth/[...nextauth]                0 B            53.6 kB
├ λ /api/entries                           0 B            53.6 kB
├ λ /api/entries/[limit]                   0 B            53.6 kB
├ λ /api/entry/[title]                     0 B            53.6 kB
├ λ /api/entry/create                      0 B            53.6 kB
├ λ /api/entry/delete                      0 B            53.6 kB
├ λ /api/entry/update                      0 B            53.6 kB
├ ○ /auth/error                            871 B          54.5 kB
├ ○ /auth/signin                           1.81 kB        55.4 kB
├ ○ /entries                               2.47 kB        61.1 kB
├   └ css/14130e694611b789.css             881 B
└ λ /entry/[title]                         4.52 kB        63.1 kB
    └ css/e75b3562b0f66e60.css             1.36 kB
+ First Load JS shared by all              55.1 kB
  ├ chunks/main-6bcc21a1bc19028f.js        36.1 kB
  ├ chunks/pages/_app-8a494b87bf636822.js  15.4 kB
  ├ chunks/webpack-ac6abe8e459c8531.js     2.15 kB
  └ css/c52d0b9dbaad3393.css               1.48 kB
```

## saving 40kb by switching out react with preact
