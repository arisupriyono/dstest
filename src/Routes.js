import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar } from 'react-native'
import { Router, Scene } from 'react-native-router-flux';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
// a
export class Routes extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#46a683'
                    barStyle='light-content'
                />
                <Router
                    navigationBarStyle={{ backgroundColor: '#46a683' }}
                    titleStyle={{ color: 'white' }}
                    tintColor={'white'}>
                    <Scene key="root">
                        <Scene key="News" component={News} title="DailySocial Test" initial />
                        <Scene key="NewsDetail" component={NewsDetail} title="DailySocial Test" />
                    </Scene>
                </Router>
            </SafeAreaView>
        )
    }
}

export default Routes
