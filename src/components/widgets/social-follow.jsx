import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../../scss/widgets/_social-follow.scss"

const SocialFollow = () => {
  const { site } = useStaticQuery(
    graphql`
        query {
          site {
            siteMetadata {
              social {
                github {
                  username
                }
                facebook {
                  page
                }
                instagram {
                  username
                }
              }
            }
          }
        }
      `
  )
  const social = site.siteMetadata.social

  return (
    <ul className="social-follow">
      {social.github.username && (
        <li>
          <a href={"https://www.facebook.com/" + social.facebook.page + "/"} title="Facebook"><i className="icon-myhumus-facebook"></i></a>
        </li>
      )}
      {social.instagram.username && (
        <li>
          <a href={"https://www.instagram.com/" + social.instagram.username + "/"} title="Instagram"><i className="icon-myhumus-instagram"></i></a>
        </li>
      )}
      {social.github.username && (
        <li>
          <a href={"https://github.com/" + social.github.username} title="GitHub"><i className="icon-myhumus-github"></i></a>
        </li>
      )}
    </ul>
  )
}

export default SocialFollow
