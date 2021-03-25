import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageBox from '../../components/ImageBox/ImageBox';
import Indicator from '../../components/Indicator/Indicator';
import InputBox from '../../components/InputBox/InputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../services/API.service';
import {GlobalContext} from '../../global/GlobalStore';
import Tools from '../../Tools/Tools';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = () => {
  const {StateDispatch} = useContext(GlobalContext);
  const [value, onChangeText] = useState({});
  const [error, setError] = useState({error: '', fileds: []});
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (userId, pass) => {
    let hash = await Tools.encrpt(userId, pass);
    if (hash) {
      let response = await API.login(hash);
      if (response.success === true) {
        let user = await API.getUserDetail(response.userid);
        if (user) {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({...response, user}),
          );
          await StateDispatch({
            type: 'AUTH',
            user: {...response, user},
          });
        }
      } else {
        await setLoading(false);
        await setError({
          error: 'Invalid userId and password',
          fileds: ['username', 'password'],
        });
      }
    }
  };
  const onValidateHandler = async () => {
    if (Object.keys(value).length === 0) {
      await setLoading(false);
      await setError({
        error: 'Please enter userId and password',
        fileds: ['username', 'password'],
      });
    } else if (value.id == null || value.id == '') {
      await setLoading(false);
      await setError({error: 'Please enter userId', fileds: ['username']});
    } else if (value.password == null || value.password == '') {
      await setLoading(false);
      await setError({error: 'Please enter password', fileds: ['password']});
    } else {
      await setError({error: '', fileds: []});
      await setLoading(true);
      await onSubmitHandler(value.id, value.password);
    }
  };

  return (
    <View style={style.loginContainer}>
      <View style={{marginVertical: 10}}>
        <ImageBox
          data={require('../../assets/logo.png')}
          width={220}
          height={200}
        />
      </View>
      <View style={{marginVertical: 15}}>
        {error.error !== '' && (
          <Text style={{color: '#be62f1', fontSize: 14, letterSpacing: 1.5}}>
            {error.error}
          </Text>
        )}
      </View>
      <View style={{width: 320}}>
        <InputBox
          label={'USER ID'}
          borderless={true}
          capitalize={'none'}
          onChange={(text) => onChangeText({...value, id: text})}
          error={error.fileds.includes('username') ? true : false}
        />
      </View>
      <View style={{width: 320, top: 20}}>
        <InputBox
          label={'PASSWORD'}
          borderless={true}
          secure={true}
          capitalize={'none'}
          onChange={(text) => onChangeText({...value, password: text})}
          error={error.fileds.includes('password') ? true : false}
        />
      </View>
      <View style={{width: 320, top: 45}}>
        {loading ? (
          <Indicator size={'large'} color={'#be62f1'} />
        ) : (
          <TouchableOpacity
            onPress={() => onValidateHandler()}
            style={{
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: '#be62f1',
              width: '100%',
              borderRadius: 30,
              padding: 12,
              borderWidth: 0.8,
              borderColor: '#be62f1',
              elevation: 5,
            }}>
            <View>
              <Text
                style={{
                  letterSpacing: 1.5,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
