import React, { Component } from 'react'
import { Link } from 'react-router'

import YelpStore from '../stores/YelpStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class Layout extends Component {
  constructor() {
    super();
  }


  render() {
    return(
    <div>
      <br/>
      <h1 className='text-center'>Richard's Yelp API</h1>

      <div className="row">
        <Link className="btn btn-info" to='/welcome'>
          Richard's YELP API
        </Link>
        <span>  </span>
        <Link className="btn btn-warning" to='/searching' activeClassName='disabled'>
          Yelp Search
        </Link>
        <span>  </span>
        <Link className="btn btn-warning" to='/myfavourites' activeClassName='disabled'>
          Favourites
        </Link>
        <span>  </span>
        <Link className="btn btn-warning" to='/detail' activeClassName='disabled'>
          Detail View
        </Link>

      </div>

      {this.props.children}

    </div>
  )
  }
}
