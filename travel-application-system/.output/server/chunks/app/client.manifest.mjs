const client_manifest = {
  "node_modules/nuxt/dist/app/entry.mjs": {
    "file": "entry-4befcf6e.mjs",
    "src": "node_modules/nuxt/dist/app/entry.mjs",
    "isEntry": true,
    "dynamicImports": [
      "pages/admin.vue",
      "pages/index.vue",
      "pages/login.vue",
      "pages/user.vue",
      "middleware/auth.ts"
    ],
    "css": [
      "entry.b20b14e3.css"
    ]
  },
  "pages/admin.vue": {
    "file": "admin-b0cf6448.mjs",
    "src": "pages/admin.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-2b80dda0.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-de12ca84.mjs",
      "_cookie-2b207c87.mjs"
    ]
  },
  "_Container-2b80dda0.mjs": {
    "file": "Container-2b80dda0.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-de12ca84.mjs",
      "_cookie-2b207c87.mjs"
    ]
  },
  "_cookie-2b207c87.mjs": {
    "file": "cookie-2b207c87.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "_fetch-de12ca84.mjs": {
    "file": "fetch-de12ca84.mjs",
    "imports": [
      "_cookie-2b207c87.mjs",
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "pages/index.vue": {
    "file": "index-9724d859.mjs",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-2b80dda0.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-de12ca84.mjs",
      "_cookie-2b207c87.mjs"
    ]
  },
  "pages/login.vue": {
    "file": "login-362bb8e9.mjs",
    "src": "pages/login.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-de12ca84.mjs",
      "_cookie-2b207c87.mjs"
    ]
  },
  "pages/user.vue": {
    "file": "user-2c52d537.mjs",
    "src": "pages/user.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-2b80dda0.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-de12ca84.mjs",
      "_cookie-2b207c87.mjs"
    ]
  },
  "middleware/auth.ts": {
    "file": "auth-e4b4a5eb.mjs",
    "src": "middleware/auth.ts",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_cookie-2b207c87.mjs"
    ]
  }
};

export { client_manifest as default };
//# sourceMappingURL=client.manifest.mjs.map
