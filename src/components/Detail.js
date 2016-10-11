import React, { Component } from 'react'
import YelpStore from '../stores/YelpStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      details: YelpStore.getDetails(),
    }

    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    YelpStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      details: YelpStore.getDetails(),
    })
  }

  render() {
    let { details } = this.state
    console.log('details: ', details)

    return (
      <div>
        <br/>
        <br/>
        <span>Here are your details</span>
        {details ?
          <table className="table table-hover">
            <thead>

            </thead>
            <tbody>
              <tr>
                <td>{details.name}</td>
              </tr>
              <tr>
                <td>{details.snippet_text}</td>
              </tr>
              <tr>
                <td><img src={details.image_url} alt=""/></td>
              </tr>
              <tr>
                <td><img src={details.rating_img_url_large} alt=""/></td>
              </tr>
              <tr>
                <td><img src={details.snippet_image_url} alt=""/></td>
              </tr>
            </tbody>
          </table> :
          <button className="btn btn-block btn-danger">data not received</button> }

      </div>

    )
  }
}
