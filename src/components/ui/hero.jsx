import React, { Component } from "react"
import classNames from "classnames"

import "../../scss/ui/_hero.scss"

export default class Hero extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            {this.props.title && (
              <h1
                className={classNames({
                  title: true,
                  "has-text-centered": this.props.centered
                })}
              >
                {this.props.title}
              </h1>
            )}
            {this.props.subtitle && (
              <h2
                className={classNames({
                  subtitle: true,
                  "has-text-centered": this.props.centered
                })}
              >
                {this.props.subtitle}
              </h2>
            )}
          </div>
        </div>
      </section>
    )
  }
}
