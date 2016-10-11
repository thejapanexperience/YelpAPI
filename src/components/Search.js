import React, { Component } from 'react'
import YelpStore from '../stores/YelpStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'
import { Router, Route, browserHistory, IndexRoute } from 'react-router';



export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchData: YelpStore.getSearchResults(),
      favouriteIDs: YelpStore.getFavouriteIDs(),
      faves: false

    }

    this._onChange = this._onChange.bind(this)
    this._businessSearch = this._businessSearch.bind(this)
    this._favourite = this._favourite.bind(this)
    this._unfavourite = this._unfavourite.bind(this)
    this._getAllFavourites = this._getAllFavourites.bind(this)
    this._detailView = this._detailView.bind(this)
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

  _unfavourite(business) {
    console.log('in Layout _unfavourite');
    ToAPIActions.unfavourite(business)
  }

  _getAllFavourites() {
    console.log('in Layout _getAllFavourites');
    this.setState({
      faves: true
    })
    ToAPIActions.allFavourites()
  }

  _detailView(id) {
    console.log('in Layout _detailView');
    ToAPIActions.details(id)
  }

  render() {
    let { searchData, favouriteIDs, faves } = this.state
    if (faves === false || searchData === false) {
      this._getAllFavourites()
    }
    console.log('browserHistory: ', browserHistory)
    console.log('favouriteIDs: ', favouriteIDs)
    console.log('searchData: ', searchData)
    return (
      <div>


        <br/>
        <br/>
        <input type="text" defaultValue="cameras" ref="what"/><span>  </span>
        <input type="text" defaultValue="San Francisco" ref="where"/><span>  </span>
        <button onClick={this._businessSearch} className="btn btn-info">Search for a business</button>
        <br/>
        <br/>

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
                    <td><button onClick={this._detailView.bind(null, business.id)} className="btn btn-info">See Detailed View</button></td>
                    {favouriteIDs.indexOf(business.id) > -1 ?
                      <td><button onClick={this._unfavourite.bind(null, business)} className="btn btn-danger">Unfavourite</button></td>
                      :
                      <td><button onClick={this._favourite.bind(null, business)} className="btn btn-warning">Favourite</button></td>}
                  </tr>
              ))}
            </tbody>
          </table>
          :
          <button className="btn btn-block btn-danger">data not received</button> }

      </div>

    )
  }
}
