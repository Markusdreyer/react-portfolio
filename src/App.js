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
      tinyImageLoaded: false,
      photos: []
    }

    autobind(this);
  }

  getMoisture = () => {
    const url = `https://api.unsplash.com/search/photos?query=computer`

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
        console.log('res', res.data.results)
        this.setState({ photos: res.data.results })
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

  shouldDisplayPhotos() {
    const { togglePhotoVisibility, photos } = this.state
    return togglePhotoVisibility && photos.length
  }

  handleTinyImageLoaded(event) {
    this.setState({ tinyImageLoaded: true })
  }

  render() {
    const { photos, togglePhotoVisibility, tinyImageLoaded } = this.state

    const showTinyImageClasses = `${tinyImageLoaded ? 'tiny hide': 'tiny show'}`
    const showLargeImageClasses = `${tinyImageLoaded ? 'show': 'hide'}`

    return (
      <div className="App">
      
      <button
          className='moistureButton'
          onClick={() => this.getMoisture()}>
          Fetch photo
        </button>

        <button
          className='moistureButton'
          onClick={() => this.setState({ togglePhotoVisibility: !togglePhotoVisibility })}>
          Show photo
        </button>

          {this.shouldDisplayPhotos() && (
            <div class="photos-wrapper">
              <img
                src={photos[0].urls.thumb}
                alt="biiig random photo from unsplash"
                class={showTinyImageClasses}></img>
              <img
                src={photos[0].urls.raw}
                alt="smaaaall random photo from unsplash"
                onLoad={this.handleTinyImageLoaded}
                class={showLargeImageClasses}></img>
            </div>
            )
          }
      </div>
    );
  }
}

export default App;
