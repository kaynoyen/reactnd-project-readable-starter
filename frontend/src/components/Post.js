import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVotePost, postDownVotePost} from '../actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Timestamp from 'react-timestamp'

class Post extends Component {

	render(){
	  const { id, timestamp, title, body, author, category, commentCount, voteScore} = this.props.content
	  const { postUpVotePost, postDownVotePost } = this.props

	  return (
	    <div className='post-box'>

	      <Link to={`/${category}/${id}`}><h3 className='post-title'>{title}</h3></Link>
	      <Timestamp className='time-stamp' time={timestamp/1000} />

	      <h4>by <span className='author'>{author}</span></h4>
	      <p>{body}</p>

	      <div>
		      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/edit`}>edit</Link>
		      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>delete</Link>
		      <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${id}/delete`}>comment ({commentCount})</Link>
		      <button className='vote-button' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'red'}}>downvote</button>
		      <button className='vote-button' onClick ={() => postUpVotePost(id)} style={{backgroundColor: 'green'}}>upvote</button>
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