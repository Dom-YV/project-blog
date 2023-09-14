import RSS from "rss";
import { BLOG_TITLE } from "../constants.js";
import { getBlogPostList } from "../helpers/file-helpers.js";
import fs from "fs/promises";

var feed = new RSS({
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
  feed_url: "http://localhost:3000/rss.xml",
  site_url: "http://localhost:3000",
});

getBlogPostList().then((blogList) => {
  blogList.forEach(({ slug, ...frontmatter }) => {
    feed.item({
      title: frontmatter["title"],
      description: frontmatter["abstract"],
      url: `http://localhost:3000/${slug}`,
      date: frontmatter["publishedOn"],
    });
  });

  fs.writeFile("public/rss.xml", feed.xml(), { flag: "w+" });
});
