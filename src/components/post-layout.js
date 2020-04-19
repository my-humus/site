import React from "react"
import Header from "./header"
import Footer from "./footer"
import SEO from "../components/seo/seo"

export default class PostLayout extends React.Component {
  render() {
    const { location, title, children, post, image } = this.props

    return (
      <>
        <SEO
          title={title}
          description={post.frontmatter.description || post.excerpt}
          frontmatter={post.frontmatter}
          isBlogPost={true}
          image={image}
          postData={post}
          path={location.pathname}
        />
        <Header title={title} root={location.pathname === `${__PATH_PREFIX__}/`} />
        <main>
          <div className="inner-page">
            {children}
          </div>
        </main>
        <Footer />
      </>
    )
  }
}
