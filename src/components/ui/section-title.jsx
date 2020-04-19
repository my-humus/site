import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

export default class SectionTitle extends Component {
  render() {
    let title = this.props.title
    let subtitle = this.props.subtitle

    if (this.props.link) {
      title = (
        <Link to={this.props.link}>
          {this.props.title}
        </Link>
      )
      subtitle = (
        <Link to={this.props.link}>
          {this.props.subtitle}
        </Link>
      )
    }

    return (
      <div className="container">
        {this.props.title && (
          <h1 className={classNames({
            title: true,
            "has-text-centered": this.props.centered
          })}>
            {title}
          </h1>
        )}
        {this.props.subtitle && (
          <h2 className={classNames({
            subtitle: true,
            "has-text-centered": this.props.centered
          })}>
            {subtitle}
          </h2>
        )}
      </div>
    )
  }
}
