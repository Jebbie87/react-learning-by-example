import React, { Component } from 'react'
import { getFunName } from '../helpers'

export default class StorePicker extends Component {
  goToStore = (event) => {
    event.preventDefault()
    console.log('You changed the URL')
    // first grab the text from the box
    const storeId = this.storeInput.value
    console.log(`Going to ${storeId}`)
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  render() {
    return (
      <form className='store-selector' onSubmit={(e) => { this.goToStore(e) }}>
        {/* test comment */}
        <h2>Please enter a store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
        <button type='submit'>Visit a store -> </button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}