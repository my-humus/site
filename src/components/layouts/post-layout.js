import React from "react"
import Footer from "../ui/footer"
import MainNavigation from "../ui/navigation/main-navigation"
import SEO from "../seo/seo"

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
        <MainNavigation
          title={title}
          root={location.pathname === `${__PATH_PREFIX__}/`}
        />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
}
