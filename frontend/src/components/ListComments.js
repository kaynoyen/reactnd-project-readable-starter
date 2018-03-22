import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchComments, postDownVoteComment, postUpVoteComment } from '../actions'
import Loading from 'react-loading'
import Timestamp from 'react-timestamp'

function Comment ({ data, postDownVoteComment, postUpVoteComment, category }){

  const {body, author, timestamp, voteScore, id, parentId} = data

  return(
    <div className='comment-box'>
      <div>
        <h3 className='post-title'>Comment by <span className='author'>{author}</span></h3>
        <Timestamp className='time-stamp' time={timestamp/1000} />
        <p style={{marginTop: 5, marginBottom: 5, fontSize: 14}}>{body}</p>
      </div>
      <div>

        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/${category}/${parentId}/${id}/edit`}>edit</Link>
        <Link style={{marginRight: 10, fontWeight: 'bold'}} to={`/g`}>delete</Link>
        <button className='vote-button' onClick ={() => postDownVoteComment(id, parentId)} style={{backgroundColor: 'red'}}>downvote</button>
        <button className='vote-button' onClick ={() => postUpVoteComment(id, parentId)} style={{backgroundColor: 'green'}}>upvote</button>
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

		const { comments, loadingComments, match, postUpVoteComment, postDownVoteComment } = this.props
    const id = match.params.id

	  return (

	  	loadingComments ? <Loading delay={200} type='spin' color='#222'/> : 
        comments[id] ? Object.keys(comments[id].items).map( 
          commentId => <Comment 
            key={comments[id].items[commentId].id} 
            data={comments[id].items[commentId]}
            postUpVoteComment={postUpVoteComment}
            postDownVoteComment={postDownVoteComment}
            category={match.params.category}
            />) : 
        <div>No comments</div>

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
    postDownVoteComment: (id, pid) => dispatch(postDownVoteComment(id, pid)),
    postUpVoteComment: (id, pid) => dispatch(postUpVoteComment(id, pid))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))