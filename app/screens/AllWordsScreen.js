import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, Modal, TouchableOpacity, Alert } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import WordsContext from '../context/WordsContext'
import colors from '../config/colors'

export default function AllWordsScreen({ navigation }) {
    const ref = useRef(null)
    useScrollToTop(ref)

    const { words, resetAllWords } = useContext(WordsContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [selectedMenuItem, setSelectedMenuItem] = useState('all')

    const [filteredWords, setFilteredWords] = useState(words)

    useEffect(() => {
        if (selectedMenuItem == 'all') {
            setFilteredWords(words)
        } else if (selectedMenuItem == 'done') {
            setFilteredWords(words.filter((word) => word.done))
        } else if (selectedMenuItem == 'not yet') {
            setFilteredWords(words.filter((word) => !word.done))
        }
    }, [selectedMenuItem, words])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableWithoutFeedback
                    onPress={() => {
                        setModalVisible(true)
                    }}
                >
                    <View style={{ paddingHorizontal: 20 }}>
                        <MaterialCommunityIcons name="dots-vertical" size={25} color={colors.dark} />
                    </View>
                </TouchableWithoutFeedback>
            ),
        })
    }, [navigation])

    const renderWordItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('WordDetails', { item })}>
            <View style={styles.wordItemWrapper}>
                <View>
                    <Text style={styles.wordTitle}>{item.title}</Text>
                    <Text style={styles.wordType}>({item.type})</Text>
                </View>
                <View style={{ opacity: item.done ? 1 : 0.36 }}>
                    <AntDesign name={item.done ? 'checkcircleo' : 'clockcircleo'} size={32} color={colors.medium} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

    const renderFilterComponent = () => {
        return (
            <View style={styles.filterContainer}>
                <View style={styles.filterWrapper}>
                    <TouchableWithoutFeedback onPress={() => setSelectedMenuItem('all')}>
                        <View style={selectedMenuItem === 'all' ? styles.filterItemWrapperSelected : styles.filterItemWrapper}>
                            <Text style={selectedMenuItem === 'all' ? styles.filterTextSelected : styles.filterText}>All</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setSelectedMenuItem('done')}>
                        <View style={selectedMenuItem === 'done' ? styles.filterItemWrapperSelected : styles.filterItemWrapper}>
                            <Text style={selectedMenuItem === 'done' ? styles.filterTextSelected : styles.filterText}>Done</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setSelectedMenuItem('not yet')}>
                        <View
                            style={selectedMenuItem === 'not yet' ? styles.filterItemWrapperSelected : styles.filterItemWrapper}
                        >
                            <Text style={selectedMenuItem === 'not yet' ? styles.filterTextSelected : styles.filterText}>
                                Not Yet
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => {
                        setModalVisible(false)
                    }}
                >
                    <View style={[styles.modalContainer]}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Alert.alert('Are you sure?', 'All your progress will be deleted!', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            setModalVisible(false)
                                        },
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            resetAllWords()
                                            setModalVisible(false)
                                        },
                                    },
                                ])
                            }}
                        >
                            <View>
                                <Text style={styles.modalText}>Reset All Words</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            {renderModal()}
            <FlatList
                data={filteredWords}
                keyExtractor={(item) => item.id}
                renderItem={renderWordItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                ref={ref}
                ListHeaderComponent={renderFilterComponent}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flex: 1,
    },
    flatList: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    wordItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    wordTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: colors.medium,
    },
    wordType: {
        marginTop: 5,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: colors.black,
        opacity: 0.36,
    },
    modalText: {
        fontSize: 18,
        fontFamily: 'Inter_500Medium',
        color: colors.dark,
    },
    modalContainer: {
        marginHorizontal: 20,
        marginTop: 50,
        padding: 20,
        alignSelf: 'flex-end',
        backgroundColor: colors.light,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    filterContainer: {
        marginBottom: 15,
    },
    filterWrapper: {
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d9d9d9',
        borderRadius: 25,
    },
    filterItemWrapperSelected: {
        borderRadius: 25,
        backgroundColor: colors.light,
        padding: 10,
        paddingHorizontal: 30,
    },
    filterTextSelected: {
        fontSize: 18,
        fontFamily: 'Inter_500Medium',
        color: colors.dark,
    },
    filterItemWrapper: {
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 30,
    },
    filterText: {
        fontSize: 18,
        fontFamily: 'Inter_500Medium',
        color: colors.dark,
        opacity: 0.47,
    },
})
