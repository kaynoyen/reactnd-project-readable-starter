import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

function Post ({detail}) {
  const { id, timestamp, title, body, author, category} = detail

  return (
    <div>
      <hr/>
      <Link to={`${category}/${id}`}><h2>{title}</h2></Link>
      <h3>{author}</h3>
      <p>{body}</p>
      <Link to={`${category}/${id}/edit`}>edit</Link> <br/>
      <Link to={`${category}/${id}/delete`}>delete</Link>
    </div>
  )
}

class ListPosts extends Component {

	render(){

		const { posts, match } = this.props
		const category = match.params.category

	  return (

	  	<div>
		    {

		    	posts.isFetching ? 
		    	<p> loading ... </p> :
		    	category ? 
		    		posts.items.filter(post => (
			    		post.category === category)).map(post => (
			      			<Post key={post.id} detail={post}/>
			      		)) :
			    	posts.items.map(post => (
			    		<Post key={post.id} detail={post}/>))}
	    </div>

	    )
	}
}


function mapStateToProps ({categories, posts}) {
  return {
    categories: categories,
    posts: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))