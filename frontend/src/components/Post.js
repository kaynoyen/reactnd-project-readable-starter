import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVotePost, postDownVotePost, postDeletePost} from '../actions'
import { Link } from 'react-router-dom'
import { withRouter, Redirect} from 'react-router'
import Timestamp from 'react-timestamp'

class Post extends Component {

	state = {
		redirect: false,
	}

	handleDelete = (pid) => {
		this.props.postDeletePost(pid)
		this.setState({redirect: true})
	}

	render(){
	  const { id, timestamp, title, body, author, category, commentCount, voteScore} = this.props.data
	  const { postUpVotePost, postDownVotePost} = this.props
	  const { redirect } = this.state
	  const pid = id

	  return (

	  	redirect ? <Redirect to={"/"}/> :
	    <div className='post-box'>
	    	<div>
	      		<Link to={`/${category}/${pid}`}><h3 className='post-title'>{title}</h3></Link>	
	      	</div>

	      	<div>
		      <Timestamp className='time-stamp' time={timestamp/1000} />
		    </div>

		 	<h4>by <span className='author'>{author}</span></h4>
		   	<p>{body}</p>

		   	<div>
				<Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${pid}/new/`}>comment ({commentCount})</Link>
			    <Link to={`/${category}/${pid}/edit`}> <button className='edit-button' >edit</button></Link>
		      	<button className='delete-button' onClick={() => this.handleDelete(pid)}>delete</button>
			   	<button className='vote-button' onClick ={() => postDownVotePost(pid)} style={{backgroundColor: 'red'}}>downvote</button>
			   	<button className='vote-button' onClick ={() => postUpVotePost(pid)} style={{backgroundColor: 'green'}}>upvote</button>
			  	<span style={{marginRight: 10, float: 'right'}}>({voteScore})</span>
		  	</div>
	    </div>
	  )
	}
}

function mapStateToProps () {
  return {}
}


function mapDispatchToProps (dispatch) {
  return {
    postUpVotePost: (pid) => dispatch(postUpVotePost(pid)),
    postDownVotePost: (pid) => dispatch(postDownVotePost(pid)),
    postDeletePost: (pid) => dispatch(postDeletePost(pid)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))