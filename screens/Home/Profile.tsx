import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, Feather, Foundation } from "@expo/vector-icons";
import { profileCustomStyle, theme, Colors } from "../../theme/theme";
import { MyPurchaseItems } from "../../service/tempData";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AuthenticationService } from "../../service/authentication.service";
export default function ProfileScreen({ navigation }) {
  const Logout = async () => {
    await AuthenticationService.LoggingOut();
    navigation.navigate("Intro");
  };

  const renderPurchaseItems = (item: any) => {
    return (
      <View style={profileCustomStyle.purchaseItemCard}>
        <Image
          source={item?.item?.Image}
          style={profileCustomStyle.purchaseItemCardImage}
        />
        <Text style={profileCustomStyle.purchaseItemCardText}>
          {item?.item?.Name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
        >
          <Text style={profileCustomStyle.purchaseItemCardPriceText}>
            ${item?.item?.Price}
          </Text>
          <Ionicons name="cart-outline" size={14} color={Colors.secondary} />
        </View>
      </View>
    );
  };

  return (
    <View style={theme.container}>
      <View style={profileCustomStyle.contentContainer}>
        <View style={profileCustomStyle.headerContainer}>
          <View style={profileCustomStyle.headerToolbarContainer}>
            <Ionicons name="cart-outline" size={32} color="#FFFFFF" />
            <Ionicons
              name="settings-outline"
              size={32}
              color="#FFFFFF"
              style={{ marginHorizontal: 16 }}
            />
            <Ionicons name="chatbubbles-outline" size={32} color="#FFFFFF" />
          </View>
          <View style={profileCustomStyle.headerProfileContainer}>
            <View style={profileCustomStyle.headerProfileAvatarContainer}>
              <Image
                source={require("../../assets/images/Empty.png")}
                style={profileCustomStyle.headerProfileAvatar}
              />
            </View>
            <View style={profileCustomStyle.headerProfileTextContainer}>
              <View>
                <Text style={profileCustomStyle.headerProfileTextTitle}>
                  Mohammad Mollei
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 8,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={profileCustomStyle.headerProfileTextNormal}>
                  Followers : 0
                </Text>
                <Text style={profileCustomStyle.headerProfileTextNormal}>
                  Following : 3
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={() => Logout()}>
                <Ionicons
                  name="log-out-outline"
                  size={32}
                  color={Colors.light}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={profileCustomStyle.purchaseContainer}>
          <View style={profileCustomStyle.purchaseHeader}>
            <View style={profileCustomStyle.purchaseHeaderTextContainer}>
              <Ionicons
                name="settings-outline"
                size={24}
                color={Colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 14,
                }}
              >
                My Purchase
              </Text>
            </View>
            <View style={profileCustomStyle.purchaseHeaderTextContainer}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 14,
                }}
              >
                View Purchase History
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={Colors.primary}
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
        <View style={profileCustomStyle.purchaseStateContainer}>
          <View style={profileCustomStyle.purchaseStateItemContainer}>
            <Feather
              name="credit-card"
              size={32}
              color={Colors.primary}
              style={{ paddingVertical: 8 }}
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 10,
              }}
            >
              To Pay
            </Text>
          </View>
          <View style={profileCustomStyle.purchaseStateItemContainer}>
            <Feather
              name="shopping-bag"
              size={32}
              color={Colors.primary}
              style={{ paddingVertical: 8 }}
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 10,
              }}
            >
              To Ship
            </Text>
          </View>
          <View style={profileCustomStyle.purchaseStateItemContainer}>
            <Feather
              name="download"
              size={32}
              color={Colors.primary}
              style={{ paddingVertical: 8 }}
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 10,
              }}
            >
              To Receive
            </Text>
          </View>
          <View style={profileCustomStyle.purchaseStateItemContainer}>
            <Feather
              name="star"
              size={32}
              color={Colors.primary}
              style={{ paddingVertical: 8 }}
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 10,
              }}
            >
              To Rate
            </Text>
          </View>
        </View>
        <View style={profileCustomStyle.purchaseDealsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Foundation
              name="mobile-signal"
              size={32}
              color={Colors.secondary}
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: Colors.primary, fontSize: 12 }}>
              Deals , Top-Ups & Bills
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: 8 }}
          />
        </View>
        <View style={profileCustomStyle.purchaseItemsContainer}>
          <View style={profileCustomStyle.purchaseItemBuyAgainContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={Colors.primary}
                style={{ marginRight: 16 }}
              />
              <Text style={profileCustomStyle.purchaseItemBuyAgain}>
                Buy Again
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={profileCustomStyle.purchaseItemBuyAgain}>
                View more items
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={Colors.primary}
                style={{ marginRight: 16 }}
              />
            </View>
          </View>
          <FlatList
            horizontal
            data={MyPurchaseItems}
            keyExtractor={(item) => item.Name}
            renderItem={(item) => renderPurchaseItems(item)}
            contentInsetAdjustmentBehavior="never"
            snapToAlignment="center"
            decelerationRate="fast"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={{ backgroundColor: Colors.light, height: 232 }}></View>
    </View>
  );
}
