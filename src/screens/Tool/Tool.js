import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GlobalContext} from '../../global/GlobalStore';
import {getAllTools} from '../../services/API.service';
import Apperance from '../../Tools/Apperance';

const DEVICE_WIDTH = Math.floor(Dimensions.get('window').width);

const Tool = () => {
  const {State} = React.useContext(GlobalContext);
  const {user} = State;
  const [tools, setTools] = React.useState([]);

  const _getTools = async () => {
    let response;
    try {
      response = await getAllTools(user.token);
      if (response) {
        setTools(response.Tools);
      }
    } catch (error) {
      throw error;
    }
  };

  console.log(tools, 'tools');

  React.useEffect(() => {
    _getTools();
  }, []);

  const _renderItem = ({item}) => (
    <View style={styles.toolItem}>
      <Image source={{uri: item.image}} style={styles.toolImg} />
      <View style={styles.toolNameCon}>
        <Text style={styles.toolNameTxt}>{item.name}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={tools}
        renderItem={_renderItem}
        keyExtractor={(item) => `${item.name}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Tool;

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Apperance.background,
  },
  toolItem: {
    width: DEVICE_WIDTH / 2.7,
    height: DEVICE_WIDTH / 2.7,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  toolImg: {
    width: DEVICE_WIDTH / 3 - 55,
    height: DEVICE_WIDTH / 3 - 55,
  },
  toolNameCon: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolNameTxt: {
    fontFamily: Apperance.fontFamilyBold,
    color: Apperance.background,
  },
});
