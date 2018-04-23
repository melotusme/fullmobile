import React from 'react';
import {AsyncStorage, StyleSheet, ToastAndroid, View} from 'react-native';
import Button from '../Components/Button';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "志荣的笔记"
    };
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        ToastAndroid.show("登出成功", ToastAndroid.SHORT);
        this.props.navigation.navigate("Auth");
    };
    _getArticlesAsync = () => {
        this.props.navigation.navigate("ArticleList");
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.items}>
                    <Button text="登出" onPress={this._signOutAsync}></Button>
                    <Button text="阅读" onPress={this._getArticlesAsync}></Button>
                </View>
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
    items: {
        flex: 1,
        flexDirection: 'row'
    }
});