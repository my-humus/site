import React from "react"
import { graphql } from "gatsby"

import GroupNavigator from "../utils/group-navigator"
import DefaultLayout from "../components/layouts/default-layout"
import Hero from "../components/ui/hero"
import Article from "../components/ui/article/article-grid"

const TagTemplate = ({ location, pageContext, data }) => {
  const { name } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <DefaultLayout location={location} title={`Tag "${name}"`}>
        <Hero title="Tag" subtitle={name} />
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                  <div className="column is-one-third" key={node.fields.slug}>
                    <Article node={node} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <GroupNavigator context={pageContext} />
      </DefaultLayout>
    )
  } else {
    return null
  }
}

export const pageQuery = graphql`
  query TagTemplate($name: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { tags: { in: [$name] } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            tags
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
            description
            featuredImage {
              childImageSharp {
                fixed(width: 320, height: 220, quality: 60) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            categories
            tags
          }
        }
      }
    }
  }
`

export default TagTemplate
