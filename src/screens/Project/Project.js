import React from 'react';
import {View, Text, Dimensions, FlatList, StyleSheet} from 'react-native';
import {GlobalContext} from '../../global/GlobalStore';
import API from '../../services/API.service';
import Apperance from './../../Tools/Apperance';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DEVICE_WIDTH = Math.floor(Dimensions.get('window').width);
const DEVICE_HEIGHT = Math.floor(Dimensions.get('window').height);

const Project = ({navigation}) => {
  const {State} = React.useContext(GlobalContext);
  const {user} = State;
  const [project, setProjects] = React.useState([]);

  const _projectOrganizer = (tasks) => {
    let data = [];
    for (const [key, value] of Object.entries(tasks)) {
      let pen = value.filter((f) => f.status === 'PENDING');
      let com = value.filter((f) => f.status === 'COMPLETED');
      let obj = {
        name: key,
        des: value[0].Project.description,
        com: com.length,
        pen: pen.length,
        total: value.length,
        modules: _.groupBy(value, 'module.name'),
      };
      data.push(obj);
    }
    setProjects(data);
  };
  const _getTasks = async () => {
    let response;
    try {
      response = await API.getAllTasks(user._id, user.token);
      if (response) {
        let tasks = _.groupBy(response.Tasks, 'Project.Name');
        _projectOrganizer(tasks);
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    _getTasks();
  }, []);

  const _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.projItem}
      onPress={() => navigation.navigate('Module', {modules: item.modules})}>
      <View style={{paddingVertical: 20}}>
        <Text style={{...styles.projectName, color: Apperance.background}}>
          {item.name}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontFamily: Apperance.fontFamilyBold,
            fontSize: 12,
          }}>
          {item.des}
        </Text>
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
      {project?.length > 0 && (
        <View style={styles.projListCon}>
          <FlatList
            data={project}
            renderItem={_renderItem}
            keyExtractor={(item) => `${item.name}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Project;

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
