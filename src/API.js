import { get, put, delete, post } from 'axios'
import ServerActions from './actions/ServerActions'
// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

const API = {

  yelpSearch(whats, wheres){
    console.log('whats, wheres: ', whats, wheres)
    console.log('in API');
    post(`http://localhost:8000/search/`, {
      term: whats,
      location: wheres
    })
      .then(res => {
        console.log('in API callback');
        let data = res.data
        console.log('data: ', data)
        ServerActions.receiveSearch(data)
      })
      .catch(console.error)
  },

  favourites(business){
    console.log('in API');
    console.log('business: ', business)
    post(`http://localhost:8000/favourites`, {business})
      .then(res => {
        console.log('in API callback');
        let { data } = res
        console.log('data: ', data)
        ServerActions.favourites(data)
      })
      .catch(console.error)
  }
}

export default API
