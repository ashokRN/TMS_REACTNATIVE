import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View, Image} from 'react-native';
import Apperance from '../../Tools/Apperance';
import UserNavigation from '../UserNavigation/UserNavigation'

const HomeStack = createStackNavigator();


const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown:false
      }}
      initialRouteName={'Home'}>
      <HomeStack.Screen
        name={'Home'}
        component={UserNavigation}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigation;

const style = StyleSheet.create({
  headerTitleContainer: {
    top: 0,
    left: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerManiText: {
    fontSize: 16,
    color: '#006600',
    fontWeight: 'bold',
  },
  headerSmallText: {
    fontSize: 14,
    color: '#006600',
    fontFamily: Apperance.fontFamily,
  },
});
