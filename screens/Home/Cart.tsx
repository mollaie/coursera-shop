import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors, theme } from "../../theme/theme";
import { Dimensions, StyleSheet } from "react-native";
import { CartItems } from "../../service/tempData";
import { cartCustomStyle } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function CartScreen({ navigation }) {
  console.log(CartItems);
  const [data, setdata] = useState(CartItems);

  const EmptyContainer = () => {
    return (
      <View style={cartCustomStyle.emptyContainer}>
        <Image
          source={require("../../assets/images/Empty.png")}
          style={cartCustomStyle.emptyImage}
        />
        <Text style={cartCustomStyle.emptyText}>Your cart is empty.</Text>
      </View>
    );
  };

  const RenderCartItem = (item: any) => {
    return (
      <View style={cartCustomStyle.cartItem}>
        <Image source={item.item.Image} style={cartCustomStyle.cartItemImage} />
        <View>
          <Text style={cartCustomStyle.cartItemTitle}>{item.item.Name}</Text>
          <Text style={cartCustomStyle.cartItemPrice}>${item.item.Price}</Text>
          <View style={cartCustomStyle.cartItemButtonContainer}>
            <TouchableOpacity style={cartCustomStyle.cartItemButton}>
              <Ionicons name="add-outline" size={16} color={Colors.light} />
            </TouchableOpacity>
            <Text style={cartCustomStyle.cartItemText}>1</Text>
            <TouchableOpacity style={cartCustomStyle.cartItemButton}>
              <Ionicons name="remove-outline" size={16} color={Colors.light} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const RenderCartItems = () => {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.Name}
          renderItem={(item) => RenderCartItem(item)}
          style={{ width, padding: 16 }}
        />
        <View style={cartCustomStyle.cartItemFooterContainer}>
          <View style={cartCustomStyle.cartItemFooterTextContainer}>
            <Text style={cartCustomStyle.cartItemFooterText}>Total:</Text>
            <Text style={cartCustomStyle.cartItemFooterText}>$9,000</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{ ...theme.button, ...theme.primaryButton }}
            >
              <Text
                style={{
                  ...theme.buttonPrimaryText,
                  ...theme.buttonDefaultText,
                }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: Colors.light, flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.light,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: width / 4,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            width,
            paddingLeft: 32,
            marginTop: 16,
          }}
        >
          My Cart
        </Text>
        <View>
          {data.length == 0 ? <EmptyContainer /> : <RenderCartItems />}
        </View>
      </View>
    </View>
  );
}
