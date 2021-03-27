import React from 'react';
import {View, Text, Dimensions, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Apperance from '../../Tools/Apperance';

const DEVICE_WIDTH = Math.floor(Dimensions.get('window').width);
const DEVICE_HEIGHT = Math.floor(Dimensions.get('window').height);

const Tasks = ({route}) => {
  const {tasks} = route.params;

  const _colorfixer = (val) => {
    let color;
    switch (val) {
      case 'PENDING':
        color = 'red';
        break;
      case 'IN PROGRESS':
        color = '#ffa500';
        break;
      case 'COMPLETED':
        color = 'green';
        break;

      default:
        break;
    }
    return color;
  };

  const _renderItem = ({item}) => (
    <View style={styles.taskItemCon}>
      <View style={styles.topCon}>
        <View style={styles.centerAlign}>
          <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>
            {item.name}
          </Text>
        </View>
        <View style={styles.centerAlign}>
          <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>
            {"23-04-2021"}
          </Text>
        </View>
      </View>
      <View style={styles.centerCon}>
        <View>
          <Text style={{fontSize: 12, fontFamily: Apperance.fontFamilyBold}}>
            {item.Description}
          </Text>
        </View>
      </View>
      <View style={styles.bottomCon}>
        <View style={styles.centerAlign}>
          <Text style={styles.text}>23-04-2021</Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.statsBtn,
            backgroundColor: _colorfixer(item.status),
          }}>
          <View style={styles.centerAlign}>
            <Text style={{...styles.text, color: '#fff'}}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {tasks?.length > 0 && (
        <FlatList
          data={tasks}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.name}`}
        />
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  taskItemCon: {
    backgroundColor: '#fff',
    width: DEVICE_WIDTH - 50,
    margin: 10,
    borderRadius: 5,
    margin: 20,
    padding: 1,
  },
  topCon: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: Apperance.background,
    borderRadius: 5,
  },
  centerCon: {padding: 20, backgroundColor: '#fff'},
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCon: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsBtn: {
    width: 100,
    padding: 5,
    borderRadius: 5,
  },
  text: {fontFamily: Apperance.fontFamilyBold, fontSize: 10},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Apperance.background,
  },
});
