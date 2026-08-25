import { defineMiddleware } from "astro:middleware";

const ROUTES: Record<string, string> = {
  "/api/profile": "http://backend:9000/profile",
  "/api/projects": "http://backend:9000/projects",
  "/api/skills": "http://backend:9000/skills",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const match = Object.keys(ROUTES).find((prefix) => url.pathname.startsWith(prefix));

  if (!match) return next();

  const target = ROUTES[match] + url.pathname.replace(match, "") + url.search;
  const proxied = await fetch(target, {
    method: context.request.method,
    headers: context.request.headers,
    body: ["GET", "HEAD"].includes(context.request.method) ? undefined : await context.request.text(),
  });

  return new Response(proxied.body, {
    status: proxied.status,
    headers: proxied.headers,
  });
});
