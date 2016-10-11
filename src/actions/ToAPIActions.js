import API from '../API'

const ToAPIActions = {

  search(whats, wheres){
    console.log('In toAPIActions')
    API.yelpSearch(whats, wheres)
  },

  details(id){
    console.log('In toAPIActions')
    API.details(id)
  },

  favourite(business){
    console.log('In toAPIActions')
    API.favourites(business)
  },

  unfavourite(business){
    console.log('In toAPIActions')
    API.unfavourite(business)
  },

  allFavourites(){
    console.log('In toAPIActions')
    API.allFavourites()
  },

}
export default ToAPIActions
