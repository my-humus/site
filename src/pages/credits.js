import React from "react"

import Section from "../components/ui/section"
import IndexLayout from "../components/layouts/index-layout"

export default class CreditsPage extends React.Component {
  render() {
    return (
      <IndexLayout location={this.props.location}>
        <Section title="Credits" subtitle="myhumus.com">
          <div className="columns">
            <div className="is-one-third">
              <a href="https://pittica.com" title="Pittica">
                <img src="https://media.pittica.com/brand/positive/powered-by.svg" title="Pittica" alt="Pittica" width="206" height="70" />
              </a>
            </div>
          </div>
        </Section>
      </IndexLayout>
    )
  }
}
