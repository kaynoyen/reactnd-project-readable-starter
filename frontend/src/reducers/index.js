import {
	RECEIVE_CATEGORIES,
	REQUEST_CATEGORIES,
	RECEIVE_POSTS,
	REQUEST_POSTS,
	RECEIVE_COMMENTS,
	REQUEST_COMMENTS,
	UPVOTE_POST,
	DOWNVOTE_POST,
	UPDATE_POST,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT
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
		items: {}
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
  				items: action.items.reduce((all, one)=>(
  					{...all,
  						[one.id]: one,
  						}
  					),{}),
  				lastUpdated: action.receivedAt,
			})

		case UPVOTE_POST :

			return {
				...state,
					items: {
						...state.items,
						[action.id]: {
							...state.items[action.id],
							voteScore: state.items[action.id].voteScore + 1
						}
					}
				}

		case DOWNVOTE_POST :

			return {
				...state,
					items: {
						...state.items,
						[action.id]: {
							...state.items[action.id],
							voteScore: state.items[action.id].voteScore - 1
						}
					}
				}

		case UPDATE_POST :

			return {
				...state,
					items: {
						...state.items,
						[action.id]: {
							...state.items[action.id],
							...action.json,
							timestamp: action.timestamp,
						}
					}
				}

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
	  				items: action.items.reduce((all, one)=>(
  					{...all,
  						[one.id]: one,
  						}
  					),{}),
	  				lastUpdated: action.receivedAt,
  				}
			})

		case UPVOTE_COMMENT :

			return {
				...state,
				[action.pid]: {
					...state[action.pid],
					items: {
						...state[action.pid].items,
						[action.id]: {
							...state[action.pid].items[action.id],
							voteScore: state[action.pid].items[action.id].voteScore + 1,
						}
					}
				}
			}

		case DOWNVOTE_COMMENT :

			return {
				...state,
				[action.pid]: {
					...state[action.pid],
					items: {
						...state[action.pid].items,
						[action.id]: {
							...state[action.pid].items[action.id],
							voteScore: state[action.pid].items[action.id].voteScore - 1,
						}
					}
				}
			}

		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})









