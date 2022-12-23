import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from './image/image';
import ImageUploader from './image/imageUploader';

const ENDPOINT = "http://localhost:3009"

function App() {

  const [images, setImages] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [displayedImages, setDisplayedImages] = useState([]);

  const search = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setDisplayedImages(images.filter(image => image.name.startsWith(inputValue)))
  }, [inputValue, images])

  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const triggerUploadPopup = (value) => {
    setShowUploadPopup(value);
  }

  useEffect(() => {
    axios.get(`${ENDPOINT}/images`, {})
      .then(function (msg) {
        const directory = JSON.parse(msg.data)
        setImages(directory)
      })
  }, [])

  function submitImage(image, name) {
    var form = new FormData();
    form.append("name", name)
    form.append("image", image);
    axios.post(`${ENDPOINT}/image_form`, form, { headers: { 'content-type': 'multipart/form-data' } })
      .then(function (msg) {
        const directory = JSON.parse(msg.data)
        setImages(directory)
        setShowUploadPopup(false)
      })
      .catch(function (msg) {
        console.log(msg)
      })
  }

  return (
    <div className="picture-app">
      <div className="header">
        <div className="search-section">
          <input disabled={showUploadPopup} type="text" className="search-bar" placeholder="Search Images..." onChange={(e) => search(e)}></input>
        </div>
        <div className="upload-section">
          <button disabled={showUploadPopup} onClick={() => { triggerUploadPopup(true) }}>Upload</button>
        </div>
      </div>
      <div className={showUploadPopup ? 'image-count dampened' : 'image-count'}>
        <div className='buffer'></div>
        <div>{images.length} Images</div>
      </div>
      <div className='content'>
        {
          (displayedImages.length > 0) && displayedImages.map((data, index) => {
            return <Image key={index} data={data}></Image>
          })
        }
      </div>
      <div className={showUploadPopup ? 'image-uploader' : 'hide'}>
        <ImageUploader triggerUploadPopup={triggerUploadPopup} submitImage={submitImage} />
      </div>
    </div>
  );
}

export default App;
