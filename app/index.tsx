import { Content } from '@/constants/Content';
import { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Feather from '@expo/vector-icons/Feather';

function Index() {
  const [index, setIndex] = useState<number>(0);
  const width = Dimensions.get('window').width - 20;
  const height = Dimensions.get('window').height - 350;

  const carouselRef = useRef<ICarouselInstance>(null);

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ index: index - 1, animated: true });
      }
    }
  };

  const handleNext = () => {
    if (index < Content.length - 1) {
      setIndex((prev) => prev + 1);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ index: index + 1, animated: true });
      }
    }
  };

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
            style={{
              flex: 1,
              width: "100%",
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              gap: 10,
              padding: 10,
              position: 'relative',
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 0, position: "absolute", }}
              source={{
                uri: Content[index].qImage,
              }}
            />

            {/* templ part */}
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20 }}>
            {index}
            </Text>
            {/* temp part */}

            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20 }}>
              {Content[index].question}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '800', padding: 10, backgroundColor: "white", borderRadius: 20 }}>
              {Content[index].answer}
            </Text>
          </View>
        )}
      />

      
      <View style={{ height: "10%", display: "flex", flexDirection: "row", gap: 10, marginTop: 10, justifyContent: "space-between" }}>
        
        {/* THE LEFT BUTTON */}
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

        {/* THE RIGHT BUTTON */}
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
