/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';

import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import ArticleListScreen from './ArticleListScreen';

const AppStack = StackNavigator({Home: HomeScreen, ArticleList: ArticleListScreen}, {initialRouteName: "Home"});
const AuthStack = StackNavigator({SignIn: SignInScreen});

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: "AuthLoading"
    }
);

