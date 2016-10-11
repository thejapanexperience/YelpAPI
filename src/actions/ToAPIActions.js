import API from '../API'

const ToAPIActions = {

  search(whats, wheres){
    console.log('In toAPIActions')
    API.yelpSearch(whats, wheres)
  },

  favourite(business){
    console.log('In toAPIActions')
    API.favourites(business)
  },

}
export default ToAPIActions
