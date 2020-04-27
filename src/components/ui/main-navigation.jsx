import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import classNames from "classnames"

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
    const toggleClass = classNames({
      "navbar-burger": true,
      burger: true,
      "is-active": this.state.isActive
    })
    const menuClass = classNames({
      "navbar-menu": true,
      "is-active": this.state.isActive
    })
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                appearance {
                  background
                }
              }
            }
          }
        `}
        render={data => (
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link to={`/`} className="navbar-logo">
                <i className="icon-myhumus-logo"></i>
              </Link>
              <Link
                to={`/`}
                onClick={this.handleClick}
                role="button"
                className={toggleClass}
                aria-label="menu"
                aria-expanded="false"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </Link>
            </div>
            <div id="navbar-top-menu" className={menuClass}>
              <div className="navbar-start">
                <Link to={`/blog`} className="navbar-item">
                  Blog
                </Link>
              </div>
            </div>
          </nav>
        )}
      />
    )
  }
}
