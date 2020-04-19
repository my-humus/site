import React, { Component } from "react"
import classNames from "classnames"

export default class Button extends Component {
  handleClick = e => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onClick()
  }

  render() {
    const classes = classNames({
      button: true,
      "is-primary": true,
      "is-loading": this.props.loading
    })

    return (
      <div className={classNames(["field", "is-grouped", "is-grouped-right"])}>
        <div className="control">
          <button onClick={this.handleClick} className={classes}>{this.props.label}</button>
        </div>
      </div>
    )
  }
}
