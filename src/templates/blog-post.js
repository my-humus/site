import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Footer from "../components/ui/footer"
import Section from "../components/ui/section"
import Hero from "../components/ui/hero"
import TagLink from "../components/ui/link/tag-link"
import CategoryLinks from "../components/ui/link/category-links"
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
              <div className="blog-post-title">
                {image && (
                  <Img
                    fixed={image}
                    style={{ width: "100%", height: "100vh" }}
                    className="blog-post-image"
                  />
                )}
                <Hero title={post.frontmatter.title} subtitle={post.frontmatter.description} />
              </div>
              <div className="post-meta">
                <Section>
                  <div className="container">
                    <div className="columns">
                      <div className="column">
                        <p>
                          <i className="icon-myhumus-clock"></i> {post.frontmatter.date}
                        </p>
                      </div>
                    </div>
                    <div className="column">
                      <CategoryLinks categories={post.frontmatter.categories} />
                    </div>
                  </div>
                </Section>
              </div>
            </header>
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
        categories
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
