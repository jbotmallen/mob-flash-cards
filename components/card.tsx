import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import Images from './image'
import { useSharedValue } from 'react-native-reanimated'
import { height, width } from '@/constants/Dimensions'

type CardsProps = {
    item: {
        question: string
        qImage: string
        answer: string
        aImage: string
    },
}

const Cards = ({ item }: CardsProps) => {
    const rotate = useSharedValue<number>(0);
    const handleFlip = () => {
        rotate.value = rotate.value ? 0 : 1;
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => handleFlip()}
                style={[styles.cardFrontBody, styles.card]}
            >
                <Images
                    item={item}
                    usedFor="front"
                    rotate={rotate}
                />
                <Images
                    item={item}
                    usedFor="back"
                    rotate={rotate}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        position: 'relative',
    },
    cardFrontBody: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        borderRadius: 10,
    },
    card: {
        position: "absolute",
        backfaceVisibility: "hidden",
    },
})

export default Cards