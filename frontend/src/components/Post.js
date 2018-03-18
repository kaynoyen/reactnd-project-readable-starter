import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVotePost, postDownVotePost} from '../actions'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Post extends Component {

	render(){
	  const { id, timestamp, title, body, author, category, commentCount, voteScore} = this.props.content
	  const { postUpVotePost, postDownVotePost } = this.props

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
		      <button className='vote' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'red'}}>downvote</button>
		      <button className='vote' onClick ={() => postUpVotePost(id)} style={{backgroundColor: 'green'}}>upvote</button>
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
    postUpVotePost: (data) => dispatch(postUpVotePost(data)),
    postDownVotePost: (data) => dispatch(postDownVotePost(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))