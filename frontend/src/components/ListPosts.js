import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Post from './Post'
import Loading from 'react-loading'

function OrderSelector (props) {

	return (
		<div>
		<select value={props.value} name='category' className="order-input" onChange={(event) => props.handleChange(event.target.value)}>
			<option value="" disabled>Sort by...</option>
			<option value="date">date</option>
			<option vlaue="score">score</option>
		</select>
		</div>
	)

}


class ListPosts extends Component {

	state = {
		sortBy: 'date',
	}


	handleChange = (sorting) => {
		this.setState({sortBy: sorting})
	}

	render(){

		const { posts, loadingPosts } = this.props
		const { category, pid } = this.props.match.params
		const { sortBy } = this.state

		let showingPosts

		category ?
			pid ? showingPosts = posts.filter(post => post.id === pid) :
				showingPosts = posts.filter(post => post.category === category) :
			showingPosts = posts

		sortBy === 'date' ?
			showingPosts = showingPosts.sort((a,b)=> b.timestamp - a.timestamp) :
			showingPosts = showingPosts.sort((a,b)=> b.voteScore - a.voteScore)


	  return (



	  	<div>

	  		<OrderSelector handleChange={this.handleChange} value={this.state.sortBy}/>

	  		{loadingPosts ? 
	  			<Loading delay={200} type='spin' color='#222'/> :
	  			showingPosts.length > 0 ?
	  				showingPosts.map(post => <Post key={post.id} data={post}/>):
	  				<div className='not-found'>404 Page not found</div>
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