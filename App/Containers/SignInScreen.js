import React from 'react';
import {ToastAndroid, AsyncStorage, StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../Components/Button';
import {Host} from "../Config/index";


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: "请登录"
    };
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
                    username: this.state.username,
                    password: this.state.password
                })
            });
            let responseJSON = await response.json();
            if (responseJSON.code === "success") {
                userToken = await AsyncStorage.setItem('userToken', responseJSON.token);
                ToastAndroid.show("登陆成功", ToastAndroid.SHORT);
                this.props.navigation.navigate('App');
            } else {
                ToastAndroid.show("登陆失败", ToastAndroid.SHORT);
                await AsyncStorage.clear();
            }
        } catch (e) {
            console.error(e);
        }
    };

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputLine}>
                    <Text>用户名</Text>
                    <TextInput
                        onChangeText={(username) => this.setState({username})}>{this.state.username}</TextInput>
                </View>
                <View style={styles.inputLine}>
                    <Text>密码</Text>
                    <TextInput
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry={true}>{this.state.password}</TextInput>
                </View>
                <Button onPress={this._signInAsync} text="登陆"/>
            </View>
        );
    }
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
        justifyContent: 'space-between',
        height: 50,
        width: 200,
    },
});