import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import Burger from "./burger"

import "../../../scss/ui/navigation/_main-navigation.scss"

export default class MainNavigation extends Component {
  state = {
    isActive: false
  }

  handleClick = e => {
    e.preventDefault()
    this.setState(state => ({ isActive: !state.isActive }))
    return false
  }

  render() {
    return (
      <nav
        className={classNames({
          "navbar": true,
          "is-fixed-top": true
        })}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to={`/`} className="navbar-logo">
            <i className="icon-myhumus-logo"></i>
          </Link>
          <Burger active={this.state.isActive} onClick={this.handleClick} />
        </div>
        <div id="navbar-top-menu" className={classNames({
          "navbar-menu": true,
          "is-active": this.state.isActive
        })}>
          <div className="navbar-start">
            <Link to={`/blog`} className="navbar-item">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
