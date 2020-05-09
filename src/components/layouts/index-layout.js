import React from "react"
import { Helmet } from "react-helmet"
import MainNavigation from "../ui/navigation/main-navigation"
import Footer from "../ui/footer"
import SEO from "../seo/seo"

export default class IndexLayout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <>
        <Helmet bodyAttributes={{ class: "has-navbar-fixed-top" }} />
        <SEO title={title} path={location.pathname} />
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
