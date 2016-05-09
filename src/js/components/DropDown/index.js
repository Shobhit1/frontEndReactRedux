import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class DropDown extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 1 }
  }
  handleChange = (event, index, value) => {
    this.setState({ value })
    this.props.valueChange(value)
  }
  render() {
    return (
      <div>
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>
      </div>
    )
  }
}
DropDown.propTypes = {
  valueChange: React.PropTypes.func
}
export default DropDown
