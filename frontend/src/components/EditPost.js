import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpVotePost, postDownVotePost} from '../actions'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Loading from 'react-loading'

class EditPost extends Component {

	render(){

		const { category, id } = this.props.match.params
		const { posts } = this.props
		const { postUpVotePost, postDownVotePost } = this.props
		
	  	return (

	  		Object.keys(posts).length > 0 ? 

			    <div className='postBox'>
			    	<form>
			    	<h3>Edit post</h3>
			    		<div>
			    			<label className='edit-label'>Title: </label>
			    			<input defaultValue={posts[id].title} className='text-input' type='text' placeholder='title' style={{verticalAlign: 'center'}}/>
			    		</div>
			    		<div>
			    			<label className='edit-label'>Author: </label>
			    			<input defaultValue={posts[id].author} className='text-input' type='text' placeholder='author' style={{verticalAlign: 'center'}}/>
			    		</div>
			    		<div>
			    			<label className='edit-label'>Body: </label>
			    			<textarea className='textarea-input' defaultValue={posts[id].body} type='text' placeholder='body'/>
			    		</div>
			    		<div style={{marginTop: 10}}>
				    		<button className='submit-button' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'white'}}>submit</button>
				    	
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))