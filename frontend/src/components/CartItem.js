import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartItem({ item, onUpdate, onRemove }) {
  const atStockLimit = item.quantity >= item.stock;

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} each</Text>
        <Text style={styles.lineTotal}>Total: ₹{item.lineTotal}</Text>
        {atStockLimit && (
          <Text style={styles.stockWarning}>Max stock reached ({item.stock} available)</Text>
        )}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => onUpdate(item.productId, item.quantity - 1)}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.qtyButton, atStockLimit && styles.qtyButtonDisabled]}
            onPress={() => onUpdate(item.productId, item.quantity + 1)}
            disabled={atStockLimit}
          >
            <Text style={[styles.qtyButtonText, atStockLimit && styles.qtyButtonTextDisabled]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(item.productId)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  lineTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 4,
  },
  stockWarning: {
    fontSize: 11,
    color: '#e74c3c',
    marginBottom: 6,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    backgroundColor: '#f0f0f0',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    backgroundColor: '#e0e0e0',
    opacity: 0.5,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyButtonTextDisabled: {
    color: '#999',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeText: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: 'bold',
  },
});