import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://square-potato.pockethost.io");

const BlogDetails = () => {
  const { id } = useParams();
  let [singleBlog, setSingleBlog] = useState([]);
  let [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [isPending, setIsPending] = useState(false);
  let history = useHistory();

  const handleDelete = async (key) => {
    setIsPending(true);
    await pb.collection("blog_posts").delete(key);
    setIsPending(false);
    history.push("/");
  };

  useEffect(() => {
    const posts = async () => {
      const records = await pb.collection("blog_posts").getOne(id);
      setSingleBlog(records);

      setIsLoading(false);
    };
    const getWriters = async () => {
      const writers = await pb.collection("authors").getFullList();
      setWriters(writers);
    };

    posts();
    getWriters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
