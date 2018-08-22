import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import ImageContainer from '../components/ImageContainer/ImageContainer'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			photo: null,
			inputValue: ''
		}

		this.getNewRandomPhoto = this.getNewRandomPhoto.bind(this)
	}

	getNewRandomPhoto = inputValue => {
		const url = 'https://api.unsplash.com/photos/random?h=600&w=600&'
		const customUrl = url + '&query=' + this.state.inputValue
		const config = {
			headers: {
				Authorization: 'Client-ID 75dd7cf6c6be0d3ad5b0f4636a9a34a8e314c30d182278e2e853137ab4d66580',
				'Accept-Version': 'v1',
				'X-Ratelimit-Remaining': 10
			}
		}
		console.log(customUrl)
		return axios
			.get(customUrl, config)
			.then((res, rej) => {
				// success
				console.log('res', res.data)

				this.setState({
					photo: res.data
				})
			})
			.catch(err => {})
			.then(() => {})
	}

	inputChangeHandler = event => {
		this.setState({
			inputValue: event.target.value
		})
	}

	render() {
		const { photo } = this.state

		return (
			<div className="App">
				<Navbar />

				{!this.state.photo && (
					<div className="photo-selector">
						<p>Type a category of photos you'd like. E.g. Cars, planes, animals..</p>
						<input placeholder="Category" onChange={this.inputChangeHandler} />
					</div>
				)}
				<button className="fetchButton" onClick={() => this.getNewRandomPhoto(this.inputValue)}>
					Fetch photo
				</button>
				{this.state.photo && (
					<div className="image-container">
						<ImageContainer image={photo.urls.custom} />
					</div>
				)}
			</div>
		)
	}
}

export default App
