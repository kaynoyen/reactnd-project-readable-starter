import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postCreateComment } from '../actions'
import { withRouter, Redirect } from 'react-router'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'

class NewComment extends Component {

	state = {
		redirect: false,
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.props.postCreateComment(this.props.match.params.pid, {

			author: 'No author',
			body: 'Nothing',
			...values,
			id: uuidv4(),
			timestamp: Date.now(),
			voteScore: 0,
			parentId: this.props.match.params.pid,
			deleted: false,
			parentDeleted: false,
		})
		this.setState({redirect: true})
	}


	render(){
		const { pid, category } = this.props.match.params
		const { redirect } = this.state

	  	return (

	  		redirect ? <Redirect to={`/${category}/${pid}`}/> :

		    <div className='post-box'>
		    	<form onSubmit={this.handleSubmit}>
		    	<h3>New comment</h3>
		    		<div>
	    			<label className='edit-label'>Author: </label>
	    			<input name='author' className='text-input' type='text' style={{verticalAlign: 'center'}}/>
	    		</div>

	    		<div>
	    			<label className='edit-label'>Body: </label>
	    			<textarea className='textarea-input' name='body' type='text'/>
	    		</div>
		    		<div style={{marginTop: 10}}>
			    		<button className='submit-button' style={{backgroundColor: 'white'}}>submit</button>
			    
				   	</div>
		    	</form>
		    </div>
			  
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
   	postCreateComment: (pid, json) => dispatch(postCreateComment(pid, json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment))