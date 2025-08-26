import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const StudentProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const processLoginData = () => {
    if (!profile?.loginActivity || profile.loginActivity.length === 0) {
      return { labels: [], data: [] };
    }

    const sortedLogins = [...profile.loginActivity].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

    const loginCountByDate = sortedLogins.reduce((acc, login) => {
      const dateObj = new Date(login.date);
      const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    const dailyLogins = Object.keys(loginCountByDate)
      .map(date => ({
        date,
        count: loginCountByDate[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const recentLogins = dailyLogins.slice(-7);

    const labels = recentLogins.map(day => {
      const [year, month, dayOfMonth] = day.date.split('-');
      return `${dayOfMonth}/${month}`;
    });

    const data = recentLogins.map(day => day.count);

    return { labels, data };
  };

  const loginData = processLoginData();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>No profile data found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Profile</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {profile.photoUrl ? (
            <Image source={{ uri: profile.photoUrl }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
              <Text style={styles.initialsText}>
                {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text style={styles.departmentText}>{profile.department}</Text>
            <View style={styles.idContainer}>
              <Icon name="badge" size={16} color="#555" />
              <Text style={styles.idText}>{profile.studentId}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.loginCount || 0}</Text>
            <Text style={styles.statLabel}>Total Logins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.studyProgress || 0}%</Text>
            <Text style={styles.statLabel}>Study Progress</Text>
          </View>
        </View>

        {/* Button to navigate to the update password screen */}
        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={() => navigation.navigate('UpdatePassword')}
        >
          <Text style={styles.updateButtonText}>Update Password</Text>
        </TouchableOpacity>

        {/* Login Activity Chart */}
       

        {/* Additional Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="email" size={20} color="#555" />
            <Text style={styles.detailText}>{profile.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="school" size={20} color="#555" />
            <Text style={styles.detailText}>{profile.department}</Text>
          </View>
       
            
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 15,
  },
  profileImagePlaceholder: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  initialsText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  departmentText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 25,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default StudentProfileScreen;