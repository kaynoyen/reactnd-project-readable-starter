import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUpdateComment, postDownVoteComment, postUpVoteComment} from '../actions'
import { withRouter, Redirect } from 'react-router'
import serializeForm from 'form-serialize'

class EditComment extends Component {

	state = {
		redirect: false,
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.props.postUpdateComment(this.props.match.params.cid, this.props.match.params.pid, values)
		this.setState({redirect: true})
	}

	render(){
		const { cid, pid, category } = this.props.match.params
		const { comments, postUpVoteComment, postDownVoteComment } = this.props
		const { redirect} = this.state

	  	return (

	  		redirect ? <Redirect to={`/${category}/${pid}`}/> :
	  			comments[pid] ? 
				    <div className='post-box'>
				    	<form onSubmit={this.handleSubmit}>
				    	<h3>Edit comment by <span className='author'>{comments[pid].items[cid].author}</span></h3>
				    		<div>
				    			<textarea className='textarea-input' name='body' defaultValue={comments[pid].items[cid].body} type='text' placeholder='body'/>
				    		</div>
				    		<div style={{marginTop: 10}}>
					    		<button className='submit-button' style={{backgroundColor: 'white'}}>submit</button>
					    		<button type='button' className='vote-button' onClick ={() => postDownVoteComment(cid, pid)} style={{backgroundColor: 'red'}}>downvote</button>
						   		<button type='button' className='vote-button' onClick ={() => postUpVoteComment(cid, pid)} style={{backgroundColor: 'green'}}>upvote</button>
						   		<span style={{marginRight: 10, float: 'right'}}>({comments[pid].items[cid].voteScore})</span>
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
    postUpVoteComment: (cid, pid) => dispatch(postUpVoteComment(cid, pid)),
    postDownVoteComment: (cid, pid) => dispatch(postDownVoteComment(cid, pid)),
    postUpdateComment: (cid, pid, json) => dispatch(postUpdateComment(cid, pid, json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment))