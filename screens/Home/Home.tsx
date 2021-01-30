import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors, theme, homeCustomStyle } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import SegmentedControl from "../../components/Shared/Segment";

import { HomeData } from "../../service/tempData";
export default function Home({ navigation }) {
  const [tabIndex, setTabIndex] = React.useState(1);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const CardItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={homeCustomStyle.CardContainer}
        onPress={() => navigation.push("Product", { item })}
      >
        <View style={homeCustomStyle.CardImageContainer}>
          <Image source={item.Image} style={{ width: 114, height: 104 }} />
        </View>
        <View style={homeCustomStyle.CardTextContainer}>
          <View style={{ flexDirection: "column", width: 140 }}>
            <Text style={{ color: Colors.dark, textAlign: "left" }}>
              {item.Name}
            </Text>
            <Text
              style={{ color: Colors.dark, textAlign: "left", fontSize: 10 }}
            >
              ${item.Price}
            </Text>
          </View>
          <Ionicons name="heart-outline" size={16} color="#000000" />
        </View>
      </TouchableOpacity>
    );
  };

  const BestItemCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={homeCustomStyle.SecondCardContainer}
        onPress={() => navigation.push("Product", { item })}
      >
        <View style={homeCustomStyle.SecondCardImageContainer}>
          <Image source={item.Image} style={{ width: 124, height: 104 }} />
        </View>
        <View style={homeCustomStyle.SecondCardTextContainer}>
          <View style={{ flexDirection: "column", width: 110 }}>
            <Text style={{ color: Colors.dark, textAlign: "left" }}>
              {item.Name}
            </Text>
            <Text
              style={{ color: Colors.dark, textAlign: "left", fontSize: 10 }}
            >
              ${item.Price}
            </Text>
          </View>
          <Ionicons name="heart-outline" size={16} color="#000000" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ ...theme.container, backgroundColor: Colors.light }}>
      <View style={homeCustomStyle.HeaderContainer}>
        <View style={homeCustomStyle.SearchBarContainer}>
          <View style={homeCustomStyle.SearchBar}>
            <TextInput
              placeholder="Search Now"
              style={homeCustomStyle.SearchBarText}
            />
            <Ionicons
              name="search-outline"
              size={16}
              color="#000000"
              style={homeCustomStyle.SearchBarIcon}
            />
          </View>
          <TouchableOpacity
            style={{ ...homeCustomStyle.SearchButton, marginLeft: 8 }}
          >
            <Ionicons name="qr-code-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...homeCustomStyle.SearchButton, marginLeft: 8 }}
          >
            <Ionicons name="mic-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={homeCustomStyle.ToolbarContainer}>
          <SegmentedControl
            tabs={["Chair", "CupBoard", "Table", "Accessories", "Furniture"]}
            currentIndex={tabIndex}
            onChange={handleTabsChange}
            segmentedControlBackgroundColor={Colors.transparent}
            activeSegmentBackgroundColor={Colors.lightDark}
            activeTextColor={Colors.dark}
            textColor={Colors.lightDark}
            paddingVertical={18}
          />
        </View>
      </View>
      <ScrollView style={homeCustomStyle.homeContainer}>
        <FlatList
          horizontal
          data={HomeData.FirstSection}
          style={{ backgroundColor: Colors.transparent, height: 250 }}
          contentContainerStyle={{ paddingVertical: 16 }}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          renderItem={CardItem}
          keyExtractor={(item) => item.Name}
        />
        <Text style={{ fontSize: 22 }}>Best Product</Text>
        <FlatList
          data={HomeData.FirstSection}
          style={{ backgroundColor: Colors.transparent, paddingBottom: 128 }}
          contentContainerStyle={{ paddingVertical: 16 }}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          renderItem={BestItemCard}
          keyExtractor={(item) => item.Name}
        />
      </ScrollView>
    </View>
  );
}
