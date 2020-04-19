import React, { Component } from "react"
import classNames from "classnames"

class Hero extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            {this.props.title && (
              <h1 className={classNames({
                title: true,
                "is-size-1": true,
                "has-text-centered": this.props.centered
              })}>
                {this.props.title}
              </h1>
            )}
            {this.props.subtitle && (
              <h2 className={classNames({
                subtitle: true,
                "is-size-3": true,
                "has-text-centered": this.props.centered
              })}>
                {this.props.subtitle}
              </h2>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default Hero