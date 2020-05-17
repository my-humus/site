import React, { Component } from "react"

import { Paginator } from "@pittica/gatsby-plugin-blog"

import "../scss/utils/_paginator.scss"

export default class GroupNavigator extends Component {
  render() {
    return (
      <Paginator context={this.props.context} className="paginator-nav" />
    )
  }
}
