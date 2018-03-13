import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { Route, Link } from 'react-router-dom'



class Navigation extends Component {

	render(){

		const { categories } = this.props 

		return (

				categories.isFetching ? <div>loading...</div> : 
				<ul>
					{categories.items.map(category => (
						<li key={category.name}>
							<Link to={`/${category.path}`}>{category.name}</Link>
						</li>))}
				</ul>

    	)

	}
}

function mapStateToProps ({categories, posts}) {
  return {
    categories: categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);