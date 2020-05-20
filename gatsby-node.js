const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const posts = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
          filter: {
            fields: {
              slug: {
                regex: "/^\/(blog)\//s"
              }
            }
          }
        ) {
          edges {
            node {
              fields {
                slug
                tags
                categories
              }
              frontmatter {
                title
                tags
                categories
              }
            }
          }
        }
      }
    `
  )

  if (posts.errors) {
    throw posts.errors
  }

  const remarks = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
          filter: {
            fields: {
              slug: {
                regex: "/^\/(?!blog).+\//s"
              }
            }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (remarks.errors) {
    throw remarks.errors
  }

  const postsPerPage = 15
  const numPages = Math.ceil(posts.data.allMarkdownRemark.edges.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pages: numPages,
        current: i + 1,
        slug: "blog"
      }
    })
  })

  const pages = []

  remarks.data.allMarkdownRemark.edges.forEach((edge) => {
    let match = edge.node.fields.slug.match(/^\/([\w-]+)\/(?:)/i)

    if (match !== null && match.length > 1) {
      match = match[1]

      if (!(match in pages)) {
        pages[match] = []
      }

      pages[match].push(edge)
    }
  })

  Object.keys(pages).forEach(slug => {
    let contents = pages[slug]
    let total = Math.ceil(contents.length / postsPerPage)

    Array.from({ length: total }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${slug}` : `/${slug}/${i + 1}`,
        component: path.resolve("./src/templates/pages-list-template.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          pages: total,
          current: i + 1,
          slug: slug,
          regex: "^/(" + slug + ")/"
        }
      })
    })

    contents.forEach(page => {
      createPage({
        path: page.node.fields.slug,
        component: path.resolve(`./src/templates/pages-post.js`),
        context: {
          slug: page.node.fields.slug
        }
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-javascript") {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === "MiniCssExtractPlugin"
    )

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }

    actions.replaceWebpackConfig(config)
  }
}
