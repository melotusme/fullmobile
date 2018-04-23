import React, {Component} from 'react';
import {TouchableOpacity, FlatList, ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';

url = "http://45.78.19.188:8899/api/articles/";
const extractKey = ({item}) => item.id;
export default class ArticleListScreen extends Component {
    state = {
        loading: true,
        error: false,
        articles: []
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(url);
            const articles = await response.json();
            this.setState({loading: false, articles});
        } catch (e) {
            this.setState({loading: false, error: true});
        }
    };

    renderItem = ({item}) => {
        return (
            <TouchableOpacity key={item} onPress={() => {
                this.props.navigation.navigate('ArticleDetail', {article: item});
            }}>
                <View
                    style={styles.article}
                >
                    <View style={styles.articleNumber}>
                        <Text>
                            {item.id}
                        </Text>
                    </View>
                    <View style={styles.articleContent}>
                        <Text>
                            {item.title}
                        </Text>
                        <Text style={styles.articleBody}>
                            {item.body.substring(0, 80)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const {articles, loading, error} = this.state;
        if (loading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        }
        if (error) {
            return (
                <View style={styles.center}>
                    <Text>
                        Failed to load articles
                    </Text>
                </View>
            );
        }
        return (
            <FlatList style={styles.container}
                      data={articles}
                      renderItem={this.renderItem}
                      keyExtrator={extractKey}
            >
            </FlatList>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    article: {
        flexDirection: 'row',
    },
    articleNumber: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    articleContent: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: "skyblue",
        paddingVertical: 25,
        paddingRight: 15,
    },
    articleBody: {
        marginTop: 10,
        fontSize: 12,
        color: 'black',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
