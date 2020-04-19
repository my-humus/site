import React from "react"
import Layout from "../layouts/default"
import Hero from "../ui/hero"

export default class ErrorLayout extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title={this.props.title}>
        <Hero title={this.props.code} subtitle={this.props.title} />
      </Layout>
    )
  }
}
