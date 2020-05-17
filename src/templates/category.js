import React from "react"
import { graphql } from "gatsby"

import GroupNavigator from "../utils/group-navigator"
import DefaultLayout from "../components/layouts/default-layout"
import Section from "../components/ui/section"
import ArticleGrid from "../components/ui/article/article-grid"


const CategoryTemplate = ({ location, pageContext, data }) => {
  const { name } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <DefaultLayout location={location} title={`Categoria "${name}"`}>
        <Section title="Categoria" subtitle={name}>
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
        <GroupNavigator context={pageContext} />
      </DefaultLayout>
    )
  } else {
    return null
  }
}

export const pageQuery = graphql`
  query CategoryTemplate($name: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { categories: { in: [$name] } } }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            categories
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
            description
            categories
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
