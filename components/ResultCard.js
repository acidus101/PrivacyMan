import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-shadow-cards';

const ResultCard = props => {
    // const route = props.path.split('/').pop();
    return (
        <View style = {{...props.style, ...styles.screen}}>
            <Text>{props.children}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1
    }
});

export default ResultCard;
