import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const OpenGraph = ({ url, title, article, description, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            locale {
              language
              culture
            }
            social {
              facebook {
                page
                app
              }
            }
          }
        }
      }
    `
  )

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      {article ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta
        property="og:locale"
        content={[
          site.siteMetadata.locale.language.toLowerCase(),
          site.siteMetadata.locale.culture.toUpperCase()
        ].join("_")}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {site.siteMetadata.social.facebook.app ? (
        <meta property="fb:app_id" content={site.siteMetadata.social.facebook.app} />
      ) : null}
      {article && site.siteMetadata.social.facebook.page ? (
        <meta
          property="article:publisher"
          content={"https://www.facebook.com/" + site.siteMetadata.social.facebook.page}
        />
      ) : null}
    </Helmet>
  )
}

OpenGraph.propTypes = {
  url: PropTypes.string,
  article: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

OpenGraph.defaultProps = {
  url: null,
  article: false,
  image: null,
  title: null,
  description: null
}

export default OpenGraph
