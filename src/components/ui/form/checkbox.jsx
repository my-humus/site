import React, { Component } from "react"

export default class CheckBox extends Component {
  render() {
    return (
      <label className="checkbox">
        <input type="checkbox" onChange={this.props.onChange} name={this.props.name} value={this.props.value || 1} />
        {this.props.children}
      </label>
    )
  }
}
