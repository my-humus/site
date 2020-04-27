import React, { Component } from "react"
import SectionTitle from "./section-title"

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <SectionTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
          link={this.props.link}
        />
        {this.props.children && (
          <div className="container">{this.props.children}</div>
        )}
      </header>
    )
  }
}
