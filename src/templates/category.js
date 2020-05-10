import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "../components/layouts/default-layout"
import Section from "../components/ui/section"
import ArticleGrid from "../components/ui/article/article-grid"

import { navigator } from "../utils/paginator"

const CategoryTemplate = ({ location, pageContext, data }) => {
  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <DefaultLayout location={location} title={`Categoria "${pageContext.category}"`}>
        <Section title="Categoria" subtitle={pageContext.category}>
          <div className="container">
            <div className="columns is-multiline">
              {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                  <div className="column is-one-third" key={node.fields.slug}>
                    <ArticleGrid node={node} />
                  </div>
                )
              })}
            </div>
          </div>
        </Section>
        {navigator(pageContext, "category")}
      </DefaultLayout>
    )
  } else {
    return null
  }
}

export const pageQuery = graphql`
  query CategoryTemplate($slug: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { fields: { category: { eq: $slug } } }
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
