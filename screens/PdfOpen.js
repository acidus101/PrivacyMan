import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';
const url = require('../assets/abc.pdf');

const Results = props => {
  const source = { uri: props.navigation.getParam('path'), cache: true };
  // console.log(source);
  // const source = url;
    // const b = props.navigation.getParam('path');
  return (
    <View style={styles.container}>
        <Pdf
        source={source.uri}
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
  </View>
  );
};


Results.navigationOptions = {
  headerTitle: 'result-summary'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    overflow: 'hidden'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default Results;
