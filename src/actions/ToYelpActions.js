import AppDispatcher from '../AppDispatcher'

const ToYelpActions = {
  receiveFlashCards(flashcards){
    AppDispatcher.dispatch({
      type: 'CARD_RECEIVED',
      payload: { flashcards }
    })
  }
}
export default ToYelpActions
