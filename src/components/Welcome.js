import React, { Component } from 'react'

export default class Welcome extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <br/>
        <h2>Richard's Yelp API is an awesome new API experience</h2>
        <img className="img-responsive img-rounded center-block" id="splashImage" src="http://i.imgur.com/WdQ2av1.jpg" alt=""/>
      </div>
    )
  }
}
