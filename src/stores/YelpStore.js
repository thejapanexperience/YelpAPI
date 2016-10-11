import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _searchData = ''
let _favourites = []
let _favouriteIDs = []

class YelpStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {

        case 'SEARCH_RECEIVED':
        _searchData = action.payload.data
        console.log('_searchData: ', _searchData)
        this.emit('CHANGE')
        break

        case 'FAVOURITE_RECEIVED':
        _favouriteIDs=[]
        console.log('in YelpStore FAVOURITE_RECEIVED');
        console.log('action.payload.data: ', action.payload.data)
        _favourites = action.payload.data
        for (var i = 0; i < _favourites.length; i++) {
          _favouriteIDs.push(_favourites[i].id)
        }
        _favouriteIDs.sort()
        for (var i = 0; i < _favouriteIDs.length; i++) {
          console.log('_favouriteIDs[i+1]: ', _favouriteIDs[i+1])
          while (_favouriteIDs[i] === _favouriteIDs[i + 1]){
            _favouriteIDs.splice(i+1, 1)
          }
        }
        console.log('_favourites: ', _favourites)
        console.log('_favouriteIDs: ', _favouriteIDs)
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getSearchResults(){
    return _searchData
  }

  getFavouriteIDs(){
    return _favouriteIDs
  }

}

export default new YelpStore
