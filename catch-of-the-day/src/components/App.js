import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

export default class App extends Component {
  state = {
    fishes: {},
    order: {},
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
      })

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)})
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish = (fish) => {
    //update our state
    const fishes = { ...this.state.fishes }
    //add in new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    //set state
    this.setState({ fishes: fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({ fishes: fishes })
  }

  removeFish = (key) => {
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({ fishes: fishes })
  }

  removeFromOrder = (key) => {
    const order = {...this.state.order}
    delete order[key]
    this.setState({ order: order })
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    //take a copy of state
    const order = { ...this.state.order }
    //update or add the new number of fish orderded
    order[key] = order[key] + 1 || 1
    this.setState({ order: order })
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Tagline test'/>
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>)
            }
          </ul>
        </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            params={this.props.params}
            removeFromOrder={this.removeFromOrder}
          />
          <Inventory
            updateFish={this.updateFish}
            fishes={this.state.fishes}
            addFish={this.addFish}
            loadSamples={this.loadSamples}
            removeFish={this.removeFish}
            storeId={this.props.params.storeId}
          />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}