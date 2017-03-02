import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      order: {},
    }
    this.addFish = this.addFish.bind(this)
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

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Tagline test'/>
        </div>
          <Order />
          <Inventory addFish={this.addFish}/>
      </div>
    )
  }
}