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

		console.log(posts)

	  	return (

	  		Object.keys(posts).length > 0 ? 

			    <div className='postBox'>
			    	<form>

			    		<label>title<input defaultValue={posts[id].title} className='text-input' type='text' placeholder='title'/></label><br/>
			    		<label>author<input defaultValue={posts[id].author} className='text-input' type='text' placeholder='author'/></label><br/>
			    		<label>body<input defaultValue={posts[id].body} className='text-input' type='text' placeholder='body'/></label>
			    	</form>
			    	<div>
			    		<button className='submit-button' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'white'}}>submit</button>
			    		<button className='vote-button' onClick ={() => postDownVotePost(id)} style={{backgroundColor: 'red'}}>downvote</button>
				   		<button className='vote-button' onClick ={() => postUpVotePost(id)} style={{backgroundColor: 'green'}}>upvote</button>
				   		<span style={{marginRight: 10, float: 'right'}}>({posts[id].voteScore})</span>
			    	</div>
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