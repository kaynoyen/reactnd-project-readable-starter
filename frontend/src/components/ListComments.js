import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchComments } from '../actions'

function Comment ({ data }){

  const {body, author, timestamp, voteScore, id} = data

  return(
    <div style={{
      margin: 20,
      padding: 10,
      borderStyle: 'solid', 
      borderRadius: 3, 
      borderWidth: 1,
      maxWidth: 500,
      minWidth: 400,
      borderColor: '#888888',
      backgroundColor: '#f2f2f2',
      }}>
      <div>
        <p>{author}</p>
        <p>{body}</p>
      </div>

      <div>
        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/f`}>edit</Link>
        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/g`}>delete</Link>
        <Link style={{marginRight: 10, float: 'right', color: 'red', fontWeight: 'bold'}} to={'/T'}>downvote</Link>
        <Link style={{marginRight: 10, float: 'right', color: 'green', fontWeight: 'bold'}} to={'/D'}>upvote</Link>
        <span style={{marginRight: 10, float: 'right'}}>({voteScore})</span>
      </div>
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