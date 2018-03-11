export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

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
      		.then( (res) => { return(res.json()) })
      		.then((data) => dispatch(receiveCategories(data)))
	}
}