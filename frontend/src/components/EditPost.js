import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVotePost, postDownVotePost, postUpdatePost} from '../actions'
import { withRouter, Redirect } from 'react-router'
import Loading from 'react-loading'
import serializeForm from 'form-serialize'

class EditPost extends Component {

	state = {
		redirect: false,
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.props.postUpdatePost(this.props.match.params.pid, values)
		this.setState({redirect: true})
	}

	render(){

		const { pid, category } = this.props.match.params
		const { posts, postUpVotePost, postDownVotePost } = this.props
		const { redirect} = this.state

	  	return (

	  		redirect ? <Redirect to={`/${category}/${pid}`}/> :
	  		Object.keys(posts).length > 0 ? 

			    <div className='post-box'>
			    	<form onSubmit={this.handleSubmit}>
			    	<h3>Edit post by <span className='author'>{posts[pid].author}</span></h3>
			    		<div>
			    			<label className='edit-label'>Title: </label>
			    			<input defaultValue={posts[pid].title} name='title' className='text-input' type='text' placeholder='title' style={{verticalAlign: 'center'}}/>
			    		</div>
			    		<div>
			    			<label className='edit-label'>Body: </label>
			    			<textarea className='textarea-input' name='body' defaultValue={posts[pid].body} type='text' placeholder='body'/>
			    		</div>
			    		<div style={{marginTop: 10}}>
				    		<button className='submit-button' style={{backgroundColor: 'white'}}>submit</button>
				    		<button type='button' className='vote-button' onClick ={() => postDownVotePost(pid)} style={{backgroundColor: 'red'}}>downvote</button>
					   		<button type='button' className='vote-button' onClick ={() => postUpVotePost(pid)} style={{backgroundColor: 'green'}}>upvote</button>
					   		<span style={{marginRight: 10, float: 'right'}}>({posts[pid].voteScore})</span>
					   	</div>
			    	</form>
			    </div> :
	    	<Loading delay={200} type='spin' color='#222'/>
	  )
	}
}

function mapStateToProps ({categories, posts}) {
  return {
  	posts: posts.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postUpVotePost: (pid) => dispatch(postUpVotePost(pid)),
    postDownVotePost: (pid) => dispatch(postDownVotePost(pid)),
    postUpdatePost: (pid, json) => dispatch(postUpdatePost(pid, json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))