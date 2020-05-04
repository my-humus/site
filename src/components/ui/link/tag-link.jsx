import React, { Component } from "react"
import { Link } from "gatsby"
import { linkify } from "../../../utils/linkify-tag"

import "../../../scss/ui/link/_tag-link.scss"

export default class TagLink extends Component {
  render() {
    return (
      <Link to={linkify(this.props.tag)} className="tag-link">
        <i className="icon-myhumus-tag"></i> {this.props.tag}
      </Link>
    )
  }
}
