import React, { Component } from 'react'
import YelpStore from '../stores/YelpStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'


export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      favourites: YelpStore.getFavourites(),
      favouriteIDs: YelpStore.getFavouriteIDs(),
      faves: false

    }

    this._onChange = this._onChange.bind(this)
    this._favourite = this._favourite.bind(this)
    this._unfavourite = this._unfavourite.bind(this)
    this._getAllFavourites = this._getAllFavourites.bind(this)
    this._detailView = this._detailView.bind(this)

  }

  componentWillMount() {
    YelpStore.startListening(this._onChange);
    this.setState({
      favourites: YelpStore.getFavourites(),
      favouriteIDs: YelpStore.getFavouriteIDs(),
    })
  }

  componentWillUnmount() {
    YelpStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      favourites: YelpStore.getFavourites(),
      favouriteIDs: YelpStore.getFavouriteIDs(),
    })
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
    let { favourites, favouriteIDs, faves } = this.state
    if (faves === false || favourites === false) {
      this._getAllFavourites()
    }
    console.log('favourites: ', favourites)
    return (
      <div>


        <br/>
        <br/>

        {favourites ?
          <table className="table table-hover">
            <thead>

            </thead>
            <tbody>
              {favourites.map((business) =>
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
