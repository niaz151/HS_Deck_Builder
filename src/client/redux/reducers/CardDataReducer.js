var initial_state = []

export default (state = initial_state, action) => {
  switch(action.type){

    case 'ADD_CARD_DATA':
      return [action.payload.cards]

    default:
      return state
  }
}