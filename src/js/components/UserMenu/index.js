import React, { Component } from 'react'
import { connect } from 'react-redux'
import getAccessToken from '../../../utils/cookies'

import styles from './style'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'


import { logoutActionCreater } from '../../redux/actions/loginActions'
import { snackBarAction } from '../../redux/actions/productsActions'
import { goToPage } from '../../redux/actions/routingActions'

class UserMenuView extends Component {
  renderProfileMenu() {
    const name = this.props.userData.first_name.toUpperCase()
    const lastName = this.props.userData.last_name.toUpperCase()
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={styles.iconButton}>
            <Avatar backgroundColor="white" color="black">{name.charAt(0).toUpperCase()}</Avatar>
          </IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        style={styles.iconMenu}
      >
        <MenuItem disabled>{`${name} ${lastName}`}</MenuItem>
        <Divider />
        <MenuItem style={styles.userFullName} onClick={() => { this.props.showUserInfo() }}>Account Information</MenuItem>
        <Divider />
        <MenuItem style={styles.logout} onClick={() => { this.props.logout() }}>Logout</MenuItem>
      </IconMenu>
    )
  }
  render() {
    return (
      <div style={styles.root}>
        {getAccessToken() && (this.props.userData && this.props.isAuthenticated && this.props.userData.first_name) ? this.renderProfileMenu() : ''}
      </div>
    )
  }
}
UserMenuView.propTypes = {
  userData: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool,
  logout: React.PropTypes.func,
  showUserInfo: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    userData: state.login.userData.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutActionCreater())
      dispatch(snackBarAction(true))
    },
    showUserInfo: () => {
      dispatch(goToPage('/user'))
    }
  }
}
const UserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenuView)
export default UserMenu
