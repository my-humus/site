import React from "react"
import { Helmet } from "react-helmet"

export default class TwitterCard extends React.Component {
  render() {
    return (
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={this.props.title} />
        <meta name="twitter:description" content={this.props.description} />
        <meta name="twitter:image" content={this.props.image} />
      </Helmet>
    )
  }
}
