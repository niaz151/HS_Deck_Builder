// MAX INITIAL STATE IS 4
var initial_state = 1


export default (state = initial_state, action) => {
  switch(action.type){

    case 'INCREASE_PAGE_COUNT':
      let next_page = state + 1
      return next_page
    
    case 'DECREASE_PAGE_COUNT':
      let prev_page = state - 1
      console.log(prev_page)
      return prev_page

    default:
      return state

  }
}