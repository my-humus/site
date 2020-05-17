import React from "react"
import { graphql } from "gatsby"

import Blog from "../components/sections/blog"
import IndexLayout from "../components/layouts/index-layout"

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <IndexLayout location={this.props.location}>
        <Blog posts={posts} />
      </IndexLayout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 9
      sort: { fields: [frontmatter___date], order: DESC }
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
