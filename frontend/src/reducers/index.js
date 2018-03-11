import {
	RECEIVE_CATEGORIES,
	REQUEST_CATEGORIES
} from '../actions'

import {
	RECEIVE_POSTS,
	REQUEST_POSTS
} from '../actions'

import { combineReducers } from 'redux'

function categories (state = {
		isFetching: false,
		items: []
		}, 
		action
	) {
	switch (action.type) {

		case REQUEST_CATEGORIES :

			return Object.assign({}, state, {
  				isFetching: true
			})

		case RECEIVE_CATEGORIES :

			return Object.assign({}, state, {
				isFetching: false,
  				items: action.items,
  				lastUpdated: action.receivedAt,
			})

		default :
			return state
	}
}

function posts (state = {
		isFetching: false,
		items: []
		}, 
		action
	) {
	switch (action.type) {

		case REQUEST_POSTS :

			return Object.assign({}, state, {
  				isFetching: true
			})

		case RECEIVE_POSTS :

			return Object.assign({}, state, {
				isFetching: false,
  				items: action.items,
  				lastUpdated: action.receivedAt,
			})

		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
})