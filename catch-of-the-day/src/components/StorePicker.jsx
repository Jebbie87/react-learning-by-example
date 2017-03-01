import React, { Component } from 'react'
import { getFunName } from '../helpers'

export default class StorePicker extends Component {
  render() {
    return (
      <form className='store-selector'>
        {/* test comment */}
        <h2>Please enter a store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()}/>
        <button type='submit'>Visit a store -> </button>
      </form>
    )
  }
}
