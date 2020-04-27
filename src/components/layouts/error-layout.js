import React from "react"
import DefaultLayout from "../layouts/default-layout"
import Hero from "../ui/hero"

export default class ErrorLayout extends React.Component {
  render() {
    return (
      <DefaultLayout location={this.props.location} title={this.props.title}>
        <Hero title={this.props.code} subtitle={this.props.title} />
      </DefaultLayout>
    )
  }
}
