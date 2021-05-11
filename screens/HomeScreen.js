import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import * as appsActions from '../store/actions/apps';
import appsList from '../helpers/test';

const image = require('../assets/wp4822291.jpg');
const pdfuri = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
// const pdfuri = 'https://research.nhm.org/pdfs/10840/10840.pdf';
const tourl = require('../helpers/pdfModel');
const Home = props => {
  const dispatch = useDispatch();

  // populate store with data
  useEffect(() => {
    dispatch(appsActions.populateData(appsList));
  }, []);


  const pdfSelectedHandler = async () => {
  }



  const curateListHandler = (data) => {

  }
  // reads the text document
  const textDocumentHandler = async () => {

    // setFormedPdf(createPDF);
    try {
      console.log('awaiting response');
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      RNFetchBlob.fs.readFile(res.uri, 'UTF8')
        .then((data) => {
          curateListHandler(data);
          console.log(data);
        })
    } catch (err) {
      console.log('awaiting error');
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    // props.navigation.navigate('results', { url: formedPdf })

  }
  const appsListHandler = () => {
    props.navigation.navigate('installed');
  }
  const resultShowHandler = () => {
    props.navigation.navigate('history');
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/logo-og.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <Card style={{ padding: 10, margin: 10, elevation: 3, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.mainText} >
          <Text> SELECT AN APK</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button style={styles.ButtonColor} clicked={() => { resultShowHandler() }}>History</Button>
          <Button style={styles.ButtonColor} clicked={() => { appsListHandler() }}>From Installed</Button>
        </View>
        {/* <Button style={styles.ButtonColor} clicked={() => { pdfSelectedHandler() }}>open list</Button> */}
      </Card>
    </ImageBackground>
  );
};

Home.navigationOptions = props => {
  // console.log(navData);
  return {
    headerTitle: 'PrivacyMan',
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DA6825'
  },
  ButtonColor: {
    borderColor: Colors.accent,
  },
  mainText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    padding: 10
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  logo: {
    width: '100%',
    height: '100%'
  }
});

export default Home;
