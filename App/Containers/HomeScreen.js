import React from 'react';
import {AsyncStorage, Button, StyleSheet, View} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "志荣的笔记"
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="登出" onPress={this._signOutAsync}></Button>
                <Button title="阅读" onPress={this._getArticlesAsync}></Button>
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    };

    _getArticlesAsync = () => {
        this.props.navigation.navigate("ArticleList");
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});