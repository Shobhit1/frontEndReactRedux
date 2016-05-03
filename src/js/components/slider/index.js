import React, { Component } from 'react'
import Slider from 'react-slick'
import { BANNER, PRODUCT_IMAGES } from '../../redux/constants/actions'
import styles from './style'

class ReactSlider extends Component {
  getObject() {
    const { type } = this.props.settings
    switch (type) {
      case BANNER:
        const arr = Object.keys(this.props.data).map((k) => this.renderDiv(this.props.data[k]))
        return arr.slice(0, 3)
      case PRODUCT_IMAGES:
        const temp = this.props.data.pictures
        return temp && temp.map((picture, index) => this.renderImages(picture, index))
      default:
        return null
    }
  }
  renderImages(picture, index) {
    return <img key={index} style={styles.image} src={picture} alt="product" />
  }
  renderDiv(product) {
    return (
      <div style={styles.image}>
        <a href={`products/${product.name}`}> <img key={product.name} src={product.pictures[1]} alt="product" /></a>
      </div>
    )
  }
  render() {
    return (
      <Slider {...this.props.settings}>
        {this.getObject()}
      </Slider>
    )
  }
}

ReactSlider.propTypes = {
  settings: React.PropTypes.object,
  data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
}
export default ReactSlider
