import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'

import { Route, Link } from 'react-router-dom'


function NavBar ({categories, isFetching}) {

  return (
    <ul className="nav-bar">
        {isFetching ? 
            <p> LOADING... </p> : 
              categories.items.map(cat => (
                <Link key= {cat.path} to={cat.path}>
                  <li key={cat.name} >{cat.name}</li>
                </Link>
              ))}
      </ul>
    )
}

function Post ({detail}) {
  const { id, timestamp, title, body, author, category} = detail
  

  return (
    <div>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <p>{body}</p>
      <hr/>
    </div>

  )
}

function ListPosts ({posts, isFetching}) {

  return (
    isFetching ? <p> LOADING... </p> :
    posts.items.map(post => (
      <Post key={post.id} detail={post}/>
      ))
    )
}

class App extends Component {

  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props
    fetchCategories()
    fetchPosts()
  }

  render() {

    const { categories, posts } = this.props
    console.log(posts)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
          
          <NavBar categories={categories} isFetching={categories.isFetching}/>
          <ListPosts posts={posts} isFetching={posts.isFetching}/>
      </div>
    );
  }
}

function mapStateToProps ({categories, posts}) {
  return {
    categories: categories,
    posts: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
