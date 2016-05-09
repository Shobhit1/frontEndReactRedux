import React, { Component } from 'react'

import styles from './styles'

class NavBarComp extends Component {
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

NavBarComp.propTypes = {
  data: React.PropTypes.array
}

export default NavBarComp
