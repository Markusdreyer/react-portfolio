import React from 'react'
import './ImageContainer.css'

const imageContainer = props => {
	return (
		<div className="image-container">
			<img id="randomImage" alt="from unsplash" src={props.image} />
		</div>
	)
}

export default imageContainer
