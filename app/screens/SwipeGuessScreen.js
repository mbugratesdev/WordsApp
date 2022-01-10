import React, { useContext, useReducer } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'

import WordsContext from '../context/WordsContext'
import colors from '../config/colors'
import SwipeCards from '../components/SwipeCards'
import Card from '../components/Card'

function unknownWordsReducer(state, action) {
    switch (action.type) {
        case 'update':
            return { unknownWords: action.unknownWords }
        default:
            throw new Error()
    }
}

export default function SwipeGuessScreen() {
    const { words, updateWord } = useContext(WordsContext)

    const [state, dispatch] = useReducer(unknownWordsReducer, { unknownWords: _.shuffle(words.filter((word) => !word.done)) })

    const handleDone = async (item) => {
        item.done = true
        updateWord(item)
    }

    const handleNotYet = (item) => {
        item.done = false
        updateWord(item)
    }

    const handleRefresh = () => {
        dispatch({ type: 'update', unknownWords: _.shuffle(words.filter((word) => !word.done)) })
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, overflow: 'hidden' }}>
                {state.unknownWords.length > 0 || words.filter((word) => !word.done).length > 0 ? (
                    <SwipeCards
                        data={state.unknownWords}
                        dislikeText="NOT YET"
                        likeText="DONE"
                        containerStyle={{ padding: 20 }}
                        renderItem={(item) => <Card item={item} />}
                        keyExtractor={(item) => item.id}
                        onLike={handleDone}
                        onUnlike={handleNotYet}
                        onRefresh={handleRefresh}
                    />
                ) : (
                    <View style={styles.infoWrapper}>
                        <TouchableOpacity onPress={handleRefresh} style={{ width: '100%' }}>
                            <View style={styles.infoMessageWrapper}>
                                <Text style={styles.infoButtonText}>You memorized all the words</Text>
                            </View>
                            <View style={styles.infoButton}>
                                <Text style={styles.infoButtonText}>Reload</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1,
        justifyContent: 'space-between',
    },
    titleWrapper: {
        marginBottom: 40,
    },
    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 48,
        color: colors.dark,
    },
    itemWrapper: {
        marginBottom: 20,
    },
    itemTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: colors.black,
        opacity: 0.32,
    },
    itemText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: colors.medium,
    },
    example: {
        fontFamily: 'Inter_300Light',
        fontSize: 18,
        color: colors.medium,
    },
    buttonsWrapper: {},
    topButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bottomButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 16,
        backgroundColor: colors.dark,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
    },
    buttonOutline: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderRadius: 30,
    },
    buttonOutlineText: {
        color: colors.dark,
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
    },
    infoMessage: {
        color: colors.dark,
        fontFamily: 'Inter_300Light',
        fontSize: 18,
        textAlign: 'center',
    },
    cardWrapper: {
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        flex: 1,
        backgroundColor: colors.light,
        borderRadius: 35,
        padding: 20,
        paddingTop: 35,
        borderWidth: 2,
        borderColor: colors.dark,
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
    infoMessageWrapper: {
        marginBottom: 20,
        alignItems: 'center',
    },
})
