import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://square-potato.pockethost.io");

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);
  let [singleBlog, setSingleBlog] = useState([]);
  let [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [isPending, setIsPending] = useState(false);
  let history = useHistory();

  // const handleDelete = () => {
  //   setIsPending(true);
  //   fetch("http://localhost:8000/blogs/" + blog.id, {
  //     method: "DELETE",
  //   }).then(() => {
  //     setIsPending(false);
  //     console.log("blog deleted");
  //     history.push("/");
  //   });
  // };
  const handleDelete = async (key) => {
    setIsPending(true);
    console.log("deleting");
    await pb.collection("blog_posts").delete(key);
    console.log("deleted");
    setIsPending(false);
    history.push("/");
  };

  useEffect(() => {
    const posts = async () => {
      console.log("getting the posts...");
      const records = await pb.collection("blog_posts").getOne(id);
      setSingleBlog(records);
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

  // const { data: blog, isLoading } = useFetch(
  //   "http://localhost:8000/blogs/" + id
  // );

  return (
    <div className="blog-details">
      {isLoading && <h3>Please hold on, we are loading the data...</h3>}
      {singleBlog && (
        <article>
          <h2>{singleBlog.title}</h2>
          {writers.length >= 1 && (
            <p>
              Written by{" "}
              {
                writers.filter((writer) => writer.id === singleBlog.writer)[0]
                  .name
              }
            </p>
          )}
          <div>{singleBlog.body}</div>
          {!isPending && (
            <button onClick={() => handleDelete(id)}>Delete</button>
          )}
          {isPending && <button disabled>Deleting...</button>}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
