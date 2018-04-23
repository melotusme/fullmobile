import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Markdown from 'react-native-markdown-renderer';


export default class ArticleListScreen extends React.Component {
    render() {
        const {params} = this.props.navigation.state;
        const article = params ? params.article : null;

        return (
            <ScrollView style={styles.container}>
                <Markdown>{article.body}</Markdown>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
