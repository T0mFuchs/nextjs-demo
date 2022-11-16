# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      402 B          51.7 kB
├   /_app                                  0 B            51.3 kB
├ ○ /404                                   317 B          51.6 kB
├ ○ /500                                   328 B          51.6 kB
├ ○ /about                                 876 B          52.2 kB
├ λ /api/auth/[...nextauth]                0 B            51.3 kB
├ λ /api/post/[title]                      0 B            51.3 kB
├ λ /api/post/create                       0 B            51.3 kB
├ λ /api/post/delete                       0 B            51.3 kB
├ λ /api/post/update                       0 B            51.3 kB
├ λ /api/posts                             0 B            51.3 kB
├ ○ /auth/error                            386 B          51.7 kB
├ ○ /auth/session                          2.41 kB        53.7 kB
├ ○ /auth/signin                           1.8 kB         53.1 kB
├ λ /post/[title]                          12.6 kB        68.5 kB
└ ○ /posts                                 742 B          56.7 kB
+ First Load JS shared by all              52.9 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-7d9020c282127b11.js  15.7 kB
  ├ chunks/webpack-2dfa30c68bae0001.js     1.69 kB
  └ css/1110c2885a777722.css               1.58 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact (cons: lazyloading and servercomponents not supported)
