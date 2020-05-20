const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postsPerPage = 15
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
        component: path.resolve(`./src/templates/page/${slug}-list.jsx`),
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
        component: path.resolve(`./src/templates/page/${slug}-post.jsx`),
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
