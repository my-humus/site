import React from "react"

import ErrorLayout from "../components/error-layout"

export default class InternalErrorPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="500" title="Internal Error" location={this.props.location} />
    )
  }
}
