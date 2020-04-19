import React from "react"
import Header from "./header"
import Footer from "./footer"
import SEO from "../components/seo/seo"

export default class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <>
        <SEO title={title} path={location.pathname} />
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
