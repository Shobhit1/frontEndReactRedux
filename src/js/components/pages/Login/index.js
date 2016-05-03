import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { authenticate, createUser, toggleRegistrationMode } from '../../../redux/actions/loginActions'
import { AUTHENTICATE } from '../../../redux/constants/actions'

import SnackBar from '../../SnackBar'
import styles from './style'

class LoginView extends Component {
  renderSnackBar(message) {
    return (
      <SnackBar message={`${message}`} open />
    )
  }
  renderRegistrationMode() {
    let firstName
    let lastName
    let email
    let password
    return (
      <Paper style={styles.paper}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            this.props.onSubmitRegistration(
              firstName.getValue(),
              lastName.getValue(),
              email.getValue(),
              password.getValue()
            )
          }}
        >
          <div>
            <TextField
              ref={(node) => { firstName = node }}
              style={styles.field}
              floatingLabelText="First Name"
              required="true"
              type="text"
            />
          </div>
          <div>
            <TextField
              ref={(node) => { lastName = node }}
              style={styles.field}
              floatingLabelText="Last Name"
              required="true"
              type="text"
            />
          </div>
          <div>
            <TextField
              ref={(node) => { email = node }}
              style={styles.field}
              floatingLabelText="Email"
              required="true"
              type="email"
            />
          </div>
          <div>
            <TextField
              ref={(node) => { password = node }}
              style={styles.field}
              floatingLabelText="Password"
              required="true"
              type="password"
            />
          </div>
          <div className="col-1-2">
            <RaisedButton label="Create User" primary type="submit" disabled={false} style={styles.button} />
          </div>
          <div style={styles.buttonWrapper}>
            <RaisedButton label="Login" primary disabled={false} style={styles.button} onClick={() => this.props.changeMode(false)} />
          </div>
        </form>

      </Paper>
    )
  }
  renderLoginForm() {
    let username
    let password
    return (
      <Paper style={styles.paper}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            this.props.onSubmit(username.getValue(), password.getValue())
          }}
        >
          <div>
            <TextField
              ref={(node) => { username = node }}
              style={styles.field}
              floatingLabelText="Email"
              required="true"
              type="email"
            />
          </div>
          <div>
            <TextField
              ref={(node) => { password = node }}
              style={styles.field}
              floatingLabelText="Password"
              required="true"
              type="password"
            />
          </div>
          <div className="col-1-2">
            <RaisedButton label="Register" secondary disabled={false} style={styles.button} onClick={() => this.props.changeMode(true)}/>
          </div>
          <div style={styles.buttonWrapper}>
            <RaisedButton label="Login" primary type="submit" disabled={false} style={styles.button} />
          </div>
        </form>
      </Paper>
    )
  }
  render() {
    return (
      <div className="grid grid-pad">
        {this.props.data.registrationMode ? this.renderRegistrationMode() : this.renderLoginForm()}
        { this.props.data.registrationFailed ? this.renderSnackBar('Registration Failed') : '' }
        { this.props.attemptFailed ? this.renderSnackBar('Wrong Credentials') : '' }
      </div>
    )
  }
}
LoginView.propTypes = {
  onSubmit: React.PropTypes.func,
  onSubmitRegistration: React.PropTypes.func,
  changeMode: React.PropTypes.func,
  data: React.PropTypes.object,
  attemptFailed: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    attemptFailed: state.login.attemptFailed,
    data: state.login
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password) => {
      dispatch(authenticate({
        email: username,
        password
      }))
    },
    onSubmitRegistration: (firstName, lastName, email, password) => {
      dispatch(createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        admin: false,
        password
      }))
    },
    changeMode: (mode) => {
      dispatch(toggleRegistrationMode(mode))
    }
  }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginView)
export default Login
