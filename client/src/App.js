import './App.css';
import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import Image from './image/image';
import ImageUploader from './image/imageUploader';

const ENDPOINT = "http://localhost:3009"

function App() {
  const searchRef = useRef(null)

  const [images, setImages] = useState([])
  const [displayedImages, setDisplayedImages] = useState([{}, {}, {}, {}, {}]);

  const [displayUploader, setDisplayUploader] = useState(false);
  const setUploadDisplay = (value) => {
    setDisplayUploader(value);
  }

  useEffect(() => {
    axios.get(`${ENDPOINT}/images`, {})
      .then(function (msg) {
        console.log("received images")
        if (msg.data.images) {
          setImages(msg.data.images)
        }
      })
  }, [])

  function submitImage(image, name) {
    console.log("img")
    console.log(image)
    axios.post(`${ENDPOINT}/image`, image, { headers: { 'content-type': 'image/jpeg' } }
    )
      .then(function (msg) {
        console.log(msg)
      })
  }

  return (
    <div className="picture-app">
      <div className="header">
        <div className="search-section">
          <input disabled={displayUploader} type="text" ref={searchRef} className="search-bar" placeholder="Search Images..."></input>
        </div>
        <div className="upload-section">
          <button disabled={displayUploader} onClick={() => { setUploadDisplay(true) }}>Upload</button>
        </div>
      </div>
      <div className='image-count'>
        <div className='buffer'></div>
        <div>{displayedImages.length} Images</div>
      </div>

      <div className='content'>

        {
          displayedImages.map((data, index) => {
            return <Image key={index} data={data}></Image>
          })
        }
      </div>
      <ImageUploader show={displayUploader} setUploadDisplay={setUploadDisplay} submitImage={submitImage} />
    </div>
  );
}

export default App;
