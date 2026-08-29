export const SKILL_CATEGORY_MAP: Record<string, string> = {
  Java: "Languages", JavaScript: "Languages", TypeScript: "Languages", C: "Languages",
  PHP: "Languages", Python: "Languages", HTML: "Languages", CSS: "Languages",
  SCSS: "Languages", Blade: "Languages", Makefile: "Languages", "yaml-configuration": "Languages",
  reactjs: "Frontend", react: "Frontend", tailwindcss: "Frontend",
  expressjs: "Backend", nodejs: "Backend", "razorpay-api": "Backend",
  mongo: "DevOps", mongoose: "DevOps",
  docker: "DevOps", dockerfile: "DevOps", helm: "DevOps", kubernetes: "DevOps",
};

export const SKILL_ICON_SLUGS: Record<string, string> = {
  Java: "openjdk", JavaScript: "javascript", TypeScript: "typescript", C: "c",
  PHP: "php", Python: "python", HTML: "html5", CSS: "css3", SCSS: "sass",
  Blade: "laravel", Makefile: "gnubash", "yaml-configuration": "yaml",
  reactjs: "react", react: "react", tailwindcss: "tailwindcss",
  expressjs: "express", nodejs: "nodedotjs", "razorpay-api": "razorpay",
  mongo: "mongodb", mongoose: "mongodb", docker: "docker", dockerfile: "docker",
  helm: "helm", kubernetes: "kubernetes",
};

export function skillIconSlug(name: string): string {
  return SKILL_ICON_SLUGS[name] || name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const FILTER_CATEGORIES = ["Frontend", "Backend", "DevOps"];

export function projectCategories(language: string | null | undefined, topics: string[]): string[] {
  const cats = new Set<string>();
  if (language && SKILL_CATEGORY_MAP[language]) cats.add(SKILL_CATEGORY_MAP[language]);
  (topics || []).forEach((t) => {
    const cat = SKILL_CATEGORY_MAP[t];
    if (cat) cats.add(cat);
  });
  return Array.from(cats);
}
