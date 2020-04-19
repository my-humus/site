import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/default"
import Section from "../components/ui/section"
import Article from "../components/ui/article/article-grid"

const TagTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <Layout location={location} title={`Tag "${tag}"`}>
        <Section title="Tag" subtitle={tag}>
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className="column is-one-third" key={node.fields.slug}>
                  <Article node={node} />
                </div>
              )
            })}
          </div>
        </Section>
      </Layout>
    )
  } else {
    return null
  }
}

export const pageQuery = graphql`
  query TagTemplate($tag: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { fields: { tags: { in: [$tag] } } }
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
              childImageSharp{
                fixed(width: 320, height: 220, quality: 60) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default TagTemplate
