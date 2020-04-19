import React, { Component } from "react"
import classNames from "classnames"

class Image extends Component {
  render() {
    const className = {
      image: true
    }

    switch (this.props.size) {
      case 16:
        className["is-16x16"] = true
        break
      case 24:
        className["is-24x24"] = true
        break
      case 32:
        className["is-32x32"] = true
        break
      case 48:
        className["is-48x48"] = true
        break
      case 64:
        className["is-64x64"] = true
        break
      case 96:
        className["is-96x96"] = true
        break
      case 128:
        className["is-128x128"] = true
        break
      default:
        break
    }

    return (
      <img src={this.props.src} alt={this.props.title} title={this.props.title} className={classNames(className)} />
    )
  }
}

export default Image