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
	DOWNVOTE_COMMENT,
	UPDATE_COMMENT,
	CREATE_POST,
	DELETE_POST,
	CREATE_COMMENT,
	DELETE_COMMENT
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

		case CREATE_POST :

			return {
				...state,
				items: {
					...state.items,
					[action.json.id]: action.json
				}
			}

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
						[action.pid]: {
							...state.items[action.pid],
							voteScore: state.items[action.pid].voteScore + 1
						}
					}
				}

		case DOWNVOTE_POST :

			return {
				...state,
					items: {
						...state.items,
						[action.pid]: {
							...state.items[action.pid],
							voteScore: state.items[action.pid].voteScore - 1
						}
					}
				}

		case UPDATE_POST :

			return {
				...state,
					items: {
						...state.items,
						[action.pid]: {
							...state.items[action.pid],
							...action.json,
							timestamp: action.timestamp,
						}
					}
				}

		case DELETE_POST:

			return {
				...state,
					items: {
						...Object.keys(state.items).filter(item => 
							item !== action.pid).reduce((all, one) => 
							({...all,
								[one]: state.items[one],
							}),{})
					}

			}

		case CREATE_COMMENT:

			return {
				...state,
					items: {
						...state.items,
						[action.pid]: {
							...state.items[action.pid],
							commentCount: state.items[action.pid].commentCount + 1
						}

					}
			}

			case DELETE_COMMENT:

			return {
				...state,
					items: {
						...state.items,
						[action.pid]: {
							...state.items[action.pid],
							commentCount: state.items[action.pid].commentCount - 1
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
				[action.pid]: {
					isFetching: true,
				}
			})

		case RECEIVE_COMMENTS :

			return Object.assign({}, state, {
				isFetching: false,
				[action.pid]: {
					isFetching: false,
	  				items: action.json.reduce((all, one)=>(
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
						[action.cid]: {
							...state[action.pid].items[action.cid],
							voteScore: state[action.pid].items[action.cid].voteScore + 1,
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
						[action.cid]: {
							...state[action.pid].items[action.cid],
							voteScore: state[action.pid].items[action.cid].voteScore - 1,
						}
					}
				}
			}

		case UPDATE_COMMENT :

			return {
					...state,
					[action.pid]: {
						...state[action.pid],
						items: {
							...state[action.pid].items,
							[action.cid]: {
								...state[action.pid].items[action.cid],
								...action.json,
								timestamp: action.timestamp,
							}
						}
					}
				}

		case CREATE_COMMENT :

			return {
				...state,
				[action.pid]: action.pid in state ? {
					...state[action.pid],
					items: {
						...state[action.pid].items,
						[action.json.id]: {
							...action.json,
						}
					}
				} : {
					items: {
						[action.json.id]: {
							...action.json,
						}
					}
				}
			}

		case DELETE_COMMENT :

			return {

				...state,
				[action.pid]: {
					...state[action.pid],
					items: {
						...Object.keys(state[action.pid].items).filter(item => 
							item !== action.cid).reduce( (all, one) => (
								{
									...all,
									[one]: {
										...state[action.pid].items[one]
									}
								}),{})

					}
				}
				
		
			}

		case CREATE_POST :

			return {
				...state,
				[action.json.id]: {
					items: {},
				}
			}

		case DELETE_POST :

			return {

				...Object.keys(state).filter(key => key !== action.pid).reduce((all, one) => (
				{
					...all,
					[one]: {
						...state[one]
					}
				}),{}),
				isFetching: state.isFetching,
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









