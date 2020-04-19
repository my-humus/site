import React from "react"
import Layout from "../components/layout"
import Hero from "../components/ui/hero"

export default class ErrorLayout extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title={this.props.title}>
        <Hero title={this.props.code} subtitle={this.props.title} />
      </Layout>
    )
  }
}
