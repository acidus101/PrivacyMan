import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const image = require('../assets/wp4822291.jpg');
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Pdf from 'react-native-pdf';
import { Card } from 'react-native-shadow-cards';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/actions';

// const pdfuri = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
const pdfuri = 'https://global.toyota/pages/global_toyota/ir/library/annual/2019_001_annual_en.pdf';

const url = require('../assets/abc.pdf');
const Results = props => {
  // const source = { uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', cache: true };
  const source = url;
  const [pdfFetched, setPdfFetched] = useState(false);
  const dispatch = useDispatch();
  const pdfPressHandler = () => {
    props.navigation.navigate('open', { path: require('../assets/abc.pdf') })
  };

  let pdfblock = <TouchableOpacity style={styles.container} onPress={() => { pdfPressHandler() }}>
    <Pdf
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`current page: ${page}`);
      }}
      onError={(error) => {
        console.log(error);
      }}
      onPressLink={(uri) => {
        console.log(`Link presse: ${uri}`)
      }}
      style={styles.pdf} />
  </TouchableOpacity>;


  const pdfSelectedHandler = async () => {
    let name = props.navigation.getParam('appTitle');
    // name.replace(/%20/g, " ");
    dispatch(actions.addPdf(pdfuri, name, props.navigation.getParam('securityPercentage'), props.navigation.getParam('performancePercentage')));
    props.navigation.navigate('home');
    //   let route = props.navigation.getParam('fetched');
    //   try{
    //     await dispatch(actions.addPdf(route));
    //     props.navigation.navigate('home');
    //   }catch(err){
    //     Alert.alert(
    //       "Result Not Stored!!!",
    //       "could not store results locally",
    //       [
    //         { text: "OK", onPress: () =>  props.navigation.navigate('home')}
    //       ],
    //       { cancelable: false }
    //       );
    //   }
  }


  return (
    <ImageBackground source={image} style={styles.image}>
      <Card style={{ height: '100%', adding: 10, margin: 10, elevation: 3, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.mainText} >
          <View>
            <Text style={styles.appTitle}>{props.navigation.getParam('appTitle')}</Text>
            <Text style={styles.securityPercentage}>{props.navigation.getParam('securityPercentage')}<Text fontFamily='open-sans'>% SECURE BASED ON SET STANDARDS</Text></Text>
            <Text style={styles.performancePercentage}>{props.navigation.getParam('performancePercentage')}<Text fontFamily='open-sans'>% SECURE BASED ON SET STANDARDS</Text></Text>
          </View>
          {props.navigation.getParam('pdfFetched') ? pdfblock : <Card style={{ height: '100%', adding: 10, margin: 10, elevation: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Button style={styles.fallbackText}>
              <View>
                <Text>NO PDF OUTPUT FROM SERVER!!!</Text>
              </View>
              <View>
                <Text>CLICK DISCARD TO REACH HOME</Text>
              </View>
            </Button></Card>}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ borderColor: Colors.primary }} clicked={() => { props.navigation.navigate('home') }}>Discard</Button>
          {props.navigation.getParam('pdfFetched') ? <Button style={{ borderColor: Colors.accent }} clicked={() => { pdfSelectedHandler() }}>Save</Button> : null}
        </View>
      </Card>
    </ImageBackground>
  );
};


Results.navigationOptions = {
  headerTitle: 'Results'
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    overflow: 'hidden'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
  },
  appTitle: {
    fontFamily: 'open-sans-bold',
    marginTop: 30,
  },
  securityPercentage: {
    fontFamily: 'open-sans'
  },
  fallbackText: {
    flexDirection: 'row',
    width: '80%',
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Results;
