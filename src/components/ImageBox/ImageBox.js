import React from 'react'
import { View, Text, Image } from 'react-native'

const ImageBox = ({data, width, height}) => {
    return (
        <Image source={data} style={{width: width, height:height}} />
    )
}

export default ImageBox
