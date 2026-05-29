import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { clearCart } from "../api/client";

export default function OrderSummaryScreen({ navigation, route }) {
  const { items, total } = route.params;

  const handlePlaceOrder = async () => {
    try {
      await clearCart();
      if (Platform.OS === "web") {
        window.alert("Order placed successfully!");
        navigation.navigate("Products");
      } else {
        Alert.alert(
          "Order Placed!",
          "Your order has been placed successfully.",
          [{ text: "OK", onPress: () => navigation.navigate("Products") }],
        );
      }
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Failed to place order. Please try again.");
      } else {
        Alert.alert("Error", "Failed to place order. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.lineTotal}>₹{item.lineTotal}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#6C63FF",
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: { color: "#fff", fontSize: 16, width: 60 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  list: { padding: 16 },
  row: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  rowLeft: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  qty: { fontSize: 13, color: "#666", marginTop: 4 },
  lineTotal: { fontSize: 16, fontWeight: "bold", color: "#6C63FF" },
  footer: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold", color: "#333" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "#6C63FF" },
  placeOrderButton: {
    backgroundColor: "#27ae60",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
