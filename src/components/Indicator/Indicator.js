import React from 'react'
import { ActivityIndicator} from 'react-native'


const Indicator = ({size, color}) => {
    return (
        <ActivityIndicator size={size} color={color} />
    )
}

export default Indicator
