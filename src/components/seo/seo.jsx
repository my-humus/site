import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import SchemaOrg from "./schema-org"

const SEO = ({ postData, frontmatter = {}, image, isBlogPost, title, path = '' }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            locale {
              language
              culture
            }
            author
            organization {
              company
              url
              logo
            }
            seo {
              image
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
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const siteUrl = seo.siteUrl.replace(/\/$/, "")
      const postMeta = frontmatter || postData.frontmatter || {}
      const postTitle = title ? title : (postMeta.title ? postMeta.title : seo.title)
      const description = postMeta.description || seo.description
      const postImage = image ? `${siteUrl}/${image.replace(/^\//, "")}` : `${siteUrl}/${seo.seo.image.replace(/^\//, "")}`
      const url = `${siteUrl}${path}`
      const datePublished = isBlogPost ? postMeta.datePublished : false

      return (
        <React.Fragment>
          <Helmet
            htmlAttributes={{
              lang: seo.locale.language
            }}
            title={postTitle}
            titleTemplate={title ? `%s | ${seo.title}` : seo.title}
          >
            <meta name="description" content={description} />
            <meta name="image" content={postImage} />
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={postTitle} />
            <meta property="og:locale" content={([seo.locale.language.toLowerCase(), seo.locale.culture.toUpperCase()]).join('_')} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={postImage} />
            {seo.social.facebook.app ? <meta property="fb:app_id" content={seo.social.facebook.app} /> : null}
            {isBlogPost && seo.social.facebook.page ? <meta property="article:publisher" content={"https://www.facebook.com/" + seo.social.facebook.page} /> : null}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={postTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={postImage} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={postTitle}
            image={postImage}
            description={description}
            datePublished={datePublished}
            siteUrl={seo.siteUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  image: PropTypes.string,
  title: PropTypes.string
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  image: null,
  title: null
};

export default SEO;