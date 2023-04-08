import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://square-potato.pockethost.io");
// import useFetch from "./useFetch";
// const { data: blogs, isLoading } = useFetch("http://localhost:8000/blogs");

const Home = () => {
  let [blogPosts, setBlogPosts] = useState([]);
  let [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const posts = async () => {
      console.log("getting the posts...");
      const records = await pb.collection("blog_posts").getFullList();
      setBlogPosts(records);
      console.log("posts retreived");
      setIsLoading(false);
    };
    const getWriters = async () => {
      console.log("getting the writers...");
      const writers = await pb.collection("authors").getFullList();
      setWriters(writers);
      console.log("writers retreived");
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
      {/* {blogs && (
        <BlogList
          blogs={blogs.filter((blog) => blog.author === "mario")}
          title={"Featured Blogs"}
        />
      )} */}
    </div>
  );
};

export default Home;
