import React, { useRef, useState } from 'react'

function ImageUploader(props) {

    const { show, setUploadDisplay, submitImage } = props

    const [image, setImage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        submitImage(image)
    }

    return (
        <div className={show ? 'image-uploader' : 'hide'}>
            <div className='uploader-content'>
                <span style={{ padding: "5px", position: "fixed" }}>Upload An Image</span>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='file-upload-section'>
                        <input name="image" id="image" accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    </div>
                    <div className='button-section'>
                        <button onClick={() => setUploadDisplay(false)}>Cancel</button>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default ImageUploader