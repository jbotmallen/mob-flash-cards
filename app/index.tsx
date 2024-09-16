import { Content } from '@/constants/Content';
import { useRef, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import React from "react";
import { height, width } from '@/constants/Dimensions';
import Buttons from '@/components/buttons';
import Header from '@/components/header';
import Cards from '@/components/card';
import DottedBackground from '@/components/dotted-background';

function Index() {
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  return (
    <View style={styles.box}>
      <DottedBackground />
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={height}
        autoPlay={autoPlay}
        data={Content}
        autoPlayInterval={3000}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => {
          if (autoPlay && index === Content.length - 1) {
            setIndex(0);
          } else {
            setIndex(index);
          }
        }}
        renderItem={({ item }) => (
          <Cards item={item} />
        )}
      />
      <Header />
      <Text style={{ fontWeight: 600, fontSize: 24 }}>{index + 1} / {Content.length}</Text>
      <Buttons
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        index={index}
        setIndex={setIndex}
        carouselRef={carouselRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 24,
    gap: 24,
  },
});


export default Index;