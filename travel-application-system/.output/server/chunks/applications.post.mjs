import { defineEventHandler, useBody } from 'h3';

const applications_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const { data: resp } = useFetch("http://localhost:8888/applications", { method: "post", body });
  return { resp };
});

export { applications_post as default };
//# sourceMappingURL=applications.post.mjs.map
