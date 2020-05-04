import React, { Component } from "react"
import { Link } from "gatsby"
import { linkify } from "../../../utils/linkify-category"
import classNames from "classnames"

import "../../../scss/ui/link/_category-link.scss"

export default class CategoryLink extends Component {
  render() {
    const to = linkify(this.props.category)

    const className = classNames({
      "category-link": true
    })

    if (this.props.plain) {
      return (
        <Link to={to} className={className}>
          {this.props.category}
        </Link>
      )
    } else {
      return (
        <Link to={to} className={className}>
          <span>
            <i className="icon-myhumus-folder-open"></i> {this.props.category}
          </span>
        </Link>
      )
    }
  }
}
