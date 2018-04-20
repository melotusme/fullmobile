import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {};
url = "http://45.78.19.188:8899/api/articles/";
export default class ArticleList extends Component<Props> {
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

    renderArticle = ({id, title, body}, i) => {
        return (
            <View
                key={id}
                style={styles.article}>
                <View style={styles.articleNumber}>
                    <Text>
                        {i + 1}
                    </Text>
                </View>
                <View style={styles.articleContent}>
                    <Text>
                        {title}
                    </Text>
                    <Text style={styles.articleBody}>
                        {body}
                    </Text>
                </View>

            </View>
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
            <ScrollView style={styles.container}>
                {articles.map(this.renderArticle)}
            </ScrollView>
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
