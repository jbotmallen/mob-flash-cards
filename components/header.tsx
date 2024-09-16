import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Header = () => {
    return (
        <Text style={styles.header}>
            Learn more about the
            <Text style={{ fontWeight: 800 }}> capital cities </Text>
            of the world!
        </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        textAlign: "center",
    },
})

export default Header