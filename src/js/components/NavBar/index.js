import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles'

class NavBarCompView extends Component {
  handleChange = (value) => {
    this.setState({
      value,
    })
  }
  renderNavLinks(data) {
    return (
      <div className="col-1-3" key={data.label} style={styles.link}>
        <a href={data.url}><i className={`fa ${data.iconClass}`} style={styles.link}></i>{data.label}</a>
      </div>
    )
  }
  render() {
    return (
      <div style={styles.root} className="col-1-2">
        {this.props.data ? this.props.data.map((item) => this.renderNavLinks(item)) : ''}
      </div>
    )
  }
}

NavBarCompView.propTypes = {
  data: React.PropTypes.array
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const NavBarComp = connect(mapStateToProps, mapDispatchToProps)(NavBarCompView)
export default NavBarComp
