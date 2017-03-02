import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      order: {},
    }
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
      })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish(fish) {
    //update our state
    const fishes = { ...this.state.fishes }
    //add in new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    //set state
    this.setState({ fishes: fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
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
          <Order fishes={this.state.fishes} order={this.state.order}/>
          <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}