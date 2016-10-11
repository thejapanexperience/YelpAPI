import AppDispatcher from '../AppDispatcher'

const NormalActions = {
  receiveFlashCards(flashcards){
    AppDispatcher.dispatch({
      type: 'CARD_RECEIVED',
      payload: { flashcards }
    }) 
  }
}
export default NormalActions
