# `nextjs ssr demo app`

## nextjs api, nextauth, prisma & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      402 B          51.8 kB
├   /_app                                  0 B            51.4 kB
├ ○ /404                                   317 B          51.7 kB
├ ○ /500                                   328 B          51.7 kB
├ λ /api/auth/[...nextauth]                0 B            51.4 kB
├ λ /api/post/[title]                      0 B            51.4 kB
├ λ /api/post/create                       0 B            51.4 kB
├ λ /api/post/delete                       0 B            51.4 kB
├ λ /api/post/update                       0 B            51.4 kB
├ λ /api/posts                             0 B            51.4 kB
├ ○ /auth/error                            386 B          51.7 kB
├ ○ /auth/session                          2.41 kB        53.8 kB
├ ○ /auth/signin                           1.8 kB         53.2 kB
├ λ /post/[title]                          12.6 kB        68.6 kB
├ ○ /posts                                 891 B          56.9 kB
└ ○ /whatisthis                            870 B          52.2 kB
+ First Load JS shared by all              53.1 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-37e37c7bf863c7f2.js  15.8 kB
  ├ chunks/webpack-aa5148bbadf9edfb.js     1.69 kB
  └ css/07e82d02530053e3.css               1.71 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)    
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact (cons: lazyloading and servercomponents not supported)
