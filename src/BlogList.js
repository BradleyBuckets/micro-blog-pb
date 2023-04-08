/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, title, authors }) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={"/blogs/" + blog.id}>
            <h2>{blog.title}</h2>
            {authors.length >= 1 && (
              <p>
                Written by{" "}
                {authors.filter((writer) => writer.id === blog.writer)[0].name}
              </p>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
