import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {GlobalContext} from '../../global/GlobalStore';
import Apperance from '../../Tools/Apperance';
const DEVICE_HEIGHT = Math.floor(Dimensions.get('window').height);
const Profile = ({navigation}) => {
  const {State, StateDispatch} = React.useContext(GlobalContext);
  const {user} = State;

  const userData = {
    // userName: user.userName,
    email: user.email,
    gender: user.gender,
    Department: user.Department,
  };

  console.log(user, 'user');

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Apperance.background}}>
      <View
        style={{
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: DEVICE_HEIGHT / 2.3,
        }}>
        <Image
          source={require('../../assets/images/MALE.png')}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <View style={{
            padding:10,
            marginTop:20
        }}>
          <Text style={{
              fontFamily:Apperance.fontFamilyBold,
              fontSize:35,
              color:'#fff'
          }}>{capitalize(user.userName)}</Text>
        </View>
      </View>
      <ScrollView>
        {Object.keys(userData).map((key, i) => (
          <View key={i} style={styles.profileDetailContainer}>
            <Text style={styles.profileDetailHeader}>{capitalize(key)}</Text>
            <Text style={styles.profileDetailText}>
              {user[key]
                ? key === 'userName'
                  ? capitalize(user[key])
                  : user[key]
                : `Set ${key}`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profileDetailContainer: {
    margin: 20,
    fontFamily: 'GoogleSans-Bold',
    padding: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  profileDetailHeader: {
    fontFamily: Apperance.fontFamilyBold,
    fontSize: 16,
    color:Apperance.background
  },
  profileDetailText: {
    fontFamily: Apperance.fontFamilyBold,
    fontSize: 11,
  },
});
