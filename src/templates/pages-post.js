import React from "react"
import { graphql } from "gatsby"

import PostLayout from "../components/layouts/post-layout"

class DefaultPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <PostLayout
        title={post.frontmatter.title}
        post={post}
        location={this.props.location}
      >
        <article className="blog-post">
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">{post.frontmatter.title}</h1>
                <h2 className="subtitle">{post.frontmatter.description}</h2>
              </div>
            </div>
          </section>
          <div className="container">
            <section
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </article>
      </PostLayout>
    )
  }
}

export default DefaultPostTemplate

export const pageQuery = graphql`
  query DefaultPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
      }
    }
  }
`
