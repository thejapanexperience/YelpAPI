import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _searchData = ''
let _favourites = ''
let _favouriteIDs = ''
let _details = ''

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

        case 'DETAILS_RECEIVED':
        _details = action.payload.data
        console.log('_details: ', _details)
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
        console.log('_favourites: ', _favourites)
        console.log('_favouriteIDs: ', _favouriteIDs)
        if (_favouriteIDs.length === 0) {
          _favourites = ""
          _favouriteIDs = ""
        }
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

  getFavourites(){
    return _favourites
  }

  getDetails(){
    return _details
  }

}

export default new YelpStore
