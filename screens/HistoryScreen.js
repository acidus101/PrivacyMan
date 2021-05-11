import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Card } from 'react-native-shadow-cards';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import * as actions from '../store/actions/actions';
import ResultCard from '../components/ResultCard';
import Button from '../components/Button';
import Pdf from 'react-native-pdf';

const image = require('../assets/wp4822291.jpg');

const History = props => {

  const pdfs = useSelector(state => state.main.files);
  let route;
  const cardHandler = (path) => {
    // let res = path.toString();
    route = { uri: 'https://global.toyota/pages/global_toyota/ir/library/annual/2019_001_annual_en.pdf', cache: true };
    props.navigation.navigate('open', { path: route });
  }
  return (
    <ImageBackground source={image} style={styles.image}>
      <FlatList
        data={pdfs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          itemData => (
            <TouchableOpacity onPress={() => { cardHandler() }}>
              <Card style={{ padding: 10, margin: 10, elevation: 3, justifyContent:'center', alignItems:'center' }}>
                <View style={{ flex: 1, padding: 10, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', width:'100%', height:'100%' }}>
                  <Image source={require('../assets/logo-og.png')} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 75,
                    borderWidth: 3,
                    borderColor: 'black',
                    overflow: 'hidden',
                  }} />
                </View>
                <ResultCard style={styles.resultTitleView}>
                  <Text style={styles.filename}>{"\n"}FILENAME:- </Text>{itemData.item.location.split('/').pop().replace(/%20/g, " ")}
                  <Text style={styles.filename}>{"\n"}Secure:- </Text>{itemData.item.secp}<Text>%</Text>
                  <Text style={styles.filename}>{"\n"}performance:- </Text>{itemData.item.perfp}<Text>%</Text>
                </ResultCard>
              </Card>
            </TouchableOpacity>
          )
        }
      />
    </ImageBackground>
  );
};

History.navigationOptions = props => {
  return {
    headerTitle: 'Previous Checks',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultcard: {
    flexDirection: 'row',
    padding: 20,
    fontFamily: 'open-sans',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filename: {
    fontFamily: 'open-sans-bold',
    width: '20%'
  },
  filedata: {
    fontFamily: 'open-sans'
  },
  resultPdfView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultTitleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default History;
