import React from 'react';
import { Route, Link } from 'react-router-dom'

export default function NavBar ({categories, isFetching}) {

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