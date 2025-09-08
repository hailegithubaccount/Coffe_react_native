import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const OtherBanktopbar = ({ title = 'Default Title' }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.headerSafe}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Back.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        {/* Dynamic Title */}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default OtherBanktopbar;

const styles = StyleSheet.create({
  headerSafe: {
    backgroundColor: '#fff',
    zIndex: 999,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: '5%',
    alignItems: 'center',
    height: 50,
    marginTop: '12%',
  },
  headerTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:'Outfit-Black',
  },
  iconImage: {
    width: 34,
    height: 34,
  },
});
