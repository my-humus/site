import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Header from "../components/ui/header"
import Section from "../components/ui/section"
import PageGrid from "../components/ui/article/page-grid"
import { navigator } from "../utils/paginator"

import pages from "../data/pages.json"

export default class PagesList extends React.Component {
  render() {
    const { data, pageContext } = this.props

    return (
      <Layout location={this.props.location} title={pages[pageContext.slug].title}>
        <Header title={pages[pageContext.slug].title} subtitle={pages[pageContext.slug].description} />
        <Section>
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className="column is-half" key={node.fields.slug}>
                  <PageGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
        {navigator(pageContext)}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query pagesListQuery($skip: Int!, $limit: Int!, $regex: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: $regex } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            description
          }
        }
      }
    }
  }
`
