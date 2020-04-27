import React, { Component } from "react"
import { Link } from "gatsby"
import CategoryLink from "../link/category-link"
import DateLink from "../link/date-link"

import "../../../scss/ui/_article-grid.scss"

export default class ArticleGrid extends Component {
  render() {
    const node = this.props.node
    const title = node.frontmatter.title || node.fields.slug
    const image = node.frontmatter.featuredImage
      ? node.frontmatter.featuredImage.childImageSharp.fixed.src
      : null

    return (
      <article className="article-grid">
        {image && (
          <Link to={node.fields.slug}>
            <img
              src={image}
              title={title}
              alt={title}
              className="article-thumb"
            />
          </Link>
        )}
        <header>
          <h3 className="title">
            <Link to={node.fields.slug}>{title}</Link>
          </h3>
          {node.frontmatter.date && (
            <DateLink node={node} />
          )}
          {node.frontmatter.category && (
            <CategoryLink category={node.frontmatter.category} />
          )}
        </header>
        <section dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }} />
        <div className="readmore">
          <Link to={node.fields.slug}>Leggi di più...</Link>
        </div>
      </article>
    )
  }
}
