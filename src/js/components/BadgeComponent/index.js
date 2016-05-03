import React, { Component } from 'react'
import { connect } from 'react-redux'

import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import IconMenu from 'material-ui/IconMenu'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import getAccessToken from '../../../utils/cookies'
import styles from './styles'
import { clearCart, viewCartAction } from '../../redux/actions/shoppingCartActions'

class BadgeComponentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      badgeContent: this.props.shoppingCartValue
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ badgeContent: nextProps.shoppingCartValue })
  }
  renderIconButtonElement() {
    return (
      <Badge
        badgeContent={this.state.badgeContent}
        primary
        badgeStyle={styles.badgeStyle}
      >
        <IconButton iconStyle={styles.iconButton} iconClassName="fa fa-shopping-cart" />
      </Badge>
    )
  }
  renderBadge() {
    return (
      <IconMenu
        iconButtonElement={ this.renderIconButtonElement() }
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem style={styles.menuItem} onClick={() => { this.props.viewCart() }}>VIEW CART</MenuItem>
        <Divider />
        <MenuItem style={styles.clearCart} onClick={() => { this.props.clearCart() }}>CLEAR CART</MenuItem>
      </IconMenu>
    )
  }
  render() {
    return (
      <div style={styles.root}>
        { getAccessToken() && (this.props.userData && this.props.isAuthenticated && this.props.userData.first_name) ? this.renderBadge() : '' }
      </div>
    )
  }
}

BadgeComponentView.defaultProps = {
  shoppingCartValue: 0
}

BadgeComponentView.propTypes = {
  shoppingCartValue: React.PropTypes.number,
  userData: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool,
  clearCart: React.PropTypes.func,
  viewCart: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    shoppingCartValue: state.shoppingCart.numberOfItems,
    isAuthenticated: state.login.isAuthenticated,
    userData: state.login.userData.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch(clearCart())
    },
    viewCart: () => {
      dispatch(viewCartAction())
    }
  }
}
const BadgeComponent = connect(mapStateToProps, mapDispatchToProps)(BadgeComponentView)

export default BadgeComponent
