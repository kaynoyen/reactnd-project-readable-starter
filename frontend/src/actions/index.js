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