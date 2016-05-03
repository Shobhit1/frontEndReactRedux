import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'

import DropDown from '../../DropDown'
import { removeItemFromCart, checkOutAction } from '../../../redux/actions/shoppingCartActions'
import styles from './styles'

class CartView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: this.calculateInitialPrice(this.props.data.products) || 0
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ price: this.calculateInitialPrice(nextProps.data.products) })
  }
  calculateInitialPrice(data) {
    let totalPrice = 0
    data.map((item) => {
      totalPrice = totalPrice + item.amount
    })
    return totalPrice
  }
  calculatePrice(amount, value) {
    let priceToBeAdded = 0
    priceToBeAdded = amount * (value - 1)
    const temp = this.calculateInitialPrice(this.props.data.products) + priceToBeAdded
    this.setState({ price: temp })
  }
  handleValueChange(row, value) {
    this.calculatePrice(row.amount, value)
  }
  _renderItem(row, index) {
    return (
      <TableRow key={index} style={styles.tableRow}>
        <TableRowColumn style={{ width: '30%', height: '32px', textTransform: 'uppercase' }}>{row._category}</TableRowColumn>
        <TableRowColumn style={{ width: '30%', height: '32px', textTransform: 'uppercase' }}>{row.name}</TableRowColumn>
        <TableRowColumn style={{ width: '10%', height: '32px', textTransform: 'uppercase' }}>{`$ ${row.amount}`}</TableRowColumn>
        <TableRowColumn style={{ width: '10%', height: '32px', textTransform: 'uppercase' }}>
          <DropDown valueChange={(value) => this.handleValueChange(row, value)}/>
        </TableRowColumn>
        <TableRowColumn style={{ width: '5%', height: '32px', textTransform: 'uppercase' }}>
          <IconButton iconClassName="fa fa-trash" onClick={() => {
            this.props.removeItemFromCart(row)
          }}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
  renderPriceDiv() {
    let totalPrice
    return (
      <TableRow style={styles.tableRow} >
        <TableRowColumn style={{ width: '30%', height: '32px', textTransform: 'uppercase' }}>Price</TableRowColumn>
        <TableRowColumn style={{ width: '30%', height: '32px', textTransform: 'uppercase' }}>
          <TextField
            ref={(node) => { totalPrice = node }}
            disabled
            name="TotalPrice"
            hintText={this.state.price}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
  renderCartPage() {
    let username
    let password
    return (
      <Paper style={styles.paper}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            <ToolbarTitle style={styles.toolbarTitle} text="CART" />
          </ToolbarGroup>
        </Toolbar>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '30%' }}><span style={styles.tableHeaderText}>CATEGORY</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '30%' }}><span style={styles.tableHeaderText}>NAME</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}><span style={styles.tableHeaderText}>PRICE</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}><span style={styles.tableHeaderText}>QUANTITY</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%' }}><span style={styles.tableHeaderText}></span></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {this.props.data ? this.props.data.products.map((row, index) => this._renderItem(row, index)) : ''}
          </TableBody>
        </Table>
        <Divider />
        {this.renderPriceDiv()}
        <div style={styles.buttonWrapper}>
          <RaisedButton
            label="PLACE ORDER"
            primary
            disabled={false}
            style={styles.button}
            onClick={() => this.props.onCheckOut(this.props.data.products, this.state.price, this.props.useremail)}
          />
        </div>
      </Paper>
    )
  }
  render() {
    return (
      <div className="grid grid-pad">
        {this.renderCartPage()}
      </div>
    )
  }
}
CartView.propTypes = {
  data: React.PropTypes.object,
  useremail: React.PropTypes.string,
  onCheckOut: React.PropTypes.func,
  removeItemFromCart: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    data: state.shoppingCart,
    useremail: state.login.userData.userData.email
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckOut: (products, price, email) => {
      dispatch(checkOutAction({
        email,
        total_amount: price,
        data: { products }
      }))
    },
    removeItemFromCart: (row) => {
      dispatch(removeItemFromCart(row.name))
    }
  }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(CartView)
export default Login
