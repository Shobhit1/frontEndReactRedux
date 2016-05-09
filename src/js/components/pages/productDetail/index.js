import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSlider from '../../slider'

import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardTitle from 'material-ui/Card/CardTitle'
import FlatButton from 'material-ui/FlatButton'
import CardText from 'material-ui/Card/CardText'

import { PRODUCT_IMAGES } from '../../../redux/constants/actions'
import { addToCart } from '../../../redux/actions/shoppingCartActions'

import styles from './styles'

class ProductDetail extends Component {
  render() {
    const data = this.props.data
    return (
      <div className="grid-pad">
        <div className="col-4-12">
          <ReactSlider
            settings={{
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              type: PRODUCT_IMAGES
            }}
            data={data}
          />
        </div>
        <div className="col-8-12">
          <Card>
            <CardTitle title={data.name} subtitle={data._category} />
            <CardText>
              Product Description
              <br /><br />
              Price: $ {data.amount}
            </CardText>
            <CardActions style={styles.buttonWrapper}>
              <FlatButton label="Add To Cart" primary style={styles.button} onClick={() => this.props.addToCart(data)} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

ProductDetail.propTypes = {
  onSubmit: React.PropTypes.func,
  data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  addToCart: React.PropTypes.func,
  submitReview: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    data: state.products.eachProduct,
    isAuthenticated: state.login.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (data) => {
      dispatch(addToCart(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
