import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import TextField from '../../TextField'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import styles from './styles'
import ProductList from './productList'

class UserInformationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
  }
  handleEditMode() {
    this.setState({ editMode: true })
  }
  handleSaveMode() {
    this.setState({ editMode: false })
  }
  renderOtherInfo() {
    return (
    <Paper style={styles.paper} className="col-1-1">
      <Subheader> User Login Information </Subheader>
      <div className="col-1-3">
          <TextField
            floatingLabelText="Last Data of Valid Login"
            type="text"
            fullWidth
            disabled
            value={(moment(this.props.data.lastLogin).format('MM/DD/YYYY'))}
          />
        </div>
        <div className="col-1-3">
          <TextField
            floatingLabelText="Last Time of Valid Login"
            type="text"
            fullWidth
            disabled
            value={(moment(this.props.data.lastLogin).format('hh:mm:ss a'))}
          />
        </div>
        <div className="col-1-3">
          <TextField
            floatingLabelText="Number of failed Logins"
            type="text"
            fullWidth
            disabled
            value={this.props.data.failedLoginAttempt.toString()}
          />
        </div>
      </Paper>
    )
  }
  renderEdit() {
    let firstName
    let lastName
    let email
    let password
    return (
      <Paper className="col-1-1" style={styles.paper}>
        <Toolbar style={styles.toolbar} className="col-1-1">
          <ToolbarGroup>
            <ToolbarTitle text="User Information" style={styles.toolbarTitle} />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton
              iconStyle={{ color: 'white' }}
              iconClassName="material-icons"
              tooltip="Edit"
              className={ this.state.editMode ? 'hidden' : '' }
              onClick={this.handleEditMode.bind(this)}
            >
              mode_edit
            </IconButton>
            <IconButton
              iconStyle={{ color: 'white' }}
              iconClassName="material-icons"
              tooltip="Save"
              className={ this.state.editMode ? '' : 'hidden' }
              onClick={this.handleSaveMode.bind(this)}
            >
              save
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <section className="col-1-1">
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div className="col-1-2" style={styles.subContainer}>
              <TextField
                ref={(node) => { firstName = node }}
                label="First Name"
                type="text"
                disabled={!this.state.editMode}
                fullWidth
                value={this.props.data.first_name}
              />
            </div>
            <div className="col-1-2" style={styles.subContainer}>
              <TextField
                ref={(node) => { lastName = node }}
                label="Last Name"
                type="text"
                disabled={!this.state.editMode}
                fullWidth
                value={this.props.data.last_name}
              />
            </div>
            <div className="col-1-2" style={styles.subContainer}>
              <TextField
                ref={(node) => { email = node }}
                label="Email"
                type="email"
                disabled={!this.state.editMode}
                fullWidth
                value={this.props.data.email}
              />
            </div>
            <div className="col-1-2" style={styles.subContainer}>
              <TextField
                ref={(node) => { password = node }}
                label="Password"
                type="Password"
                disabled={!this.state.editMode}
                fullWidth
                value={this.props.data.password}
              />
            </div>
          </form>
        </section>
        <section className="col-1-1">
          {this.renderOtherInfo()}
        </section>
        <section className="col-1-1" styles={styles.container}>
          <ProductList data={this.props.reviewData} addReview={() => this.renderReview()}/>
        </section>
      </Paper>
    )
  }
  render() {
    return (
      <div className="grid grid-pad">
        {this.renderEdit()}
      </div>
    )
  }
}
UserInformationView.propTypes = {
  data: React.PropTypes.object,
  reviewData: React.PropTypes.array,
  productList: React.PropTypes.array,
  onSubmitEdit: React.PropTypes.func,
  submitReview: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    data: state.login.userData.userData,
    productList: state.login.userData.userData.data.productsPurchased,
    reviewData: state.login.reviewData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitEdit: () => {

    },
  }
}
const UserInformation = connect(mapStateToProps, mapDispatchToProps)(UserInformationView)
export default UserInformation
