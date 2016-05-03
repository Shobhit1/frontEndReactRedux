import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

import styles from './Styles'

class TextFieldComp extends Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value || '' }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value')) {
      this.setState({ value: nextProps.value || '' })
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  render() {
    return (
      <TextField
        hintText={this.props.disabled ? '' : this.props.label}
        className={this.props.className}
        style={Object.assign({}, styles.root, this.props.style)}
        disabled={this.props.disabled}
        name={this.props.name}
        floatingLabelText={this.props.label || this.props.floatingLabelText}
        floatingLabelStyle={styles.floatingLabel}
        inputStyle={styles.input}
        required={this.props.required}
        maxLength={this.props.maxLength}
        value={this.state.value}
        onChange={(event) => this.handleChange(event)}
        floatingLabelFixed={this.props.disabled}
        multiLine={this.props.multiLine || false}
        type={this.props.type || 'text' }
      />
      )
  }
}
TextFieldComp.propTypes = {
  name: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  required: React.PropTypes.bool,
  maxLength: React.PropTypes.number,
  multiLine: React.PropTypes.bool,
  floatingLabelText: React.PropTypes.string,
  type: React.PropTypes.string
}
export default TextFieldComp
