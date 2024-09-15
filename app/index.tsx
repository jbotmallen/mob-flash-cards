import { Content } from '@/constants/Content';
import { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, Text, View, StyleSheet } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Feather from '@expo/vector-icons/Feather';

import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function wait(ms: number, callback: () => void): void {
  setTimeout(callback, ms);
}

function Index() {
  
  // =======================================================================
  // CAROUSEL
  // =======================================================================

  const [index, setIndex] = useState<number>(0);
  const width = Dimensions.get('window').width - 20;
  const height = Dimensions.get('window').height - 350;

  const carouselRef = useRef<ICarouselInstance>(null);

  const handlePrevious = () => {
    if (index > 0) {
      if(rotate.value){
        rotate.value = 0
        wait(rotate_duration + 200, () => {
          setIndex((prev) => prev - 1);
          if (carouselRef.current) {
            carouselRef.current.scrollTo({ index: index - 1, animated: true });
          }
        });
      }else{
        setIndex((prev) => prev - 1);
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ index: index - 1, animated: true });
        }
      }
    }
  };

  const handleNext = () => {
    if (index < Content.length - 1) {
      if(rotate.value){
        rotate.value = 0
        wait(rotate_duration + 200, () => {
          setIndex((prev) => prev + 1);
          if (carouselRef.current) {
            carouselRef.current.scrollTo({ index: index + 1, animated: true });
          }
        });
      }else{
        setIndex((prev) => prev + 1);
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ index: index + 1, animated: true });
        }
      }
    }
  };

  // =======================================================================
  // FLIPPING
  // =======================================================================

  const rotate = useSharedValue(0);
  const rotate_duration = 500

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

 const handleFlip = () => {
    console.log("handleFlip be like")
    rotate.value = rotate.value ? 0 : 1;
  };

  const wWidth = Dimensions.get("window").width;
  const wHeight = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },

    cardFrontBody: {
      justifyContent: "center",
      alignItems: "center",
      width: wWidth,
      height: wHeight,
      borderRadius: 10,
    },
    cardArea: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    card: {
      position: "absolute",
      backfaceVisibility: "hidden",
    },
    cardBackBody: {
      justifyContent: "center",
      alignItems: "center",
      width: wWidth,
      height: wHeight,
      borderRadius: 10,
    }
  });

  // =======================================================================
  // RETURN
  // =======================================================================

  return (
    <View style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", padding: 24, gap: 20 }}>
      
      <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 400 }}>
        Learn more about the
        <Text style={{ fontWeight: 800 }}> capital cities </Text>
        of the world!
      </Text>
      
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={height}
        autoPlay={false}
        data={Content}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={({ item }) => (
          <View
            style={[styles.container, {
              flex: 1,
              width: "100%",
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              gap: 10,
              padding: 10,
              position: 'relative',
            }]}
          >
            
            <Pressable
              onPress={() => handleFlip()}
              style={[styles.cardFrontBody, styles.card]}>

              <Animated.View
                style={[styles.cardFrontBody, styles.card, frontAnimatedStyle]}>
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 0, position: "absolute", }}
                  source={{
                    uri: Content[index].qImage,
                  }}
                />
                <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20 }}>
                  {Content[index].question}
                </Text>
              </Animated.View>

              <Animated.View
                style={[styles.cardBackBody, styles.card, backAnimatedStyle]}>
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 0, position: "absolute", }}
                    source={{
                      uri: Content[index].qImage,
                    }}
                  />
                  <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20 }}>
                    {Content[index].answer}
                  </Text>
              </Animated.View>

            </Pressable>
          </View>
        )}
      />

      {/* END OF CAROUSEL */}

      <View style={{ height: "10%", display: "flex", flexDirection: "row", gap: 10, marginTop: 10, justifyContent: "space-between" }}>
        <Pressable
          style={index === 0 ? {
            width: "50%",
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          } : {
            width: "50%",
            padding: 10,
            backgroundColor: "blue",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handlePrevious}
        >
          <Feather name="chevrons-left" size={40} color="white" />
        </Pressable>
        <Pressable
          disabled={index === Content.length - 1}
          style={Content.length - 1 === index ?
            {
              width: "50%",
              padding: 10,
              backgroundColor: "gray",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            } : {
              width: "50%",
              padding: 10,
              backgroundColor: "blue",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          onPress={handleNext}
        >
          <Feather name="chevrons-right" size={40} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

export default Index;
