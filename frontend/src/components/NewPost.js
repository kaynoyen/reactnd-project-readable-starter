import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postCreatePost} from '../actions'
import { withRouter, Redirect } from 'react-router'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'

class NewPost extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.props.postCreatePost({
			title: 'No title',
			author: 'No author',
			body: 'Nothing',
			...values,
			id: uuidv4(),
			timestamp: Date.now(),
			voteScore: 0,
			commentCount: 0,
			deleted: false,
		})
		this.setState({redirect: true})
	}

	state = {
		redirect: false,
	}

	render(){

		const { categories } = this.props
		const { redirect } = this.state

	  	return (
	  		redirect ? <Redirect to={"/"}/> :
			    <div className='post-box'>
			    	<form onSubmit={this.handleSubmit}>
			    	<h3>Create new post</h3>

			    		<div>
			    			<label className='edit-label'>Title: </label>
			    			<input name='title' className='text-input' type='text' style={{verticalAlign: 'center'}}/>
			    		</div>

			    		<div>
			    			<label className='edit-label'>Category: </label>
				    		<select name='category' className="select-input">
	                  			<option value="" disabled>Choose category</option>
	                  			{categories.items.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
	                      	</select>
                      	</div>

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

function mapStateToProps ({categories}) {
  return {
  	categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postCreatePost: (json) => dispatch(postCreatePost(json)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))