import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import {GlobalContext} from '../global/GlobalStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeNavigation from './HomeNavigation/HomeNavigation';
import API from '../services/API.service';

const Stack = createStackNavigator();

const Navigator = ({navigation}) => {
  const {State, StateDispatch} = useContext(GlobalContext);
  const {Auth} = State;
  const swtId = true;

  React.useEffect(() => {
    fetchData();
  }, [swtId]);

  const fetchData = async () => {
    let value;
    try {
      value = await AsyncStorage.getItem('user');
      if (value) {
        let userData = JSON.parse(value);
        let user = await API.getUserDetail(userData.userid);
        if (user) {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({...userData, user}),
          );
          await StateDispatch({type: 'AUTH', user: {...userData, user}});
          () => navigation.navigate('Home');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <NavigationContainer>
      {Auth ? (
        <Stack.Navigator>
          <Stack.Screen
            name={'HomeNav'}
            component={HomeNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
