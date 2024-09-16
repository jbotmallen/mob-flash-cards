import React from 'react';
import { View, StyleSheet } from 'react-native';

const DottedBackground = () => {
    return (
        <View style={styles.container}>
            {Array(500)
                .fill(0)
                .map((_, index) => (
                    <View key={index} style={styles.dot} />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        zIndex: -1,
        opacity: 0.1,
        margin: 0,
        padding: 0,
    },
    dot: {
        height: 3,
        width: 3,
        borderRadius: 5,
        backgroundColor: 'black',
        margin: 10,
    },
});

export default DottedBackground;
