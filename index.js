
{
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
}

{
    type: 'REMOVE_TODO',
    id: 0,
}

{
    type: 'TOGGLE_TODO',
    id: 0,
}

{
    type: 'ADD_GOAL',
    goal: {
        id: 0, 
        name: 'Run a Marathon'
    }
}
 {
     type: 'REMOVE_GOAL',
     id: 0,
 }

 /*
 Pure Functions
 1) they always return the same result if the same arguments are passed in
 2) they depend only on the arguments passed into them.
 3) they should never produce any side effects
 */

 //Reducer Function
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
        return state.concat([action.todo])
     case 'REMOVE_TODO':
        return state.filter((todo) => todo.id !== action.id)
    case 'TOGGLE_TODO':
        return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, {complete: !todo.complete}))
    default :
         return state
    }
}

function goals (state = [], action) {
    switch(action.type){
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL': 
            return state.filter((goal) => goal.id !== action.id)
        default: 
            return state
    }
}

function app (state = {}, action ) {
    return {
        todos: todos(state.todos,action),
        goals: goals(state.goals,action)
    }
}
function createStore() {
    // the store has four parts

    //1. the state
        let state
        let listeners = []
    //2. get the state
        const getState = () => state

        //3. way to listen to changes on the state
        const subscribe = (listener) => {
            listeners.push(listener)
            return () => {
                listeners = listeners.filter((l) => l !== listener)
            }
        }

        const dispatch = (action) => {
            // call todos 
            state = todos(state, action)
            // loop over listeners and invoke them 
            listeners.forEach((listener) => listener())
        }

        
        //4. way to update the state
                    return {
                        getState,
                        subscribe, 
                        dispatch
                    }
}
const store = createStore()
store.dispatch({
      type: 'ADD_TODO',
      todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
      }
    })
