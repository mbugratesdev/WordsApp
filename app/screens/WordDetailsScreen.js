import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Localization from 'expo-localization'

import WordsContext from '../context/WordsContext'
import colors from '../config/colors'

export default function WordDetailsScreen({ route, navigation }) {
    const { updateWord, getWord } = useContext(WordsContext)

    const [item, setItem] = useState(route.params.item)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setItem(getWord(item.id))
        })

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe
    }, [navigation])

    const handleDone = () => {
        item.done = true
        setItem(item)
        updateWord(item)
    }

    const handleNotYet = () => {
        item.done = false
        setItem(item)
        updateWord(item)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemTitle}>Meaning</Text>
                        <Text style={styles.itemText}>{Localization.locale == 'tr-TR' ? item.meaningTR : item.meaning}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemTitle}>Pronunciation</Text>
                        <Text style={styles.itemText}>{item.pronunciation}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemTitle}>Type</Text>
                        <Text style={styles.itemText}>{item.type}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemTitle}>Status</Text>
                        <Text style={styles.itemText}>
                            {item.done ? 'Done ' : 'Not Yet '}
                            <AntDesign
                                name={item.done ? 'checkcircleo' : 'clockcircleo'}
                                size={styles.itemText.fontSize ?? 20}
                                color={colors.black}
                            />
                        </Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemTitle}>Example</Text>
                        <Text style={styles.itemText}>{item.example}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.topButtonsWrapper}>
                <TouchableWithoutFeedback onPress={handleDone}>
                    <View style={[styles.button, { width: '49%' }]}>
                        <Text style={styles.buttonText}>Done</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleNotYet}>
                    <View style={[styles.buttonOutline, { width: '49%' }]}>
                        <Text style={styles.buttonOutlineText}>Not Yet</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: colors.light,
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
        color: colors.white,
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
    buttonsWrapper: {
        marginBottom: 20,
    },
    topButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
})
