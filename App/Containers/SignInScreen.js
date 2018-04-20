import React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Host} from "../Config";


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: "请登录"
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputLine}>
                    <Text>用户名</Text>
                    <TextInput></TextInput>
                </View>
                <View style={styles.inputLine}>
                    <Text>密码</Text>
                    <TextInput></TextInput>
                </View>
                <Button title="登陆" onPress={this._signInAsync}></Button>
            </View>
        );
    }

    _signInAsync = async () => {
        try {
            const url = Host + '/api/auth/login';
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "",
                    password: ""
                })
            });
            let responseJSON = await response.json();
            if (responseJSON.code === "success") {
                userToken = await AsyncStorage.setItem('userToken', responseJSON.token);
            } else {
                await AsyncStorage.clear();
            }
        } catch (e) {
            console.error(e);
        }
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputLine: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});