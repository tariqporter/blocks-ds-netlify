import React from "react"

const IndexPage = () => {
  const [frontmatter] = React.useState({ title: '', date: '' });

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blog-post-content">
          Hello
        </div>
      </div>
    </div>
  );
}

export default IndexPage
