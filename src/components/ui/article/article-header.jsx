import React, { Component } from "react"

export default class ArticleHeader extends Component {
  render() {
    if (this.props.image) {
      return (
        <header style={{ backgroundImage: `url(` + this.props.image + `)` }} className={this.props.className}>
          {this.props.children}
        </header>
      )
    } else {
      return (
        <header className={this.props.className}>
          {this.props.children}
        </header>
      )
    }
  }
}
