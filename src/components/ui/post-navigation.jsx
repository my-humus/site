import React, { Component } from "react"
import { Link } from "gatsby"

import "../../scss/ui/_post-navigation.scss"

export default class PostNavigation extends Component {
  render() {
    if (this.props.previous || this.props.next) {
      const prevImage = this.props.previous.frontmatter.featuredImage ? this.props.previous.frontmatter.featuredImage.childImageSharp.sizes.src : null
      const nextImage = this.props.next.frontmatter.featuredImage ? this.props.next.frontmatter.featuredImage.childImageSharp.sizes.src : null

      return (
        <nav className="post-nav">
          <ul>
            <li>
              {this.props.previous && (
                <Link to={this.props.previous.fields.slug} rel="prev">
                  <img src={prevImage} />
                  <i className="icon-myhumus-circle-left"></i> {this.props.previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {this.props.next && (
                <img src={nextImage} />
                <Link to={this.props.next.fields.slug} rel="next">
                  {this.props.next.frontmatter.title} <i className="icon-myhumus-circle-right"></i>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )
    } else {
      return null
    }
  }
}
