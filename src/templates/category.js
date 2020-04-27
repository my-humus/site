import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "../components/layouts/default-layout"
import Section from "../components/ui/section"
import Article from "../components/ui/article/article-grid"

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { category } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <DefaultLayout location={location} title={`Categoria "${category}"`}>
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
      </DefaultLayout>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
              childImageSharp {
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

export default CategoryTemplate
