// FETCH CATEGORIES

export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"

export const requestCategories = () => ({
	type: REQUEST_CATEGORIES,
})

export const receiveCategories = json => ({
  type: RECEIVE_CATEGORIES,
  items: json.categories,
  receivedAt: Date.now(),
})

export function fetchCategories() {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/categories`
		dispatch(requestCategories())
		return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      		.then( (res) => { return(res.json())})
      		.then((data) => dispatch(receiveCategories(data)))
	}
}

// FETCH POSTS (ALL)

export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE POSTS"
export const FETCH_POSTS = "FETCH_POSTS"

export const requestPosts = () => ({
	type: REQUEST_POSTS,
})

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  items: json,
  receivedAt: Date.now(),
})

export function fetchPosts() {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts`
		dispatch(requestPosts())
		return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      		.then( (res) => { return(res.json())})
      		.then((data) => dispatch(receivePosts(data)))
	}
}

// FETCH COMMENTS

export const REQUEST_COMMENTS = "REQUEST_COMMENTS"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const FETCH_COMMENTS = "FETCH_COMMENTS"

export const requestComments = (id) => ({
	type: REQUEST_COMMENTS,
	id,
})

export const receiveComments = (id, json) => ({
  type: RECEIVE_COMMENTS,
  items: json,
  receivedAt: Date.now(),
  id
})

export function fetchComments(id) {
	return dispatch => {
		dispatch(requestComments(id))
		const url = `${process.env.REACT_APP_BACKEND}/posts/${id}/comments`
		return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      		.then( (res) => { return(res.json())})
      		.then((data) => dispatch(receiveComments(id, data)))
	}
}

// VOTE ON POSTS

export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"

export const upVotePost = (id) => ({
	type: UPVOTE_POST,
	id,
})

export const downVotePost = (id) => ({
	type: DOWNVOTE_POST,
	id,
})

export function postUpVotePost(id) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${id}/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
                    option: 'upVote'
                }),
		}).then((res) => dispatch(upVotePost(id)))
		
	}
}

export function postDownVotePost(id) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${id}/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
                    option: 'downVote'
                }),
		}).then((res) => dispatch(downVotePost(id)))
		
	}
}

// EDIT POSTS

export const UPDATE_POST = 'UPDATE_POST'

export const updatePost = (id, json) => ({
	type: UPDATE_POST,
	id,
	json,
})

export function postUpdatePost(id,json) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${id}/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify({
                    title: json.title,
                    body: json.body
                }),
		}).then((res) => dispatch(updatePost(id, json)))
		
	}
}















