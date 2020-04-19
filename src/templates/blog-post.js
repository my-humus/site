import React from "react"
import { Link, graphql } from "gatsby"

import PostLayout from "../components/post-layout"
import TagLink from "../components/ui/link/tag-link"
import CategoryLink from "../components/ui/link/category-link"
import ArticleHeader from "../components/ui/article/article-header"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const image = post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.sizes.src : null

    return (
      <PostLayout
        title={post.frontmatter.title}
        image={image}
        post={post}
        location={this.props.location}
      >
        <article className="blog-post">
          <ArticleHeader image={image}>
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {post.frontmatter.title}
                  </h1>
                  <h2 className="subtitle">
                    <i className="icon-myhumus-clock"></i> {post.frontmatter.date}
                  </h2>
                  {post.frontmatter.category && (
                    <h2 className="subtitle" title="Categoria">
                      <CategoryLink category={post.frontmatter.category} />
                    </h2>
                  )}
                </div>
              </div>
            </section>
          </ArticleHeader>
          {post.frontmatter.tags && (
            <div className="container">
              {post.frontmatter.tags.map((tag, index) => (
                <TagLink tag={tag} key={"tag" + index} />
              ))}
            </div>
          )}
          <div className="container">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
        {(previous || next) && (
          <nav className="bottom-nav post-nav">
            <ul>
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    <i className="icon-myhumus-arrow-left"></i> {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} <i className="icon-myhumus-arrow-right"></i>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </PostLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: {slug: {eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        category
        tags
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
