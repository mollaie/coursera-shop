import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Colors, productCustomStyle, theme } from "../../theme/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
export default function ProductScreen({ navigation, route }) {
  const [Product, setProduct] = useState(route.params?.item);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const IMAGE_WIDTH = width - 64;
  const renderSwipeItem = (item: any) => {
    let index = item.index;
    return (
      <TouchableOpacity onPress={() => setCurrentIndex(index)}>
        <View
          style={{
            borderBottomColor:
              CurrentIndex === index ? Colors.dark : Colors.lightDark,
            borderBottomWidth: 2,
            width: (width - 128) / Product?.Sliders?.length,
            marginHorizontal: 8,
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  const renderSwipeImage = (item: any) => {
    return (
      <View
        style={{
          width,
        }}
      >
        <TouchableOpacity>
          <Image
            source={item?.item?.Image}
            style={{ width: IMAGE_WIDTH, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={productCustomStyle.Container}>
      <View style={productCustomStyle.CarouselContainer}>
        <FlatList
          horizontal
          data={Product.Sliders}
          keyExtractor={(item: any) => item.Name}
          renderItem={(item: any) => renderSwipeImage(item)}
          pagingEnabled={true}
          automaticallyAdjustContentInsets={true}
          showsVerticalScrollIndicator={false}
          snapToAlignment={"start"}
          snapToInterval={IMAGE_WIDTH + 10}
          decelerationRate={"fast"}
        />
        <Text style={{ fontSize: 28, marginTop: 16 }}>
          Premium {Product?.Name}
        </Text>
        <Text style={{ color: Colors.gray, fontSize: 15, marginTop: 8 }}>
          Subhead {Product.Name} content
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
            marginVertical: 16,
          }}
        ></View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 16, marginVertical: 16 }}>Color</Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  ...productCustomStyle.Ball,
                  backgroundColor: "#D8F0D6",
                }}
              ></View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                  backgroundColor: "#FFE9D9",
                }}
              ></View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                  backgroundColor: "#9598FE",
                }}
              ></View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                  backgroundColor: "#7FBCFE",
                }}
              ></View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 16, marginVertical: 16 }}>Size</Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  ...productCustomStyle.Ball,
                }}
              >
                <Text style={{ color: Colors.light }}>S</Text>
              </View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                }}
              >
                <Text style={{ color: Colors.light }}>M</Text>
              </View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                }}
              >
                <Text style={{ color: Colors.light }}>L</Text>
              </View>
              <View
                style={{
                  ...productCustomStyle.Ball,
                }}
              >
                <Text style={{ color: Colors.light }}>XL</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={{ ...theme.button, ...theme.primaryButton }}>
            <Text style={theme.buttonPrimaryText}>Add to Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
