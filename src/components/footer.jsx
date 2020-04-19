import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import PrivacyLink from "./ui/link/privacy-link"

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
        query {
          site {
            siteMetadata {
              organization {
                company
                address
                zipCode
                city
                province
                country
                email
                taxId
                vatId
                registryId
              }
              social {
                github {
                  username
                }
                facebook {
                  page
                }
              }
              appearance {
                accent
                background
                theme
              }
            }
          }
        }
      `
  )
  const owner = site.siteMetadata.organization
  const appearance = site.siteMetadata.appearance
  const social = site.siteMetadata.social
  const legal = site.siteMetadata.legal

  let tax = null
  let email = null

  if (owner.taxId === owner.vatId) {
    tax = (<div><span>Codice Fiscale / Partita IVA</span> {owner.vatId}</div>)
  } else {
    tax = (
      <>
        <div><span>Codice Fiscale</span> {owner.taxId}</div>
        <div><span>Partita IVA</span> {owner.vatId}</div>
      </>
    )
  }

  if (owner.email) {
    email = (<div><span>E-Mail</span> <a href={"mailto:" + owner.email}>{owner.email}</a></div>)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifths">
            <i className="icon-myhumus-logo"></i>
          </div>
          <div className="column is-two-fifths">
            <h3>{owner.company}</h3>
              {owner.address}<br />
              {owner.zipCode} {owner.city} ({owner.province})<br />
              {owner.country}<br />
            {tax}
            {owner.registryId && (
              <div>REA {owner.registryId}</div>
            )}
            {email}
          </div>
          <div className="column is-one-fifths">
            <h2>Seguici</h2>
            <ul className="social-follow">
              <li>
                <a href={"https://github.com/" + social.github.username} title="GitHub"><i className="icon-myhumus-github"></i></a>
              </li>
              <li>
                <a href={"https://www.facebook.com/" + social.facebook.page + "/"} title="Facebook"><i className="icon-myhumus-facebook"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="columns">
          <div className="column is-five-fifths">
            © {new Date().getFullYear()}, {owner.company}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
