import React from "react"
import MainNavigation from "../ui/navigation/main-navigation"
import Footer from "../ui/footer"
import SEO from "../seo/seo"

import "../../scss/layouts/_default-layout.scss"

export default class DefaultLayout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <div className="default-layout">
        <SEO title={title} path={location.pathname} />
        <MainNavigation
          title={title}
          root={location.pathname === `${__PATH_PREFIX__}/`}
        />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}
