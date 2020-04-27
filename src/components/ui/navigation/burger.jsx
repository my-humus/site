import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

export default class Burger extends Component {
  handleClick = e => {
    this.props.onClick(e)
  }

  render() {
    return (
      <Link
        to={`/`}
        onClick={this.handleClick}
        role="button"
        className={classNames({
          "navbar-burger": true,
          "burger": true,
          "is-active": this.props.active
        })}
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </Link>
    )
  }
}
