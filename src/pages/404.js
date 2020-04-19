import React from "react"

import ErrorLayout from "../components/error-layout"

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="404" title="Not Found" location={this.props.location} />
    )
  }
}
