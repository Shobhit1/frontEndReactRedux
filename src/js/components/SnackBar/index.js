import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

class SnackBarComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
    }
  }
  handleTouchTap = () => {
    this.setState({
      open: true,
    })
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.props.message}
          autoHideDuration={2500}
        />
      </div>
    )
  }
}

SnackBarComp.propTypes = {
  message: React.PropTypes.string,
  open: React.PropTypes.bool
}

export default SnackBarComp
