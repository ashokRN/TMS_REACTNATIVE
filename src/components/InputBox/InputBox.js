import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Apperance from '../../Tools/Apperance';

const InputBox = ({label, value, onChange, secure,capitalize, borderless, error}) => {

  const style = StyleSheet.create({
    TextInputs: {
      color: '#000',
      width: '100%',
      borderRadius: borderless ? 8 : 0,
      padding: 12,
      paddingLeft: 40,
      letterSpacing:1.5,
      fontSize:12,
      borderWidth:error ? 1: 0,
      borderColor:error ? Apperance.background : null,
      fontWeight:'bold',
      backgroundColor: '#fff',
      elevation: 5,
    }
  });

  return (
    <TextInput
      style={style.TextInputs}
      placeholder={label}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secure}
      autoCapitalize={capitalize}
      placeholderTextColor={Apperance.background}
    />
  );
};

export default InputBox;
