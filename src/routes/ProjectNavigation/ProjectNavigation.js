import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Project from '../../screens/Project/Project';
import Module from '../../screens/Project/Module';
import Tasks from '../../screens/Project/Tasks';
import Apperance from '../../Tools/Apperance';
import {View, Image} from 'react-native';
import {GlobalContext} from '../../global/GlobalStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectStack = createStackNavigator();

const ProjectNavigation = () => {
  const {State, StateDispatch} = React.useContext(GlobalContext);
  const {user} = State;

  const _logOut = async () => {
    let response;
    response = await AsyncStorage.removeItem('user');
    if (!response) {
      StateDispatch({type: 'LOGOUT'});
    }
  };
  return (
    <ProjectStack.Navigator
      screenOptions={{
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
      }}>
      <ProjectStack.Screen
        name={'Project'}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{paddingHorizontal: 20}}
              onPress={() => _logOut()}>
              <View>
                <FontAwesome5Icon
                  name={'sign-out-alt'}
                  size={25}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingHorizontal: 20,
                borderRadius: 150 / 2,
              }}>
              <Image
                source={
                  user.gender === 'MALE'
                    ? require('../../assets/images/MALE.png')
                    : require('../../assets/images/FEMALE.png')
                }
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          ),
          headerTitle: 'Hyena',
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
        }}
        component={Project}
      />
      <ProjectStack.Screen name={'Module'} component={Module} />
      <ProjectStack.Screen name={'Tasks'} component={Tasks} />
    </ProjectStack.Navigator>
  );
};

export default ProjectNavigation;
