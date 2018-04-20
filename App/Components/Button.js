import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default class Button extends React.Component {
    static propTypes = {
        text: PropTypes.string
    };

    getText() {
        const text = this.props.text || "空";
        return text;
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Text>{this.getText()}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'steelblue',
        width: 200,
        height: 40,
    }
});