import React from "react"

import Hero from "../components/ui/hero"
import IndexLayout from "../components/layouts/index-layout"

import image from "../images/anna-zattoni.jpg"

export default class AboutPage extends React.Component {
  render() {
    return (
      <IndexLayout location={this.props.location}>
        <Hero title="Chi Sono" subtitle="Anna Zattoni" />
        <section className="section">
          <div className="container">
            <img src={image} alt="Anna Zattoni" title="Anna Zattoni" />
          </div>
        </section>
        <section className="section">
          <div className="container">
            Nella vita di ciascuno di noi, prima o poi, giunge il momento di fare alcune considerazioni.<br />
            <br />
            Io, con le mie, ho dovuto fare i conti alle soglie dell'esame di maturità: conoscevo la Divina Commedia, l'Iliade e l'Odissea.<br />
            <br />
            E ancora: l'arte di Dalì e quella di Monet, le poesie di Machado e l'opera del Cervantes, i capolavori di Flaubert, Zola, Sartre e T.S Eliot... eppure non avevo la benché minima idea del perché un fiore fosse colorato.<br />
            <br />
            Mi ponevo domande del tipo: "<em>Perché piove?</em>", "<em>Perché alcuni animali migrano?</em>", "<em>Perché in certe zone del mondo la Terra trema più che in altre?</em>" e l'intramontabile "<em>È nato prima l'uovo o la gallina?</em>".<br />
            <br />
            Già... prima l'uovo o la gallina?!<br />
            <br />
            Ciò che desideravo, sostanzialmente, era conoscere e capire il nostro pianeta.<br />
            <br />
            E così, dopo il conseguimento del diploma di Liceo Classico Linguistico a Ravenna, ho deciso di iscrivermi al corso di laurea triennale in Scienze Naturali presso l'Università degli Studi di Ferrara.<br />
            <br />
            Subito dopo è stata la volta della laurea specialistica in <strong>Ecologia Applicata</strong>.<br />
            <br />
            Ora sono una copywriter appassionata di sostenibilità ambientale.<br />
            <br />
            Su MyHumus racconto il territorio italiano esplorandolo attraverso uno sguardo "green", riportando all'interno del blog una serie di interviste a persone che, in un modo o nell'altro, sono correlate con l'ambiente e con uno stile di vita <em>ecofriendly</em>.<br />
            <br />
            ... Ah, e comunque è nato prima l'uovo!
          </div>
        </section>
      </IndexLayout>
    )
  }
}
