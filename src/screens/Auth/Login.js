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
import Apperance from '../../Tools/Apperance';

const Login = () => {
  const {StateDispatch} = useContext(GlobalContext);
  const [value, onChangeText] = useState({});
  const [error, setError] = useState({error: '', fileds: []});
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (userId, pass) => {
    let body = {userName: userId, password: pass};
    let response;
    try {
      response = await API.login(body);
      if (response) {
        let response2;
        try {
          response2 = await API.getUser(response.token);
          if (response2) {
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({...response2.User, token: response.token}),
            );
            await StateDispatch({
              type: 'AUTH',
              user: {...response2.User, token: response.token},
            });
            () => navigation.navigate('Home');
          }
        } catch (error) {
          throw error;
        }
        
      } else {
        await setLoading(false);
        await setError({
          error: 'Invalid userId and password',
          fileds: ['username', 'password'],
        });
      }
    } catch (error) {
      throw error;
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
      <View style={{paddingVertical:30}}>
        <Text style={{
          color:'#fff',
          fontFamily:Apperance.fontFamilyBold,
          fontSize:40
        }}>Hyena</Text>
      </View>
      <View style={{marginVertical: 15}}>
        {error.error !== '' && (
          <Text style={{color: Apperance.background, fontSize: 14, letterSpacing: 1.5}}>
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
          <Indicator size={'large'} color={'#fff'} />
        ) : (
          <TouchableOpacity
            onPress={() => onValidateHandler()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Apperance.background,
              width: '100%',
              borderRadius: 8,
              padding: 12,
              borderWidth: 1.5,
              borderColor: '#fff',
              elevation: 5,
            }}>
            <View>
              <Text
                style={{
                  letterSpacing: 1.5,
                  fontSize: 18,
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
    backgroundColor: Apperance.background,
    padding: 10,
  },
});
