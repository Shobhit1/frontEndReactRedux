import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import styles from './styles'
import { addReview } from '../../../redux/actions/loginActions'

class ProductListForUser extends Component {
  state = {
    modalOpen: false,
    name: ''
  }
  handleModalOpen = (openFlag, row) => {
    this.setState({ modalOpen: openFlag, name: row.name.toString() })
  }
  handleModalClose = () => {
    this.setState({ modalOpen: false })
  }
  _renderItem(row, index) {
    return (
      <TableRow key={index} style={styles.tableRow}>
        <TableRowColumn style={{ width: '25%', height: '32px', textTransform: 'uppercase' }}>{row.name}</TableRowColumn>
        <TableRowColumn style={{ width: '25%', height: '32px', textTransform: 'uppercase' }}>{row.rating}</TableRowColumn>
        <TableRowColumn style={{ width: '25%', height: '32px', textTransform: 'uppercase' }}>{row.review}</TableRowColumn>
        <TableRowColumn style={{ width: '5%', height: '32px', textTransform: 'uppercase' }}>
          <IconButton iconClassName="fa fa-plus" onClick={() => {
            this.handleModalOpen(true, row)
          }}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
  renderReviewModal() {
    let email
    let reviewTextArea
    let form
    return (
      <div>
        <Dialog
          title={`Please enter review for - ${this.state.name}`}
          open={this.state.modalOpen}
          modal={false}
        >
          <form
            ref={(node) => { form = node }}
            onSubmit={(event) => {
              event.preventDefault()
              this.props.submitReview(email.getValue(), reviewTextArea.getValue(), this.state.name)
            }}
          >
            <div className="col-1-1">
              <TextField
                ref={(node) => { email = node }}
                style={styles.field}
                floatingLabelText="Email"
                required
                type="email"
                fullWidth
              />
            </div>
            <div className="col-1-1">
            <TextField
              hintText="Please provide your review"
              floatingLabelText="Review"
              multiLine
              ref={(node) => { reviewTextArea = node }}
              style={styles.field}
              required
              fullWidth
              type="text"
            />
            </div>
            <div className="col-1-2">
              <FlatButton
                label="Add Review"
                primary
                type="submit"
                onTouchTap={this.handleModalClose}
              />
            </div>
            <div className="col-1-2">
              <FlatButton
                label="Dismiss"
                primary
                onTouchTap={this.handleModalClose}
              />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
  renderProductList() {
    let username
    let password
    return (
      <Paper style={styles.paperTable} >
        <Toolbar style={styles.toolbar} >
          <ToolbarGroup>
            <ToolbarTitle style={styles.toolbarTitle} text="PRODUCTS HISTORY" />
          </ToolbarGroup>
        </Toolbar>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '25%' }}><span style={styles.tableHeaderText}>NAME</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '25%' }}><span style={styles.tableHeaderText}>RATING</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '25%' }}><span style={styles.tableHeaderText}>REVIEW</span></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%' }}><span style={styles.tableHeaderText}></span></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {this.props.data ? this.props.data.map((row, index) => this._renderItem(row, index)) : ''}
          </TableBody>
        </Table>
      </Paper>
    )
  }
  render() {
    return (
      <div className="grid grid-pad">
        {this.renderProductList()}
        {this.renderReviewModal()}
      </div>
    )
  }
}
ProductListForUser.propTypes = {
  data: React.PropTypes.array,
  onSubmitEdit: React.PropTypes.func,
  submitReview: React.PropTypes.func,
  addReview: React.PropTypes.func
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitReview: (email, review, name) => {
      dispatch(addReview({
        email,
        product: {
          name,
          review,
          rating: 3
        }
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListForUser)
