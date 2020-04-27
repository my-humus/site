import React, { Component } from "react"
import { Link } from "gatsby"

import "../../../scss/ui/link/_date-link.scss"

export default class DateLink extends Component {
  render() {
    return (
      <Link to={this.props.node.fields.slug} className="date-link">
        <span>
          <i className="icon-myhumus-clock"></i> {this.props.node.frontmatter.date}
        </span>
      </Link>
    )
  }
}
