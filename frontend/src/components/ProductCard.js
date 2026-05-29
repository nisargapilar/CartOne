import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { addToCart } from '../api/client';

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product.id, 1);
      Alert.alert('Success', `"${product.name}" added to cart!`);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add to cart.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={product.stock > 0 ? styles.inStock : styles.outOfStock}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, product.stock === 0 && styles.buttonDisabled]}
          onPress={handleAddToCart}
          disabled={product.stock === 0 || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.buttonText}>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  inStock: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  outOfStock: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});