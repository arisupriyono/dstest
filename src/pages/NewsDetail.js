import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { Container, Header, Left, Card, CardItem, Body, Content } from 'native-base';
import HTML from 'react-native-render-html';
const { height, width } = Dimensions.get('screen');

export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNews: this.props.arrayNews,
            newsImage: '',
            newsTitle: '',
            newsContent: ''
        }
    }

    componentDidMount() {
        let dataNews = this.state.dataNews;
        let valImage = dataNews.attachments[0].images.full.url;
        let valTitle = dataNews.title;
        let valContent = dataNews.content;

        this.setState({
            newsImage: valImage,
            newsTitle: valTitle,
            newsContent: valContent
        })
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <View>
                        <View style={styles.containerImage}>
                            <Image source={{ uri: this.state.newsImage }} style={styles.img} />
                        </View>
                        <View>
                            <View style={styles.containerTitle}>
                                <Text style={styles.containerTitle}>{this.state.newsTitle}</Text>
                            </View>
                            <View>
                                <HTML html={this.state.newsContent} imagesMaxWidth={width} />
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    containerImage:{
        alignSelf: 'center'
    },
    containerTitle:{
        marginVertical: 10 
    },
    img:{
        width: 0.95 * width, 
        height: 0.3 * height, 
        borderRadius:10
    },
    txtTitle:{
        fontSize: 16, 
        fontWeight: 'bold'
    }
})
