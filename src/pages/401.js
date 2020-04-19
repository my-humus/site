import React from "react"

import ErrorLayout from "../components/error-layout"

export default class UnauthorizedPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="401" title="Unauthorized" location={this.props.location} />
    )
  }
}
