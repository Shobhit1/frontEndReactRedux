import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
// import AddToShoppingCart from 'material-ui/svg-icons/Action/3d_rotation'
import { connect } from 'react-redux'
import { getIndividualProduct } from '../../redux/actions/productsActions'
import { goToPage } from '../../redux/actions/routingActions'

import styles from './styles'

class GridListCompView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tileData: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.convertData(nextProps.data)
  }
  convertData(props) {
    const arr = Object.keys(props).map((k) => this.createObject(props[k]))
    this.setState({ tileData: arr.slice(3) })
  }
  createObject(product) {
    return Object.assign({}, { img: product.pictures[0], title: product.name, category: product._category })
  }
  render() {
    return (
      <GridList
        cellHeight={200}
        cols={4}
      >
        {this.state.tileData.map((tile) => (
          <GridTile
            key={tile.title}
            title={tile.title.toUpperCase()}
            subtitle={<span>Category: <b>{tile.category.toUpperCase()}</b></span>}
            onClick={() => this.props.handleClick(tile.title)}
            actionIcon={
              <IconButton
                onClick={() => this.props.handleClick(tile.title)}
                iconClassName="fa fa-info-circle"
                color="white"
                iconStyle={styles.mediumIcon}
                style={styles.mediumIconWrapper}
                tooltip="More Information"
                tooltipPosition="bottom-left"
              />
            }
          >
            <img src={tile.img} alt="tile" />
          </GridTile>
        ))}
      </GridList>
    )
  }
}

GridListCompView.propTypes = {
  data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  handleClick: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (name) => {
      dispatch(getIndividualProduct(name))
    },
    handleAddToCartClick: (name) => {
      dispatch(getIndividualProduct(name))
    }
  }
}
const GridListComp = connect(mapStateToProps, mapDispatchToProps)(GridListCompView)

export default GridListComp
