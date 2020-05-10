import React, { Component } from "react"
import CategoryLink from "./category-link"

import "../../../scss/ui/link/_category-links.scss"

export default class CategoryLinks extends Component {
  render() {
    if (this.props.categories.length > 0) {
      return (
        <ul className="category-links">
          {this.props.categories.map((category, index) => (
            <li key={"category-" + index}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      )
    } else {
      return null
    }
  }
}
