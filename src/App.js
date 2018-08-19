import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'auto-bind';

import './App.css';
import Navbar from './Navbar/Navbar';
//import Plant from './Plant/Plant';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      togglePhotoVisibility: false,
      largeImageLoaded: false,
      photo: null,
      isLoading: false
    }

    autobind(this);
  }

  getNewRandomPhoto = () => {
    const url = 'https://api.unsplash.com/photos/random'

    const config = {
      headers: {
        Authorization: 'Client-ID 75dd7cf6c6be0d3ad5b0f4636a9a34a8e314c30d182278e2e853137ab4d66580',
        'Accept-Version': 'v1',
        'X-Ratelimit-Remaining': 10
      }
    }

    return axios.get(url, config)
      .then((res, rej) => {
        // success
        console.log('res', res.data)
        const { photo } = this.state

        // store old photo
        if (photo) this.state.oldPhoto = photo

        this.setState({
          photo: res.data,
          tinyImageLoaded: false,
          isLoading: true
        })
      })
      .catch(err => {
        // error
        console.error(err)
      })
      .then(() => {
        // finished
        console.log('done fetching')
      })
  }

  handleLargeImageLoaded() {
    this.setState({
      largeImageLoaded: true,
      isLoading: false
    })
  }

  render() {
    const { photo, largeImageLoaded, isLoading, oldPhoto } = this.state

    const showTinyImageClasses = `${largeImageLoaded ? 'tiny hide': 'tiny show'}`
    const showLargeImageClasses = `${largeImageLoaded ? 'show': 'hide'}`
    const photoWrapperClasses = `${isLoading ? 'photo-wrapper white-overlay' : 'photo-wrapper'}`

    return (
      <div className="App">
      
      <button
          className='moistureButton'
          onClick={() => this.getNewRandomPhoto()}>
          Fetch photo
        </button>

          {this.state.photo && (
            <div className={photoWrapperClasses}>
              <img
                src={photo.urls.thumb}
                alt="biiig random photo from unsplash"
                className={showTinyImageClasses}
                onLoad={this.handleTinyImageLoaded}></img>
              <img
                src={isLoading && oldPhoto ? oldPhoto.urls.full : photo.urls.full}
                alt="smaaaall random photo from unsplash"
                onLoad={this.handleLargeImageLoaded}
                className={showLargeImageClasses}></img>
            </div>
            )
          }
      </div>
    );
  }
}

export default App;
