import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator, Dimensions, StatusBar , StyleSheet} from 'react-native'
const { height, width } = Dimensions.get('screen');

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#46a683'
                    barStyle='light-content'
                />
                <Image
                    style={styles.img}
                    source={require('./assets/icon/DS.jpg')}
                    resizeMode="contain"
                />
                <View style={styles.containerLoader}>
                    <ActivityIndicator />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#46a683'
    },
    img: {
        height: 0.25 * width,
        width: 0.25 * width,
        borderRadius: 10
    },
    containerLoader: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: height / 2 - 10,
        right: width / 2 - 10
    },
})
