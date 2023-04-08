import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  let [isPending, setIsPending] = useState(false);
  let history = useHistory();

  const handleDelete = () => {
    setIsPending(true);
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      setIsPending(false);
      console.log("blog deleted");
      history.push("/");
    });
  };

  const { data: blog, isLoading } = useFetch(
    "http://localhost:8000/blogs/" + id
  );

  return (
    <div className="blog-details">
      {isLoading && <h3>Please hold on, we are loading the data...</h3>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          {!isPending && <button onClick={handleDelete}>Delete</button>}
          {isPending && <button disabled>Deleting...</button>}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
