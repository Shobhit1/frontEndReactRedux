import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../../../redux/actions/loginActions'
import { BANNER } from '../../../redux/constants/actions'

import ReactSlider from '../../slider'
import GridList from '../../GridList'
import styles from './style'
import SnackBar from '../../SnackBar'

class ProductsView extends Component {
  renderSnackBar() {
    return (
      <SnackBar message="Logged out Successfully!" open />
    )
  }
  render() {
    return (
      <div className="grid grid-pad">
        <div className="col-1-1">
          <ReactSlider
            settings={{
              dots: true,
              infinite: true,
              speed: 500,
              autoplay: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              type: BANNER
            }}
            data={this.props.data}
          />
        </div>
        <div className="col-1-1">
          <GridList data={this.props.data} />
        </div>
        <div className="col-1-1">
          {this.props.snackBarDisplay ? this.renderSnackBar() : ''}
        </div>
      </div>
    )
  }
}
ProductsView.propTypes = {
  onSubmit: React.PropTypes.func,
  data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  snackBarDisplay: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    data: state.products.productData,
    snackBarDisplay: state.products.snackBarDisplay
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
const Products = connect(mapStateToProps, mapDispatchToProps)(ProductsView)
export default Products
