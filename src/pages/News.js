import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native'
import { Container, Header, Left, Title, Body, Right, Card, CardItem, Icon } from 'native-base';
import { URL } from '../config/API';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('screen');


export default class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            page: 1,
            dataNews: [],
            isLoadingMore: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let page = this.state.page;
        fetch(URL + '?page=' + page)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.news.status == 'ok') {
                    this.setState({
                        isLoading: false,
                        isLoadingMore: false,
                        dataNews: page == 1 ? responseJson.news.posts : [...this.state.dataNews, ...responseJson.news.posts]
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        dataNews: []
                    })
                }

            }).catch((err) => {
                this.setState({
                    isLoading: false,
                    isLoadingMore: false
                })
                console.log(err);
            })
    }

    fetchMore() {
        this.setState({ isLoadingMore: true, page: this.state.page + 1 }, () => {
            this.fetchData();
        })
    }

    goToDetail(idNews) {
        let dataNews = this.state.dataNews;
        let indexNews = dataNews.map(function (d) { return d['id']; }).indexOf(idNews);

        Actions.NewsDetail({ arrayNews: dataNews[indexNews] });
    }

    noData() {
        return (
            <View style={styles.containerNoData}>
                <Text style={styles.txtNoData} >No data found</Text>
            </View>
        )
    }

    renderFooter = () => {
        if (!this.state.isLoadingMore) return null;

        return (
            <View style={styles.containerLoaderMore}>
                <ActivityIndicator />
            </View>
        );
    };

    renderNews() {
        return (
            <FlatList
                removeClippedSubviews={true}
                data={this.state.dataNews}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={this.noData}
                onEndReached={() => { this.fetchMore() }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
                renderItem={({ item }) => {
                    let post_id = item.id;
                    let img = item.attachments[0].images.thumbnail.url;
                    let title = item.title;
                    let author = item.author.name;
                    return (
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.containerThumbnail}>
                                            <Image source={{ uri: img }} style={styles.thumbnail} />
                                        </View>
                                        <View style={styles.spacer} />
                                        <View style={styles.containerText}>
                                            <View>
                                                <Text style={styles.txtTitle}>{title}</Text>
                                            </View>
                                            <View style={styles.containerAuthor}>
                                                <View>
                                                    <Text>{author}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.txtSelengkapnya} onPress={() => { this.goToDetail(post_id) }}>
                                                        {'selengkapnya'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                }
                } />
        )
    }



    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <View style={styles.loadingComponent}>
                    <ActivityIndicator />
                </View>
            );
        }


        return (
            <Container>
                <View style={styles.container}>
                    {this.renderNews()}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loadingComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnail: {
        width: 0.225 * width,
        height: 0.225 * width,
        borderRadius: 20
    },
    txtTitle: {
        fontWeight: 'bold'
    },

    txtSelengkapnya: {
        fontStyle: 'italic',
        color: '#619cfa'
    },
    txtNoData: {
        fontSize: 14,
        color: 'grey'
    },
    container: {
        flex: 1
    },
    containerText: {
        width: 0.65 * width,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    containerAuthor: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerThumbnail: {
        width: 0.25 * width
    },
    containerLoaderMore: {
        marginVertical: 10,
    },
    containerNoData: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0.4 * height
    },
    spacer: {
        width: 0.025 * width
    }

})
