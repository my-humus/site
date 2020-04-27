import React, { Component } from "react"
import { Link } from "gatsby"

import "../../../scss/ui/_post-navigation.scss"

export default class PostNavigation extends Component {
  render() {
    if (this.props.previous || this.props.next) {
      return (
        <nav className="post-nav">
          <h1>Altri articoli</h1>
          <ul>
            <li>
              {this.props.previous && (
                <Link to={this.props.previous.fields.slug} rel="prev">
                  <i className="icon-myhumus-circle-left"></i>{" "}
                  {this.props.previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {this.props.next && (
                <Link to={this.props.next.fields.slug} rel="next">
                  {this.props.next.frontmatter.title}{" "}
                  <i className="icon-myhumus-circle-right"></i>
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
