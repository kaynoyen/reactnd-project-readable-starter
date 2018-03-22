import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpdatePost, postDownVoteComment, postUpVoteComment} from '../actions'
import { withRouter, Redirect } from 'react-router'
import Loading from 'react-loading'
import serializeForm from 'form-serialize'

class EditComment extends Component {

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
		const { id, pid, category } = this.props.match.params
		const { comments, postUpVoteComment, postDownVoteComment } = this.props
		const { redirect} = this.state
		console.log(redirect)
	  	return (



	  		redirect ? <Redirect to={`/${category}/${pid}`}/> :
	  			comments[pid] ? 
				    <div className='post-box'>
				    	<form onSubmit={this.handleSubmit}>
				    	{console.log(comments)}
				    	<h3>Edit comment by <span className='author'>{comments[pid].items[id].author}</span></h3>
				    		<div>
				    			<textarea className='textarea-input' name='body' defaultValue={comments[pid].items[id].body} type='text' placeholder='body'/>
				    		</div>
				    		<div style={{marginTop: 10}}>
					    		<button className='submit-button' style={{backgroundColor: 'white'}}>submit</button>
					    		<button type='button' className='vote-button' onClick ={() => postDownVoteComment(id, pid)} style={{backgroundColor: 'red'}}>downvote</button>
						   		<button type='button' className='vote-button' onClick ={() => postUpVoteComment(id, pid)} style={{backgroundColor: 'green'}}>upvote</button>
						   		<span style={{marginRight: 10, float: 'right'}}>({comments[pid].items[id].voteScore})</span>
						   	</div>
				    	</form>
				    </div> :
			    	<Redirect to={`/${category}/${pid}`}/>
			  
	  )
	}
}

function mapStateToProps ({comments}) {
  return {
  	comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postUpVoteComment: (id, pid) => dispatch(postUpVoteComment(id, pid)),
    postDownVoteComment: (id, pid) => dispatch(postDownVoteComment(id, pid)),
    postUpdatePost: (id, json) => dispatch(postUpdatePost(id, json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment))