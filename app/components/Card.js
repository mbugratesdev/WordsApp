import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as Localization from 'expo-localization'

import colors from '../config/colors'

export default function Card({ item }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={[styles.cardWrapper]}>
            <View style={[{ flex: 1 }, !showDetails ? { justifyContent: 'center', alignItems: 'center' } : {}]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                {showDetails && (
                    <View>
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
                            <Text style={styles.itemTitle}>Example</Text>
                            <Text style={styles.itemText}>{item.example}</Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.buttonsWrapper}>
                <TouchableWithoutFeedback onPress={() => setShowDetails(!showDetails)}>
                    <View style={showDetails ? styles.buttonOutline : styles.button}>
                        <Text style={showDetails ? styles.buttonOutlineText : styles.buttonText}>
                            {showDetails ? 'Hide Details' : 'Show Details'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.bottomButtonsWrapper}></View>
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
})
