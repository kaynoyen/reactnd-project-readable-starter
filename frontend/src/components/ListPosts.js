import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

function Post ({detail}) {
  const { id, timestamp, title, body, author, category, commentCount, voteScore} = detail

  return (
    <div style={{
    	margin: 20,
    	padding: 10,
    	borderStyle: 'solid', 
    	borderRadius: 3, 
    	borderWidth: 1,
    	borderColor: '#888888',
    	maxWidth: 500,
    	minWidth: 400}}>

      <Link to={`/${category}/${id}`}><h3>{title}</h3></Link>

      <h4>{author}</h4>
      <p>{body}</p>

      <div>
	      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/edit`}>edit</Link>
	      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>delete</Link>
	      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>comment ({commentCount})</Link>
	      <Link style={{marginRight: 10, float: 'right', color: 'red', fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>downvote</Link>
	      <Link style={{marginRight: 10, float: 'right', color: 'green', fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>upvote</Link>
	      <span style={{marginRight: 10, float: 'right'}}>({voteScore})</span>
      </div>
      
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