import React from "react"
import { graphql } from "gatsby"
import DefaultLayout from "../components/layouts/default-layout"
import Hero from "../components/ui/hero"
import Article from "../components/ui/article/article-grid"
import slugify from "slug"

const TagTemplate = ({ location, pageContext, data }) => {
  if (data.allMarkdownRemark.edges.length > 0) {
    let tag = '';

    data.allMarkdownRemark.edges[0].node.frontmatter.tags.map((value) => {
      if (slugify(value, { lower: true }) === pageContext.tag) {
        tag = value
      }

      return null
    })

    return (
      <DefaultLayout location={location} title={`Tag "${tag}"`}>
        <Hero title="Tag" subtitle={tag} />
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
  query TagTemplate($tag: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { fields: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            category
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
            category
            tags
          }
        }
      }
    }
  }
`

export default TagTemplate
