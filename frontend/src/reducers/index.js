import { combineReducers } from 'redux'

function one (state = {}, action) {
	switch (action.type) {
		case true :
			const { recipe } = action

			return {
				...state,
				[recipe.label]: recipe
			}
		default :
			return state
	}
}

function two (state = {}, action) {
	switch (action.type) {
		case true :
			const { recipe } = action

			return {
				...state,
				[recipe.label]: recipe
			}
		default :
			return state
	}
}

export default combineReducers({
	one,
	two,
})