import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, View, Image} from 'react-native';
import Apperance from '../../Tools/Apperance';

const HomeStack = createStackNavigator();

const HeaderLeft = () => (
  <Image
    source={require('../../assets/pwdlogo.png')}
    style={{width: 60, height: 60, marginHorizontal: 20}}
  />
);
const HeaderRight = () => (
  <FontAwesome5Icon
    onPress={() => logOut()}
    style={{marginRight: 30}}
    name={'filter'}
    size={20}
    color={'#006600'}
  />
);
const HeaderTitle = () => {
  return (
    <View style={style.headerTitleContainer}>
      <Text style={style.headerManiText}>
        {'Public Work Department'.toUpperCase()}
      </Text>
      <Text style={style.headerSmallText}>( Tamil Nadu )</Text>
    </View>
  );
};
const HomeNavigation = () => {
  const screenOptions = {
    headerStyle: {
      // backgroundColor: Apperance.background,
      backgroundColor: '#FFFFFF',
      height: 80,
      // elevation: 0,
    },
    headerRight: () => <HeaderRight />,
    headerTitle: () => <HeaderTitle />,
    headerLeft: () => <HeaderLeft />,
  };

  return (
    <HomeStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={'Home'}>
      <HomeStack.Screen
        name={'Home'}
        component={() => (
          <View>
            <Text>Hello</Text>
          </View>
        )}
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
