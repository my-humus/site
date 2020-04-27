import React, { Component } from "react"
import SectionTitle from "./section-title"

class Section extends Component {
  render() {
    return (
      <section className="section">
        <SectionTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
          link={this.props.link}
        />
        {this.props.children && (
          <div className="container">{this.props.children}</div>
        )}
      </section>
    )
  }
}

export default Section
