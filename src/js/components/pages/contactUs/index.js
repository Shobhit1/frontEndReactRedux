import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { submitQuery } from '../../../redux/actions/contactUsActions'
import SnackBar from '../../SnackBar'
import styles from './style'

class ContactUs extends Component {
  renderSnackBar() {
    return (
      <SnackBar message="Query Submitted" open />
    )
  }
  render() {
    let firstName
    let lastName
    let email
    let statement
    return (
      // isQuerySubmitted ?
      // show snackbar
      <div>
        <Paper style={styles.paper}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const queryData = {
                firstName: firstName.getValue(),
                lastName: lastName.getValue(),
                email: email.getValue(),
                statement: statement.getValue(),
              }
              this.props.onSubmit(queryData)
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
                ref={(node) => { statement = node }}
                style={styles.field}
                floatingLabelText="Comment"
                required="true"
                type="text"
                multiLine
              />
          </div>
            <div style={styles.buttonWrapper}>
              <RaisedButton label="Submit" primary type="submit" disabled={false} style={styles.button} />
            </div>
          </form>
        </Paper>
        { this.props.data && this.props.data.isQuerySubmitted ? this.renderSnackBar() : '' }
    </div>
    )
  }
}
ContactUs.propTypes = {
  onSubmit: React.PropTypes.func,
  data: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    data: state.contactUS
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(submitQuery(data))
    }
  }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(ContactUs)
export default Login
