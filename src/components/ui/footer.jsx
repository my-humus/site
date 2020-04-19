import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import SocialFollow from "../widgets/social-follow"
import PrivacyLink from "../ui/link/privacy-link"

import "../../scss/ui/_footer.scss"

import separator from "../../images/footer.svg";

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
        query {
          site {
            siteMetadata {
              organization {
                company
              }
            }
          }
        }
      `
  )
  const owner = site.siteMetadata.organization
  const social = site.siteMetadata.social

  return (
    <>
      <div className="footer-separator">
        <img src={separator} />
      </div>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-five-fifths">
              <div className="footer-logo">
                <i className="icon-myhumus-logo"></i>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-fifths">
              © {new Date().getFullYear()}, {owner.company}
            </div>
            <div className="column is-three-fifths">
              <SocialFollow />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
