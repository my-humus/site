import React from "react"
import { graphql } from "gatsby"
import slugify from "slug"

import DefaultLayout from "../components/layouts/default-layout"
import Hero from "../components/ui/hero"
import Article from "../components/ui/article/article-grid"

const CategoryTemplate = ({ location, pageContext, data }) => {
  if (data.allMarkdownRemark.edges.length > 0) {
    let category = '';

    data.allMarkdownRemark.edges[0].node.frontmatter.category.map((value) => {
      if (slugify(value, { lower: true }) === pageContext.category) {
        category = value
      }

      return null
    })

    return (
      <DefaultLayout location={location} title={`Categoria "${category}"`}>
        <Hero title="Categoria" subtitle={category} />
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
            category
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
