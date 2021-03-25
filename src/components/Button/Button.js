import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({click, value, borderless, color, border, shadow, TextColor}) => {
  const style = StyleSheet.create({
    touchContainer: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius: borderless ? 30 : 0,
        padding:12,
        borderWidth:border? 1 : 0,
        elevation: shadow ? 5 : 0,
        height:50,
        backgroundColor: color ? color :'#2780E3',
        
    },
    textColor:{
        color:TextColor? TextColor : '#ffffff',
        fontWeight:'bold',
        letterSpacing:1.5
    }
  });
  return (
    <TouchableOpacity onPress={click} style={style.touchContainer}>
      <Text style={style.textColor}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Button;
