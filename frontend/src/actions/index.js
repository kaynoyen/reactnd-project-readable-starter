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

export const requestComments = (pid) => ({
	type: REQUEST_COMMENTS,
	pid,
})

export const receiveComments = (pid, json) => ({
  type: RECEIVE_COMMENTS,
  json,
  receivedAt: Date.now(),
  pid
})

export function fetchComments(pid) {
	return dispatch => {
		dispatch(requestComments(pid))
		const url = `${process.env.REACT_APP_BACKEND}/posts/${pid}/comments`
		return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      		.then( (res) => { return(res.json())})
      		.then((data) => dispatch(receiveComments(pid, data)))
	}
}

// VOTE ON POSTS

export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"

export const upVotePost = (pid) => ({
	type: UPVOTE_POST,
	pid,
})

export const downVotePost = (pid) => ({
	type: DOWNVOTE_POST,
	pid,
})

export function postUpVotePost(pid) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${pid}/`
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
		}).then((res) => dispatch(upVotePost(pid)))
		
	}
}

export function postDownVotePost(pid) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${pid}/`
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
		}).then((res) => dispatch(downVotePost(pid)))
		
	}
}

// VOTE ON COMMENTS

export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"

export const upVoteComment = (cid, pid) => ({
	type: UPVOTE_COMMENT,
	cid,
	pid,
})

export const downVoteComment = (cid, pid) => ({
	type: DOWNVOTE_COMMENT,
	cid,
	pid,
})

export function postUpVoteComment(cid, pid) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/comments/${cid}`
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
		}).then((res) => dispatch(upVoteComment(cid, pid)))
		
	}
}

export function postDownVoteComment(cid, pid) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/comments/${cid}`
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
		}).then((res) => dispatch(downVoteComment(cid, pid)))
		
	}
}

// EDIT POSTS

export const UPDATE_POST = 'UPDATE_POST'

export const updatePost = (pid, json, timestamp) => ({
	type: UPDATE_POST,
	pid,
	json,
	timestamp,
})

export function postUpdatePost(pid, json) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${pid}/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify({
                    title: json.title,
                    body: json.body,
                    timestamp: Date.now(),
                }),
		}).then((res) => dispatch(updatePost(pid, json, Date.now())))
		
	}
}

// EDIT COMMENTS

export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const updateComment = (cid, pid, json, timestamp) => ({
	type: UPDATE_COMMENT,
	cid,
	pid,
	json,
	timestamp,
})

export function postUpdateComment(cid, pid, json) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/comments/${cid}/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify({
                    body: json.body,
                    timestamp: Date.now(),
                }),
		}).then((res) => dispatch(updateComment(cid, pid, json, Date.now())))
		
	}
}

// CREATE POST

export const CREATE_POST = 'CREATE_POST'

export const createPost = (json) => ({
	type: CREATE_POST,
	json,
})

export function postCreatePost(json) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(json),
		}).then((res) => dispatch(createPost(json)))
		
	}
}

// DELETE POSTS

export const DELETE_POST = 'DELETE_POST'

export const deletePost = (pid) => ({
	type: DELETE_POST,
	pid,
})

export function postDeletePost(pid) {
	return dispatch => {
		const url = `${process.env.REACT_APP_BACKEND}/posts/${pid}`
		return fetch(url, { 
			headers: { 'Authorization': 'whatever-you-want',
			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
			credentials: 'include',
			method: 'DELETE',
		}).then((res) => dispatch(deletePost(pid)))
		
	}
}















