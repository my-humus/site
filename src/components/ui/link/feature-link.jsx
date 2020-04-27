import React, { Component } from "react"
import { Link } from "gatsby"

export default class FeatureLink extends Component {
  render() {
    return (
      <Link to={this.props.to} className="feature-link">
        <span>{this.props.label}</span>
      </Link>
    )
  }
}
