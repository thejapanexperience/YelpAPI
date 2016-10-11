import React, { Component } from 'react'
import YelpStore from '../stores/YelpStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      testData: YelpStore.getSearchResults(),
      favouriteIDs: YelpStore.getFavouriteIDs(),

    }

    this.testFunc = this.testFunc.bind(this)
    this._onChange = this._onChange.bind(this)
    this._businessSearch = this._businessSearch.bind(this)
    this._favourite = this._favourite.bind(this)
  }

  componentWillMount() {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    YelpStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      searchData: YelpStore.getSearchResults(),
      favouriteIDs: YelpStore.getFavouriteIDs(),
    })
  }

  _businessSearch() {
    let { what, where } = this.refs
    let whats = what.value
    let wheres = where.value
    ToAPIActions.search(whats, wheres)
  }

  _favourite(business) {
    console.log('in Layout _favourite');
    ToAPIActions.favourite(business)
  }

  _detailView(business) {
    console.log('in Layout _detailView');
  }

  testFunc(e){
    e.preventDefault()
    ToAPIActions.getFlashCards()
  }

  render() {
    let { searchData, favouriteIDs } = this.state
    console.log('searchData: ', searchData)
    return (
      <div>
        {this.state.testData ? <h1>{this.state.testData}</h1> : <h1>data not received</h1> }
        <button className="btn btn-primary" onClick={this.testFunc}>Test</button>
        <br/>
        <br/>
        <input type="text" defaultValue="cameras" ref="what"/><span>  </span>
        <input type="text" defaultValue="San Francisco" ref="where"/><span>  </span>
        <button onClick={this._businessSearch} className="btn btn-info">Search for a business</button>

        {searchData ?
          <table className="table table-hover">
            <thead>

            </thead>
            <tbody>
              {searchData.businesses.map((business) =>
                (
                  <tr key={business.id}>
                    <td>{business.name}</td>
                    <td>{business.phone}</td>
                    <td>{business.rating}</td>
                    <td><button onClick={this._detailView.bind(null, business)} className="btn btn-info">See Detailed View</button></td>
                    {favouriteIDs.indexOf(business.id) > -1
                      ? <td><button onClick={this._favourite.bind(null, business)} className="btn btn-warning">Favourite</button></td>
                      : <td><button onClick={this._favourite.bind(null, business)} className="btn btn-danger">Unfavourite</button></td>
                    }
                        <td><button onClick={this._favourite.bind(null, business)} className="btn btn-warning">Favourite</button></td>
                      </tr>
              ))}
            </tbody>
          </table> :
          <button className="btn btn-block btn-danger">data not received</button> }

      </div>

    )
  }
}
