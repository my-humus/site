import React from "react"
import { Link } from "gatsby"

import "../../scss/widgets/_related-posts.scss"

export default class RelatedPosts extends React.Component {
  render() {
    if (this.props.posts && this.props.posts.length > 0) {
      return (
        <div className="container">
          <div className="related-posts">
            <h2>Potrebbe interessarti anche...</h2>
            <section className="section">
              <div className="columns is-multiline">
                {this.props.posts.map((node) => {
                  return (
                    <div className="column is-one-fourth" key={node.fields.slug}>
                      <article className="article-related">
                        <header>
                          <h4 className="title">
                            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                          </h4>
                        </header>
                      </article>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
