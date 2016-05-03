import React, { Component } from 'react'
import { connect } from 'react-redux'

import { goToPage } from '../../../redux/actions/routingActions'
import { performSearch, clearResults, changeSortType } from '../../../redux/actions/searchActions'

import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ReactSlider from '../../slider'
import GridList from '../../GridList'
import styles from './style'
import SnackBar from '../../SnackBar'

import Table from 'material-ui/Table'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'

class SearchResults extends Component {
  componentWillMount() {
    if (!this.props.data || this.props.data.length === 0) {
      this.props.clearResults()
    }
  }
  renderSnackBar() {
    return (
      <SnackBar message="Logged out Successfully!" open />
    )
  }
  renderResultStatus() {
    return (
      <div className="col-1-1">
        <Paper style={styles.paper}>
          <div className="col-1-2">
           <div className="content">
               {this.props.data ? this.props.data.length : 0} Results Found
           </div>
          </div>
          {this.props.data && this.props.data.length > 0 ? (<div className="col-1-2">
           <div className="content">
             <SelectField
               value={this.props.sortType || 1}
               onChange={(event, index, value) => {
                 const sortType = value % 2
                 this.props.handleChangeSortType(value)
                 this.props.onSubmit(
                   this.props.query,
                   (sortType === 0) ? '/desc' : '',
                 )
               }}
             >
               <MenuItem value={1} primaryText="Price - Low to High"/>
               <MenuItem value={2} primaryText="Price - High to Low"/>
             </SelectField>
           </div>
          </div>) : null}
        </Paper>
      </div>
    )
  }
  renderResult() {
    const ResultRows = this.props.data ? this.props.data.map((product, index) => (
      <TableRow key={index}>
        <TableRowColumn>{product.name}</TableRowColumn>
        <TableRowColumn>{product.amount}</TableRowColumn>
        <TableRowColumn>{product.quantity}</TableRowColumn>
      </TableRow>
    )) : null
    return (
      <div className="col-1-1">
      <Paper style={styles.paper}>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {ResultRows}
          </TableBody>
        </Table>
      </Paper>
    </div>
    )
  }
  render() {
    let query
    return (
      <div className="grid grid-pad">
        <div className="col-1-1">
          <Paper style={styles.paper}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              this.props.onSubmit(
                query.getValue(),
              )
            }}
          >
            <div>
              <TextField
                ref={(node) => { query = node }}
                style={styles.field}
                floatingLabelText="Enter Query"
                required="true"
                type="text"
              />
            </div>
            <RaisedButton label="Search" primary type="submit" disabled={false} style={styles.button} />
          </form>
          </Paper>
        </div>
        {this.props.showResults && this.renderResultStatus()}
        {this.props.showResults && this.renderResult()}
        <div className="col-1-1">
          {this.props.snackBarDisplay ? this.renderSnackBar() : ''}
        </div>
      </div>
    )
  }
}
SearchResults.propTypes = {
  onSubmit: React.PropTypes.func,
  clearResults: React.PropTypes.func,
  handleChangeSortType: React.PropTypes.func,
  query: React.PropTypes.string,
  showResults: React.PropTypes.bool,
  sortType: React.PropTypes.number,
  data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  snackBarDisplay: React.PropTypes.bool,
  params: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    sortType: state.search.sortType,
    showResults: state.search.showResults,
    query: state.search.query,
    data: state.products.productData,
    snackBarDisplay: state.products.snackBarDisplay
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (query, sortType = '') => {
      // dispatch(goToPage(`/search?q=${query}`))
      dispatch(performSearch(query, sortType))
    },
    clearResults: () => {
      dispatch(clearResults())
    },
    handleChangeSortType: (sortType) => {
      dispatch(changeSortType(sortType))
    }
  }
}
const Search = connect(mapStateToProps, mapDispatchToProps)(SearchResults)
export default Search
