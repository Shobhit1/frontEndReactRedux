import React, { Component } from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'

import AppBar from 'material-ui/AppBar'
import UserMenu from './UserMenu'
import Badge from './BadgeComponent'
import ActionHome from 'material-ui/svg-icons/action/home'
import NavBar from './NavBar'
const lightMuiTheme = getMuiTheme(lightBaseTheme)

class App extends Component {
  render() {
    const styles = {
      toolbar: {
        padding: '10px 10px 10px 0px',
        zIndex: '1301',
        height: '68px',
        margin: '0px'
      },
      largeIcon: {
        width: '45px',
        height: '45px',
        marginLeft: '20px'
      },
    }
    const menus = [
      {
        label: 'Search',
        url: '/search',
        iconClass: 'fa-search',
        bgColor: '#8C8520'
      }, {
        label: 'Contact Us',
        url: '/contactUs',
        iconClass: 'fa-comments-o',
        bgColor: '#4776E6'
      }, {
        label: 'Login',
        url: '/login',
        iconClass: 'fa-sign-in',
        bgColor: '#26A65B'
      }]
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          <header>
            <AppBar style={styles.toolbar} showMenuIconButton={false} titleStyle={{ flex: 'none' }}>
              <a href="/">
                <ActionHome style={styles.largeIcon} />
              </a>
              <NavBar data={menus}/>
              <Badge />
              <UserMenu />
            </AppBar>
          </header>
          <section>
            {this.props.children}
          </section>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object])
}

export default App
