import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Footer from "../components/ui/footer"
import TagLink from "../components/ui/link/tag-link"
import CategoryLink from "../components/ui/link/category-link"
import SEO from "../components/seo/seo"
import MainNavigation from "../components/ui/navigation/main-navigation"
import PostNavigation from "../components/ui/navigation/post-navigation"
import RelatedPosts from "../components/widgets/related-posts"

import "../scss/templates/_blog-post.scss"

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next, related } = this.props.pageContext
    const image = post.frontmatter.featuredImage
      ? post.frontmatter.featuredImage.childImageSharp.fixed
      : null

    return (
      <div className="blog-post-container">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          frontmatter={post.frontmatter}
          isBlogPost={true}
          image={image ? image.src : null}
          postData={post}
          path={this.props.location.pathname}
        />
        <MainNavigation
          title={post.frontmatter.title}
          root={this.props.location.pathname === `${__PATH_PREFIX__}/`}
        />
        <main>
          <article className="blog-post">
            <header>
              {image && (
                <Img
                  fixed={image}
                  style={{ width: "100%" }}
                  className="blog-post-image"
                />
              )}
              <section className="hero">
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title">{post.frontmatter.title}</h1>
                    {post.frontmatter.description && (
                      <h2 className="subtitle">
                        {post.frontmatter.description}
                      </h2>
                    )}
                    <div>
                      <i className="icon-myhumus-clock"></i>{" "}
                      {post.frontmatter.date}
                    </div>
                  </div>
                </div>
              </section>
            </header>
            {post.frontmatter.category && (
              <div className="container">
                <CategoryLink category={post.frontmatter.category} />
              </div>
            )}
            <div className="container">
              <section
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </article>
          {post.frontmatter.tags && (
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  {post.frontmatter.tags.map((tag, index) => (
                    <TagLink tag={tag} key={"tag" + index} />
                  ))}
                </div>
              </div>
            </section>
          )}
          <PostNavigation previous={previous} next={next} />
          <RelatedPosts posts={related} />
        </main>
        <Footer />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        category
        tags
        featuredImage {
          childImageSharp {
            fixed(width: 1280, height: 768, quality: 60) {
              ...GatsbyImageSharpFixed
            }
            sizes(maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
