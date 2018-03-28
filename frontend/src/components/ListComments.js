import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchComments, postDownVoteComment, postUpVoteComment, postDeleteComment } from '../actions'
import Loading from 'react-loading'
import Timestamp from 'react-timestamp'

function Comment ({ data, postDownVoteComment, postUpVoteComment, postDeleteComment, category }){

  const {body, author, timestamp, voteScore, id, parentId} = data

  const cid = id
  const pid = parentId


  return(
    <div className='comment-box'>
      <div>
        <h3 className='post-title'>Comment by <span className='author'>{author}</span></h3>
        <br/>
        <Timestamp className='time-stamp' time={timestamp/1000} />
        <p style={{marginTop: 5, marginBottom: 5, fontSize: 14}}>{body}</p>
      </div>
      <div>

        <Link to={`/${category}/${pid}/${cid}/edit`}> <button className='edit-button' >edit</button></Link>
        <button className='delete-button' onClick={() => postDeleteComment(cid, pid)}>delete</button>
        <button className='vote-button' onClick ={() => postDownVoteComment(cid, pid)} style={{backgroundColor: 'red'}}>downvote</button>
        <button className='vote-button' onClick ={() => postUpVoteComment(cid, pid)} style={{backgroundColor: 'green'}}>upvote</button>
        <span style={{marginRight: 10, float: 'right'}}>({voteScore})</span>
      </div>
    </div>
    )
}

class ListComments extends Component {

  componentDidMount() {

    const { fetchComments, match, comments } = this.props
    comments[match.params.pid] ? null : fetchComments(match.params.pid)

  }

	render(){

		const { comments, match, postUpVoteComment, postDownVoteComment, postDeleteComment } = this.props
    const pid = match.params.pid
    const loadingComments = comments.isFetching

	  return (

	  	loadingComments ? <Loading delay={2000} type='spin' color='#222'/> : 
        comments[pid] && Object.keys(comments[pid].items).length > 0 ? Object.keys(comments[pid].items).map( 
          comment => <Comment 
            key={comments[pid].items[comment].id} 
            data={comments[pid].items[comment]}
            postUpVoteComment={postUpVoteComment}
            postDownVoteComment={postDownVoteComment} 
            postDeleteComment={postDeleteComment}
            category={match.params.category}
            />) : 
        <div></div>

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
    fetchComments: (pid) => dispatch(fetchComments(pid)),
    postDownVoteComment: (cid, pid) => dispatch(postDownVoteComment(cid, pid)),
    postUpVoteComment: (cid, pid) => dispatch(postUpVoteComment(cid, pid)),
    postDeleteComment: (cid, pid) => dispatch(postDeleteComment(cid, pid))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))