import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Post from './Post'
import Loading from 'react-loading'


class ListPosts extends Component {

	render(){

		const { posts, loadingPosts, match } = this.props
		const category = match.params.category

	  return (

	  	<div>

	  		{loadingPosts ? 
	  			<Loading delay={200} type='spin' color='#222'/> :
	  			category ?
	  				posts.filter(post => post.category === category).map(post => <Post key={post.id} data={post}/>)	:
	  			posts.map(post => (<Post key={post.id} data={post}/>))
	  		}

	  	</div>
	  	)
	}
}



function mapStateToProps ({posts}) {
  return {
    posts: Object.keys(posts.items).map(key => posts.items[key]),
    loadingPosts: posts.isFetching,
  }
}


export default withRouter(connect(mapStateToProps)(ListPosts))