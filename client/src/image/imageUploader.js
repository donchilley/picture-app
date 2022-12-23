import React, { useRef, useState } from 'react'

function ImageUploader(props) {

    const { triggerUploadPopup, submitImage } = props

    const [image, setImage] = useState("");

    const nameRef = useRef("")
    const imageRef = useRef(null)

    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        var errors = []
        if (!image) {
            errors.push("Please select an image to upload.")
        }
        if (!nameRef.current.value) {
            errors.push("You must provide a name for the image. Ex: Dog")
        }
        if (nameRef.current.value.includes(".")) {
            errors.push("The name must not contain a period. Example Dog.png should just be Dog")
        }
        setErrors(errors)
        if (errors.length === 0) {
            submitImage(image, nameRef.current.value);
            nameRef.current.value = ''
            imageRef.current.value = ''
        }
    }

    function close(e) {
        e.preventDefault()
        triggerUploadPopup(false)
        setErrors([])
    }

    return (

        <div className='uploader-content'>
            <span style={{ padding: "5px", position: "fixed" }}>Upload An Image</span>
            <form className='form' onSubmit={handleSubmit}>
                <div className='file-upload-section'>
                    <input ref={nameRef} name="image_name" id="image_name" type="text" placeholder="Provide Image Name (ex: Dog)"></input>
                    <input ref={imageRef} name="image" id="image" accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                </div>
                {
                    errors.length > 0 && errors.map((error, index) => {
                        return <p key={index} style={{ color: 'red' }}>{error}</p>
                    })
                }
                <div className='button-section'>
                    <button onClick={close}>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ImageUploader