import { Content } from '@/constants/Content'
import { useWait } from '@/hooks/useWait'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { ICarouselInstance } from 'react-native-reanimated-carousel'

type ButtonsProps = {
    index: number
    autoPlay: boolean
    setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>
    setIndex: React.Dispatch<React.SetStateAction<number>>
    carouselRef: React.RefObject<ICarouselInstance>
}

function getRandomNumberInRange(min_inclusive: number, max_inclusive: number): number {
    return Math.floor(Math.random() * (max_inclusive - min_inclusive + 1)) + min_inclusive;
}

const Buttons = ({ index, setIndex, autoPlay, setAutoPlay, carouselRef }: ButtonsProps) => {
    const rotate = useSharedValue<number>(0);
    const rotate_duration: number = 500

    const handlePrevious = () => {
        if (index > 0) {
            if (rotate.value) {
                rotate.value = 0
                useWait(rotate_duration + 200, () => {
                    setIndex((prev) => prev - 1);
                    if (carouselRef.current) {
                        carouselRef.current.scrollTo({ index: index - 1, animated: true });
                    }
                });
            } else {
                setIndex((prev) => prev - 1);
                if (carouselRef.current) {
                    carouselRef.current.scrollTo({ index: index - 1, animated: true });
                }
            }
        }
    };

    const handleNext = () => {
        if (index < Content.length - 1) {
            if (rotate.value) {
                rotate.value = 0
                useWait(rotate_duration + 200, () => {
                    setIndex((prev) => prev + 1);
                    if (carouselRef.current) {
                        carouselRef.current.scrollTo({ index: index + 1, animated: true });
                    }
                });
            } else {
                setIndex((prev) => prev + 1);
                if (carouselRef.current) {
                    carouselRef.current.scrollTo({ index: index + 1, animated: true });
                }
            }
        }
    };

    const handleShuffle = () =>{
        let random_index = getRandomNumberInRange(0, Content.length-1)
        while (random_index === index){
            random_index = getRandomNumberInRange(0, Content.length-1)
        }

        console.log(index + " -> " + random_index)

        setIndex((prev) => random_index);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index:random_index, animated: true });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Pressable 
                    style={[styles.button, autoPlay ? { backgroundColor: "black" } : { backgroundColor: "green" }]} 
                    onPress={() => setAutoPlay(!autoPlay)}>
                    <Feather name={autoPlay ? "pause-circle" : "airplay"} size={40} color="white" />
                </Pressable>
                <Pressable
                    style={index === 0 ? styles.disabled_button : styles.button}
                    onPress={handlePrevious}
                >
                    <Feather name="chevrons-left" size={40} color="white" />
                </Pressable>
                <Pressable
                    disabled={index === Content.length - 1}
                    style={Content.length - 1 === index ? styles.disabled_button : styles.button}
                    onPress={handleNext}
                >
                    <Feather name="chevrons-right" size={40} color="white" />
                </Pressable>
                <Pressable 
                    style={[styles.button, { backgroundColor: "brown" }]} 
                    onPress={handleShuffle}>
                    <Feather name="shuffle" size={40} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: "100%",
        borderRadius: 10,
        gap: 10,
    },
    box: {
        height: "100%", display: "flex", flexDirection: "row", gap: 5, justifyContent: "space-between", paddingHorizontal: 30
    },
    button: { height: "100%", width: 75, padding: 10, backgroundColor: "blue", borderRadius: 10, alignItems: "center", justifyContent: "center" },
    disabled_button: { height: "100%", width: 75, padding: 10, backgroundColor: "gray", borderRadius: 10, alignItems: "center", justifyContent: "center" }
});

export default Buttons