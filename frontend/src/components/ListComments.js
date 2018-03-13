import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchComments } from '../actions'

function Comment ({ data }){

  const {body, author, timestamp, voteCount} = data

  return(
    <div style={{
      margin: 20,
      padding: 10,
      borderStyle: 'solid', 
      borderRadius: 3, 
      borderWidth: 1,
      maxWidth: 550,
      borderColor: '#888888',
      backgroundColor: '#f2f2f2',
      }}>
      <p>{author}</p>
      <p>{body}</p>
    </div>
    )
}

class ListComments extends Component {

  componentDidMount() {

    const { fetchComments, match } = this.props
    fetchComments(match.params.id)

  }

	render(){

		const { comments, match } = this.props
    const id = match.params.id

	  return (

	  	comments.isFetching ? 
        <p> loading ...</p> : 
        (comments[id] && comments[id].items.length > 0)
         ? comments[id].items.map(comment => (
          <Comment key={comment.id} data={comment}/>)):
        <p>No comments</p>

	    )
	}
}

function mapStateToProps ({comments}) {
  return {
    comments: comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))