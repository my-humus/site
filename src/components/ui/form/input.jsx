import React, { Component } from "react"

export default class Input extends Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control">
          <input className="input" type={this.props.type} name={this.props.name || 'text'} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />
        </div>
      </div>
    )
  }
}
