import React from "react"

import ErrorLayout from "../components/error-layout"

export default class ForbiddenPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="403" title="Forbidden" location={this.props.location} />
    )
  }
}
