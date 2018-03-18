import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upvotePost, downvotePost } from '../actions'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Post extends Component {

	render(){
	  const { id, timestamp, title, body, author, category, commentCount, voteScore} = this.props.content
	  const { upvotePost, downvotePost } = this.props

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
		      <button className='vote' onClick ={() => downvotePost(id)} style={{backgroundColor: 'red'}}>downvote</button>
		      <button className='vote' onClick ={() => upvotePost(id)} style={{backgroundColor: 'green'}}>upvote</button>
		      <span style={{marginRight: 10, float: 'right'}}>({voteScore})</span>
	      </div>
	      
	    </div>
	  )
	}
}

function mapStateToProps ({categories, posts}) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))