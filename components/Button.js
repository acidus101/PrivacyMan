import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';

const Button = props => {
    return (
        <TouchableOpacity onPress={props.clicked} style={{ ...styles.screen, ...props.style }}>
            <View>

            <Text>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        height: 60,
        width: 120,
        margin: 20,
        padding: 10
    }
});

export default Button;
