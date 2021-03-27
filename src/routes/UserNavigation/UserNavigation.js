import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/Profile/Profile';
import Tool from '../../screens/Tool/Tool';
import Apperance from '../../Tools/Apperance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProjectNavigation from '../ProjectNavigation/ProjectNavigation';
import {createStackNavigator} from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff',
    fontFamily: Apperance.fontFamilyBold,
    fontSize: 25,
  },
  headerStyle: {
    height: 100,
    backgroundColor: Apperance.background,
    elevation: 0,
  },
  headerTintColor: '#fff',
};

const ProfileScreen = () => (
  <ProfileStack.Navigator screenOptions={screenOptions}>
    <ProfileStack.Screen name={'Profile'} component={Profile} />
  </ProfileStack.Navigator>
);

const ToolStack = createStackNavigator();

const ToolScreen = () => (
  <ToolStack.Navigator screenOptions={screenOptions}>
    <ToolStack.Screen name={'Tools'} component={Tool} />
  </ToolStack.Navigator>
);

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Project"
      tabBarOptions={{
        tabStyle: {
          backgroundColor: Apperance.background,
        },

        showLabel: false,
        activeTintColor: '#fff',
        style: {
          borderWidth: 0,
          borderTopColor: Apperance.background,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const icons = {
            Tool: 'tools',
            Project: 'project-diagram',
            Profile: 'id-badge',
          };
          return (
            <FontAwesome5 name={icons[route.name]} color={color} size={20} />
          );
        },
      })}>
      <Tab.Screen name={'Tool'} component={ToolScreen} />
      <Tab.Screen name={'Project'} component={ProjectNavigation} />
      <Tab.Screen name={'Profile'} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserNavigation;
