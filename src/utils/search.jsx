import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import "../scss/ui/_search.scss"

export default class Search extends Component {
  state = {
    query: '',
    results: [],
    active: false
  }

  handleClose = e => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ active: false })
  }

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => (
          <div className="item-search" key={i}>
            <h4>
              <Link to={page.url}>{page.title}</Link>
            </h4>
            <Link to={page.url} className="search-description">{page.description}</Link>
          </div>
        ))
      } else if (this.state.query.length > 2) {
        return `Nessun risultato per "${this.state.query}"`
      } else if (
        this.state.results.length === 0 &&
        this.state.query.length > 0
      ) {
        return 'Inserisci almeno 3 caratteri'
      } else {
        return ''
      }
    }

    return (
      <div className={this.props.className}>
        <div className={classNames({ control: true, "search-control": true, "has-icons-right": true, "is-active": this.state.active })}>
          <input
            className={classNames({ input: true, "search-input": true })}
            type="text"
            onChange={this.search}
            placeholder="Ricerca"
          />
          <span className="icon is-small is-right">
            <i className="icon-myhumus-search"></i>
          </span>
        </div>
        <div className="search-results">
          <div className={classNames({ modal: true, "is-active": this.state.active })}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <ResultList />
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.handleClose}></button>
          </div>
        </div>
      </div>
    )
  }

  getSearchResults(query) {
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store

    if (!query || !index) {
      this.setState({ active: false })

      return []
    } else {
      var results = []
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query))
      })

      results = Array.from(new Set(results))

      var nodes = store
        .filter(node => (results.includes(node.id) ? node : null))
        .map(node => node.node)

      this.setState({ active: true })

      return nodes
    }
  }

  search = event => {
    const query = event.target.value
    if (this.state.query.length > 2) {
      const results = this.getSearchResults(query)
      this.setState({ results: results, query: query })
    } else {
      this.setState({ results: [], query: query })
    }
  }
}
