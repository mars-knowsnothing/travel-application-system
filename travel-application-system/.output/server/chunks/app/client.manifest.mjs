const client_manifest = {
  "node_modules/nuxt/dist/app/entry.mjs": {
    "file": "entry-95eb0130.mjs",
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
    "file": "admin-58a4a477.mjs",
    "src": "pages/admin.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-b794cd97.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-265a7e55.mjs",
      "_cookie-a956297e.mjs"
    ]
  },
  "_Container-b794cd97.mjs": {
    "file": "Container-b794cd97.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-265a7e55.mjs",
      "_cookie-a956297e.mjs"
    ]
  },
  "_cookie-a956297e.mjs": {
    "file": "cookie-a956297e.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "_fetch-265a7e55.mjs": {
    "file": "fetch-265a7e55.mjs",
    "imports": [
      "_cookie-a956297e.mjs",
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "pages/index.vue": {
    "file": "index-e370b457.mjs",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-b794cd97.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-265a7e55.mjs",
      "_cookie-a956297e.mjs"
    ]
  },
  "pages/login.vue": {
    "file": "login-bb995b0f.mjs",
    "src": "pages/login.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-265a7e55.mjs",
      "_cookie-a956297e.mjs"
    ]
  },
  "pages/user.vue": {
    "file": "user-d63bf633.mjs",
    "src": "pages/user.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-b794cd97.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-265a7e55.mjs",
      "_cookie-a956297e.mjs"
    ]
  },
  "middleware/auth.ts": {
    "file": "auth-f6eb043e.mjs",
    "src": "middleware/auth.ts",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_cookie-a956297e.mjs"
    ]
  }
};

export { client_manifest as default };
//# sourceMappingURL=client.manifest.mjs.map
