import React from 'react'
import { Text, View, Dimensions, Animated, PanResponder, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

const SCREEN_WIDTH = Dimensions.get('window').width

export default class SwipeCards extends React.Component {
    constructor() {
        super()

        this.state = {
            currentIndex: 0,
        }

        this.position = new Animated.ValueXY()

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp',
        })

        this.rotateAndTranslate = {
            transform: [
                {
                    rotate: this.rotate,
                },
                ...this.position.getTranslateTransform(),
            ],
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp',
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp',
        })
    }

    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 150) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: false,
                        restSpeedThreshold: 1000,
                        restDisplacementThreshold: 100,
                        speed: 20,
                    }).start(() => {
                        this.position.setValue({ x: 0, y: 0 })
                        this.props.onLike(this.props.data[this.state.currentIndex])
                        this.setState({ currentIndex: this.state.currentIndex + 1 })
                    })
                } else if (gestureState.dx < -150) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: false,
                        restSpeedThreshold: 1000,
                        restDisplacementThreshold: 100,
                        speed: 20,
                    }).start(() => {
                        this.position.setValue({ x: 0, y: 0 })
                        this.props.onUnlike(this.props.data[this.state.currentIndex])
                        this.setState({ currentIndex: this.state.currentIndex + 1 })
                    })
                } else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                        friction: 7,
                    }).start()
                }
            },
        })
    }

    render() {
        return this.state.currentIndex > this.props.data.length - 1 ? (
            <View style={styles.infoWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ currentIndex: 0 })
                        this.props.onRefresh()
                    }}
                    style={{ width: '100%' }}
                >
                    <View style={styles.infoButton}>
                        <Text style={styles.infoButtonText}>Reload All Words</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ) : (
            this.props.data
                .map((item, i) => {
                    if (i < this.state.currentIndex || i > this.state.currentIndex + 1) {
                        return null
                    } else if (i == this.state.currentIndex) {
                        return (
                            <Animated.View
                                style={[this.rotateAndTranslate, styles.cardWrapper, this.props.containerStyle]}
                                key={this.props.keyExtractor(item)}
                                {...this.PanResponder.panHandlers}
                            >
                                <Animated.View
                                    style={[styles.likeWrapper, { opacity: this.likeOpacity }, this.props.containerStyle]}
                                >
                                    <Text style={styles.likeText}>{this.props.likeText ?? 'LIKE'}</Text>
                                </Animated.View>

                                <Animated.View
                                    style={[styles.nopeWrapper, { opacity: this.dislikeOpacity }, this.props.containerStyle]}
                                >
                                    <Text style={styles.dislikeText}>{this.props.dislikeText ?? 'NOPE'}</Text>
                                </Animated.View>

                                {this.props.renderItem(item)}
                            </Animated.View>
                        )
                    } else if (i == this.state.currentIndex + 1) {
                        return (
                            <Animated.View
                                key={this.props.keyExtractor(item)}
                                style={[
                                    styles.cardWrapper,
                                    { opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }] },
                                    this.props.containerStyle,
                                ]}
                            >
                                {this.props.renderItem(item)}
                            </Animated.View>
                        )
                    } else {
                        return (
                            <Animated.View
                                key={this.props.keyExtractor(item)}
                                style={[
                                    styles.cardWrapper,
                                    { opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }] },
                                    this.props.containerStyle,
                                ]}
                            >
                                {this.props.renderItem(item)}
                            </Animated.View>
                        )
                    }
                })
                .reverse()
        )
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    likeWrapper: {
        transform: [{ rotate: '-30deg' }],
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1000,
    },
    likeText: {
        borderWidth: 1,
        borderColor: colors.dark,
        color: colors.dark,
        fontSize: 32,
        fontWeight: '800',
        padding: 10,
        fontFamily: 'Inter_700Bold',
    },
    nopeWrapper: {
        transform: [{ rotate: '30deg' }],
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
    },
    dislikeText: {
        borderWidth: 1,
        borderColor: colors.dark,
        color: colors.dark,
        fontSize: 32,
        fontWeight: '800',
        fontFamily: 'Inter_700Bold',
        padding: 10,
    },
    infoWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    infoButton: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderRadius: 30,
    },
    infoButtonText: {
        color: colors.dark,
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
    },
})
