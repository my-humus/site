import React from "react"
import { graphql } from "gatsby"

import GroupNavigator from "../utils/group-navigator"
import DefaultLayout from "../components/layouts/default-layout"
import Section from "../components/ui/section"
import PageGrid from "../components/ui/article/page-grid"

export default class PagesList extends React.Component {
  render() {
    const { data, pageContext } = this.props

    if (data.allMarkdownRemark.edges.length > 0) {
      return (
        <DefaultLayout
          location={this.props.location}
        >
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
          <GroupNavigator context={pageContext} />
        </DefaultLayout>
      )
    } else {
      return null
    }
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
