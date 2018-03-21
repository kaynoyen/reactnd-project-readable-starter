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
		this.props.postUpdatePost(this.props.match.params.id, values)
		this.setState({redirect: true})
	}



	render(){

		const { id, category } = this.props.match.params
		const { posts } = this.props
		const { postUpVotePost, postDownVotePost } = this.props
		const { redirect} = this.state

	  	return (

	  		redirect ? <Redirect to={`/${category}/${id}`}/> :
	  		Object.keys(posts).length > 0 ? 

			    <div className='post-box'>
			    	<form onSubmit={this.handleSubmit}>
			    	<h3>Edit post by <span className='author'>{posts[id].author}</span></h3>
			    		<div>
			    			<label className='edit-label'>Title: </label>
			    			<input defaultValue={posts[id].title} name='title' className='text-input' type='text' placeholder='title' style={{verticalAlign: 'center'}}/>
			    		</div>
			    		<div>
			    			<label className='edit-label'>Body: </label>
			    			<textarea className='textarea-input' name='body' defaultValue={posts[id].body} type='text' placeholder='body'/>
			    		</div>
			    		<div style={{marginTop: 10}}>
				    		<button className='submit-button' style={{backgroundColor: 'white'}}>submit</button>
				    		<button type='button' className='vote-button' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'red'}}>downvote</button>
					   		<button type='button' className='vote-button' onClick ={() => postUpVotePost(id)} style={{backgroundColor: 'green'}}>upvote</button>
					   		<span style={{marginRight: 10, float: 'right'}}>({posts[id].voteScore})</span>
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
    postUpVotePost: (data) => dispatch(postUpVotePost(data)),
    postDownVotePost: (data) => dispatch(postDownVotePost(data)),
    postUpdatePost: (id, json) => dispatch(postUpdatePost(id, json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))