import React from 'react';
import {View, Text, Dimensions, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Apperance from './../../Tools/Apperance';
import _ from 'lodash';

const DEVICE_WIDTH = Math.floor(Dimensions.get('window').width);
const DEVICE_HEIGHT = Math.floor(Dimensions.get('window').height);

const Module = ({route, navigation}) => {
  const {modules} = route.params;
  const [module, setModule] = React.useState([]);

  const _moduleOrganizer = () => {
    let data = [];
    for (const [key, value] of Object.entries(modules)) {
      let pen = value.filter((f) => f.status === 'PENDING');
      let com = value.filter((f) => f.status === 'COMPLETED');
      let obj = {
        name: key,
        com: com.length,
        pen: pen.length,
        total: value.length,
        tasks: value.filter((f) => f.module.name === key),
      };
      data.push(obj);
    }
    setModule(data);
  };

  React.useEffect(() => _moduleOrganizer(), []);

  const _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.projItem}
      onPress={() => navigation.navigate('Tasks', {tasks: item.tasks})}>
      <View style={{paddingVertical: 20}}>
        <Text style={{...styles.projectName, color: Apperance.background}}>{item.name}</Text>
      </View>
      <View style={styles.countOutterCon}>
        <View style={styles.countInnerCon}>
          <Text style={{...styles.contTxt, fontSize: 11, bottom: 5}}>
            COMPLETED
          </Text>
          <View style={styles.contBadge}>
            <Text style={{...styles.contTxt, color: '#fff'}}>{item.com}</Text>
          </View>
        </View>
        <View style={styles.countInnerCon}>
          <Text style={{...styles.contTxt, fontSize: 11, bottom: 5}}>
            PENDING
          </Text>
          <View style={styles.contBadge}>
            <Text style={{...styles.contTxt, color: '#fff'}}>{item.pen}</Text>
          </View>
        </View>
        <View style={styles.countInnerCon}>
          <Text style={{...styles.contTxt, fontSize: 11, bottom: 5}}>
            TOTAL
          </Text>
          <View style={styles.contBadge}>
            <Text style={{...styles.contTxt, color: '#fff'}}>{item.total}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {module?.length > 0 && (
        <View style={styles.projListCon}>
          <FlatList
            data={module}
            renderItem={_renderItem}
            keyExtractor={(item) => `${item.name}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Module;

const styles = StyleSheet.create({
  projListCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projItem: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    height: 200,
    width: DEVICE_WIDTH - 50,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems:"center",
    elevation: 6,
    borderRadius: 5,
  },
  projectName: {
    fontSize: 20,
    fontFamily: Apperance.fontFamilyBold,
  },
  countOutterCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
  },
  countInnerCon: {
    // width: DEVICE_WIDTH / 4,
    // margin:10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contTxt: {marginVertical: 5, fontFamily: Apperance.fontFamilyBold},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Apperance.background,
  },
  contBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: Apperance.background,
    borderRadius: 20,
  },
});
