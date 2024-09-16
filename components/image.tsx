import { height, width } from '@/constants/Dimensions'
import React from 'react'
import { Text, Image, StyleSheet, ViewStyle } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const BLUR_VALUE = 4

type ImagesProps = {
    item: {
        question: string
        qImage: string
        answer: string
        aImage: string
    },
    usedFor: "front" | "back",
    rotate: SharedValue<number>
}

const Images = ({ item, usedFor = "front", rotate }: ImagesProps) => {
    const rotate_duration: number = 500

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    rotateX: withTiming(`${rotateValue}deg`, { duration: rotate_duration }),
                },
            ],
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    rotateX: withTiming(`${rotateValue}deg`, { duration: rotate_duration }),
                },
            ],
        };
    });

    return (
        <Animated.View
            style={usedFor === "front" ? [styles.cardBody, styles.card, frontAnimatedStyle] : [styles.cardBody, styles.card, backAnimatedStyle]}>
            <Image
                style={styles.image}
                source={{
                    uri: usedFor === "front" ? item.qImage : item.aImage,
                }}
                blurRadius={BLUR_VALUE}
            />
            <Text style={styles.cardText}>
                {usedFor === "front" ? item.question : item.answer}
            </Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        position: "absolute",
    },
    cardText: {
        textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20
    },
    cardBody: {
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
});

export default Images