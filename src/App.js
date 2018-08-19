import React, { Component } from 'react';
import axios from 'axios';
import LazyLoad from 'react-image-lazy-load';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      photo: null
    }

    this.getNewRandomPhoto = this.getNewRandomPhoto.bind(this)
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

        this.setState({
          photo: res.data
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

  render() {
    const { photo } = this.state

    return (
      <div className="App">
      <button
          className='moistureButton'
          onClick={() => this.getNewRandomPhoto()}>
          Fetch photo
        </button>

          {this.state.photo && (
            <LazyLoad
              height={1000}
              loaderImage
              originalSrc={photo.urls.full}
              imageProps={{
                src: photo.urls.thumb,
                alt: "DR_MVMQ20Feb2015ouellet1024.jpg",
                ref: "image"
              }} />
            )
          }
      </div>
    );
  }
}

export default App;
