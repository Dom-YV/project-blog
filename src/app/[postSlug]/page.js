import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/react-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  if (!blogPost) {
    return null;
  }

  const { frontmatter } = blogPost;

  return {
    title: `${frontmatter["title"]} | ${BLOG_TITLE}`,
    description: frontmatter["abstract"],
  };
}

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  if (!blogPost) {
    notFound();
  }

  const { frontmatter, content } = blogPost;
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter["title"]}
        publishedOn={frontmatter["publishedOn"]}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
