import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "../components/layouts/default-layout"
import Section from "../components/ui/section"
import ArticleGrid from "../components/ui/article/article-grid"

import { navigator } from "../utils/paginator"

export default class BlogList extends React.Component {
  render() {
    const { data, pageContext } = this.props

    return (
      <DefaultLayout location={this.props.location} title="Blog">
        <Section title="Blog" subtitle="Il Blog di MyHumus">
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className="column is-one-third" key={node.fields.slug}>
                  <ArticleGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
        {navigator(pageContext)}
      </DefaultLayout>
    )
  }
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: "^/blog/" } } }
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
