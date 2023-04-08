import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://square-potato.pockethost.io");

const Create = () => {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [writer, setAuthor] = useState("zprpafjghhfnpa7");
  let [isPending, setIsPending] = useState(false);
  let history = useHistory();
  let author = "luigi";

  const createBlog = async (data) => {
    await pb.collection("blog_posts").create(data);
    setIsPending(false);
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author, writer };
    setIsPending(true);
    createBlog(blog);
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Content:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select value={writer} onChange={(e) => setAuthor(e.target.value)}>
          <option value="zprpafjghhfnpa7">Mario</option>
          <option value="lmwuae8lwf1ex6b">Yoshi</option>
          <option value="2o8xf5tymn2n2a5">Luigi</option>
        </select>
        {isPending && <button disabled>Adding...</button>}
        {!isPending && <button>Add Blog</button>}
      </form>
      <div>{title}</div>
      <div>{body}</div>
      <div>{writer}</div>
    </div>
  );
};

export default Create;
