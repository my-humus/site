import React, { Component } from "react"
import { Link } from "gatsby"

export default class PageGrid extends Component {
  render() {
    const node = this.props.node
    const title = node.frontmatter.title || node.fields.slug

    return (
      <article className="page-grid">
        <header className="page-grid-header">
          <h4 className="title">
            <Link to={`${node.fields.slug}`}>{title}</Link>
          </h4>
        </header>
        <section>
          <Link
            to={`${node.fields.slug}`}
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt
            }}
          />
        </section>
        <div className="readmore">
          <Link to={`${node.fields.slug}`}>Leggi di più...</Link>
        </div>
      </article>
    )
  }
}
