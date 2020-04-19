import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Section from "../components/ui/section"
import Article from "../components/ui/article/article-grid"

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { category } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <Layout location={location} title={`Categoria "${category}"`}>
        <Section title="Categoria" subtitle={category}>
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
  query CategoryTemplate($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { category: { eq: $category } } }
    ) {
      group(field: frontmatter___category) {
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
                sizes(maxWidth: 1280) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate
