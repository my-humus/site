import React, { Component } from "react"
import { Link } from "gatsby"
import { pathify } from "gatsby-plugin-categories/internals"
import slugify from "slug"

export default class CategoryLink extends Component {
  render() {
    const path = pathify('category', slugify(this.props.category, { lower: true }));
    
    return (
      <Link to={path} className="category-link">
        <span><i className="icon-myhumus-folder"></i> {this.props.category}</span>
      </Link>
    )
  }
}