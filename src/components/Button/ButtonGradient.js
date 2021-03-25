import React from 'react';
import { Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const ButtonGradient = ({click, label, size, colors,x,y}) => {
  const style = StyleSheet.create({
    touch: {
        // borderWidth:1,
        alignItems:'center'
    //   width: size.width,
    //   height: size.height,
    },
    linerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      padding: 12,
      width:150
    //   width: size.width,
    //   height: size.height,
    },
    text: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 20,
      letterSpacing: 1.5,
    },
  });
  return (
    <TouchableOpacity onPress={click} style={style.touch}>
      <LinearGradient
        colors={colors}
        start={{x: x || 0, y: y ||0}}
        style={style.linerContainer}>
        <Text style={style.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonGradient;
