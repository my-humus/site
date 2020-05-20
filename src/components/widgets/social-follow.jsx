import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../../scss/widgets/_social-follow.scss"

const SocialFollow = () => {
  const { siteBuildMetadata } = useStaticQuery(
    graphql`
      query {
        siteBuildMetadata {
          fields {
            seo {
              socials {
                instagram {
                  username
                }
                github {
                  username
                }
                facebook {
                  page
                  app
                }
                twitter {
                  username
                  site
                }
              }
            }
          }
        }
      }
    `
  )
  const socials = siteBuildMetadata.fields.seo.socials

  return (
    <ul className="social-follow">
      {socials.github.username && (
        <li>
          <a href={`https://www.facebook.com/${socials.facebook.page}/`} title="Facebook">
            <i className="icon-myhumus-facebook"></i>
          </a>
        </li>
      )}
      {socials.instagram.username && (
        <li>
          <a href={`https://www.instagram.com/${socials.instagram.username}/`} title="Instagram">
            <i className="icon-myhumus-instagram"></i>
          </a>
        </li>
      )}
      {socials.github.username && (
        <li>
          <a href={`https://github.com/${socials.github.username}`} title="GitHub" >
            <i className="icon-myhumus-github"></i>
          </a>
        </li>
      )}
      {socials.twitter.username && (
        <li>
          <a href={`https://twitter.com/${socials.twitter.username}`} title="Twitter">
            <i className="icon-myhumus-twitter"></i>
          </a>
        </li>
      )}
    </ul>
  )
}

export default SocialFollow
