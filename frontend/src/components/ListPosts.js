import React from 'react';
import Post from './Post'

export default function ListPosts ({posts, isFetching}) {

	return (
		isFetching ? <p> LOADING... </p> :
		posts.items.map(post => (
			<Post key={post.id} detail={post}/>
			))
    )
}