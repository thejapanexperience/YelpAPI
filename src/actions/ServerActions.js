import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveSearch(data){
    AppDispatcher.dispatch({
      type: 'SEARCH_RECEIVED',
      payload: { data }
    })
  },

  receiveDetails(data){
    AppDispatcher.dispatch({
      type: 'DETAILS_RECEIVED',
      payload: { data }
    })
  },

  favourites(data){
    console.log('in ServerActions');
    console.log('data: ', data)
    AppDispatcher.dispatch({
      type: 'FAVOURITE_RECEIVED',
      payload: { data }
    })
  }
}
export default ServerActions
