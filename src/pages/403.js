import React from "react"

import ErrorLayout from "../components/layouts/error-layout"

export default class ForbiddenPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="403" title="Forbidden" location={this.props.location} />
    )
  }
}
