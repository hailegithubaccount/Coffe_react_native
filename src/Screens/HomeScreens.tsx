import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categories = ['All', 'Tea', 'Coffee', 'Milk'];

const itemsByCategory = {
  All: [
    { name: 'Green Tea', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80', description: 'Fresh and calming green tea.', price: '$2', type: 'Bean', ingredients: 'Africa' },
    { name: 'Espresso Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80', description: 'Strong and rich espresso.', price: '$3', type: 'Bean', ingredients: 'Africa' },
    { name: 'Organic Milk', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80', description: 'Fresh organic cow milk.', price: '$1.5', type: 'Bean', ingredients: 'Africa' },
  ],
  Tea: [{ name: 'Green Tea', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80', description: 'Fresh and calming green tea.', price: '$2', type: 'Bean', ingredients: 'Africa' }],
  Coffee: [{ name: 'Espresso Coffee', image: 'https://images.unsplash.com/photo-1587037030272-4dfe57b47c2d?auto=format&fit=crop&w=100&q=80', description: 'Strong and rich espresso.', price: '$3', type: 'Bean', ingredients: 'Africa' }],
  Milk: [{ name: 'Organic Milk', image: 'https://images.unsplash.com/photo-1601412436969-4fca4d5c3a03?auto=format&fit=crop&w=100&q=80', description: 'Fresh organic cow milk.', price: '$1.5', type: 'Bean', ingredients: 'Africa' }],
};

const HomeScreens = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = Math.floor((screenWidth - 40) / 2);
  const itemHeight = 240;

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: itemWidth, height: itemHeight }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.priceOrderContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('details', { product: item })}
          style={styles.button}>
          <Text style={{ color: 'black' }}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }
        const response = await axios.get(
          'https://backend-rendered-1.onrender.com/api/students/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === 'success') {
          setProfile(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
 
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.imagewithicon}>
        <Icon name="menu" size={34} color="orange" />

        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          {profile && profile.photoUrl ? (
            <Image 
              source={{ uri: profile.photoUrl }} 
              style={styles.profileImage}
            />
          ) : profile ? (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitials}>
                {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
              </Text>
            </View>
          ) : (
            <View style={styles.profilePlaceholder}>
              <Icon name="person" size={24} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Header text */}
      <Text style={styles.headerText}>FIND THE BEST COFFEE FOR YOU</Text>

      {/* Categories */}
      <View style={styles.catgoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catagores, selectedCategory === cat && styles.selectedCategory]}
            onPress={() => setSelectedCategory(cat)}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items grid */}
      <FlatList
        data={itemsByCategory[selectedCategory]}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: COLORS.primaryBlackHex,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagewithicon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: '#21262E',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 36,
    marginTop: 25,
    marginHorizontal: 20,
    color: '#FFFFFF',
  },
  catgoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  catagores: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  selectedCategory: {
    backgroundColor: 'orange',
  },
  categoryText: {
    color: 'white',
    fontSize: 15,
  },
  list: {
    margin: 10,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    marginTop: 4,
  },
  price: {
    color: 'orange',
    fontWeight: '600',
    marginTop: 6,
  },
  button: {
    width: 60,
    height: 30,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  priceOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default HomeScreens;