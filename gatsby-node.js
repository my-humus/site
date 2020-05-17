const path = require(`path`)
const slugify = require(`slug`)
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

  posts.data.allMarkdownRemark.edges.forEach((post, index) => {
    const next = index === posts.data.allMarkdownRemark.edges.length - 1 ? null : posts.data.allMarkdownRemark.edges[index + 1].node
    const previous = index === 0 ? null : posts.data.allMarkdownRemark.edges[index - 1].node
    const related = []
    let i = posts.data.allMarkdownRemark.edges.length;

    while (i !== 0 && related.length < 5) {
      let node = posts.data.allMarkdownRemark.edges[Math.floor(Math.random() * i)].node;

      if (node.fields.categories === post.node.fields.categories && node.fields.slug !== post.node.fields.slug) {
        let duplicate = false

        related.forEach((r) => {
          if (r.fields.slug === node.fields.slug) {
            duplicate = true
          }
        })

        if (duplicate) {
          continue
        }

        related.push(node)
      }

      i -= 1;
    }

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        related: related
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
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
