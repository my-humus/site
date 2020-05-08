import React from "react"

import Section from "../components/ui/section"
import IndexLayout from "../components/layouts/index-layout"

import image from "../images/anna-zattoni.jpg"
import about from "../images/about.jpg"

export default class AboutPage extends React.Component {
  render() {
    return (
      <IndexLayout location={this.props.location}>
        <Section title="Chi Sono" subtitle="Anna Zattoni">
          <div className="columns">
            <div className="column is-two-thirds">
              Nel 2003, a pochi mesi dall'esame di maturità, ho riflettuto su una cosa: come si potevano conoscere opere come la Divina Commedia o l'Odissea, l'arte di Dalì o quella di Monet, i grandi classici della letteratura inglese, francese e americana, e non avere la benché minima idea del perché un fiore fosse colorato?<br />
Un bel giorno, mi sono chiesta: "Perché piove?", "Perché alcuni animali migrano?", "Perché ci sono zone in cui la Terra trema?".<br />
Desideravo conoscere e capire gli equilibri ecosistemici per conoscere e capire a fondo la Terra.<br />
Ecco perché ho scelto di laurearmi in Scienze Naturali e in Ecologia Applicata.
</div>
            <div className="column is-one-thirds"><img src={image} alt="Anna Zattoni" title="Anna Zattoni" /></div>
          </div>
          <div className="columns">
            <div className="column is-three-thirds">
              <p>Oggi sono una copywriter appassionata di sostenibilità ambientale che, attraverso MyHumus, racconta il territorio italiano esplorandolo attraverso uno sguardo "green".</p>
            </div>
          </div>
        </Section>
        <Section title="Cos'è MyHumus?">
          <p className="has-text-centered">
            <img src={about} alt="MyHumus" title="MyHumus" />
          </p>
          <p>
            MyHumus non è solo un blog che parla di sostenibilità ambientale: è un viaggio avventuroso tra persone e progetti.<br />
Come l'humus del terreno sprigiona tutta la sua essenzialità alla sopravvivenza dell'ecosistema, le persone che intervisto rappresentano una componente indispensabile del nostro territorio: ci sono, magari stanno compiendo qualcosa di singolare e di importante, eppure sono in pochi a saperlo.
</p>
          <p>MyHumus racconta di passioni e di creatività, d'innovazione e di visioni lungimiranti. Ed è la dimostrazione di quanti cuori pulsanti si celino in Italia, uniti da un sottile filo di colore verde: l'ambiente.</p>
          <p>Nel 2014, MyHumus è stato incluso fra i progetti innovativi di Progetto Manifattura, hub italiano dedicato unicamente alla green innovation.</p>
        </Section>
      </IndexLayout>
    )
  }
}
