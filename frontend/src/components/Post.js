import React from 'react';

export default function Post ({detail}) {
	const { id, timestamp, title, body, author, category} = detail
	

	return (

		<div className="create-post-box">
	      	<div>
				<form>
					<div>
	      				<select className="select-input">
	      					<option value="" disabled>Choose category</option>	
	                      	<option value="volvo">{category}</option>
	                      	<option value="saab">Saab</option>
	                      	<option value="mercedes">Mercedes</option>
	                      	<option value="audi">Audi</option>
	                    </select>
						<input className="text-input" type="text" name='title' placeholder='Title' defaultValue={title}/>
						<input className="text-input" type="text" name='author' placeholder='Email' defaultValue={author}/>
	      				
	      				<textarea 
	      					className="text-input" 
	      					type="text" 
	      					name='post' 
	      					placeholder="Post" 
	      					cols="30" 
	      					rows="5"
	      					defaultValue={body}
	      					readOnly/>
	      			</div>
	      			<div>
	      				<button className="submit-button">Edit</button>

	      					<button className="back-button">Delete</button>
	
					</div>
				</form>	
			</div>
	      </div>

    )
}