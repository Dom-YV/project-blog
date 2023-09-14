import matter from "gray-matter";
import React from "react";
import { readFile } from "./file-helpers";

export const loadBlogPost = React.cache(async (slug) => {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});
