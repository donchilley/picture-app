import React from 'react'

function Image(props) {

    const { data } = props;
    return (
        <div className='image'>
            <img src={data.path} alt={data.name} title={data.name}></img>
        </div>
    )
}

export default Image;