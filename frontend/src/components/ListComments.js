import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchComments, postDownVoteComment, postUpVoteComment } from '../actions'
import Loading from 'react-loading'

function Comment ({ data }){

  const {body, author, timestamp, voteScore, id} = data

  return(
    <div className='comment-box'>
      <div>
        <p style={{fontWeight: 'bold'}}>Comment by <span className='author'>{author}</span></p>
        <p>{body}</p>
      </div>

      <div>
        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/f`}>edit</Link>
        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/g`}>delete</Link>
        <button className='vote-button' onClick ={() => postDownVoteComment(id)} style={{backgroundColor: 'red'}}>downvote</button>
        <button className='vote-button' onClick ={() => postUpVoteComment(id)} style={{backgroundColor: 'green'}}>upvote</button>
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

		const { comments, loadingComments, match } = this.props
    const id = match.params.id

	  return (

	  	loadingComments ? <Loading delay={200} type='spin' color='#222'/> : 
        comments[id] ? Object.keys(comments[id].items).map( 
          commentId => <Comment key={comments[id].items[commentId].id} data={comments[id].items[commentId]}/>) : 
        <div>NIY{console.log('NANANA')}</div>

	    )
	}
}

function mapStateToProps ({comments}) {
  return {
    comments: comments,
    loadingComments: comments.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
    postDownVoteComment: (data) => dispatch(postDownVoteComment(data)),
    postUpVoteComment: (data) => dispatch(postUpVoteComment(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))