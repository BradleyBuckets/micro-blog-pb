import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://square-potato.pockethost.io");

const Home = () => {
  let [blogPosts, setBlogPosts] = useState([]);
  let [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const posts = async () => {
      const records = await pb.collection("blog_posts").getFullList();
      setBlogPosts(records);
      setIsLoading(false);
    };
    const getWriters = async () => {
      const writers = await pb.collection("authors").getFullList();
      setWriters(writers);
    };

    posts();
    getWriters();
  }, []);

  return (
    <div className="home">
      {isLoading && <h3>Please hold on, we are loading the data...</h3>}
      {blogPosts.length >= 1 && (
        <BlogList blogs={blogPosts} title={"All Blogs"} authors={writers} />
      )}
      {blogPosts.length >= 1 && (
        <BlogList
          blogs={blogPosts.filter((blog) => blog.writer === "2o8xf5tymn2n2a5")}
          title={"Featured Blogs"}
          authors={writers}
        />
      )}
    </div>
  );
};

export default Home;
