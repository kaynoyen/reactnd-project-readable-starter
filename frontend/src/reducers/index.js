import {
	RECEIVE_CATEGORIES,
	REQUEST_CATEGORIES,
	RECEIVE_POSTS,
	REQUEST_POSTS,
	RECEIVE_COMMENTS,
	REQUEST_COMMENTS,
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

function comments (state = {
	isFetching: false,
	}, 
	action
	) {
	switch (action.type) {

		case REQUEST_COMMENTS :
			return Object.assign({}, state, {
				isFetching: true,
				[action.id]: {
					isFetching: true,
				}
			})

		case RECEIVE_COMMENTS :

			return Object.assign({}, state, {
				isFetching: false,
				[action.id]: {
					isFetching: false,
	  				items: action.items,
	  				lastUpdated: action.receivedAt,
  				}
			})

		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})









