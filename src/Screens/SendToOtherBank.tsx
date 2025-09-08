import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import OtherBanktopbar from '../Components/otherBanktopbar';

const SendToOtherBank = () => {
  const navigation = useNavigation();

  const Bank = [
    {
      id: '1',
      title: 'Amara Bank',
      image: require('../assets/Banks/Amara.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '2',
      title: 'Zemen Bank',
      image: require('../assets/Banks/ZemenBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '3',
      title: 'Commerical Bank of Ethiopia',
      image: require('../assets/Banks/commercialBank.png'),
      onpress: () => {
        navigation.navigate('EnterAccountNumber');
      },
    },
    {
      id: '4',
      title: 'Dashen Bank',
      image: require('../assets/Banks/DashenBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '5',
      title: 'Bank of Abyssinia ',
      image: require('../assets/Banks/Absiniya.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '6',
      title: 'Awash International      Bank',
      image: require('../assets/Banks/AwashBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '7',
      title: 'Commerical Bank of Ethiopia',
      image: require('../assets/Banks/commercialBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '8',
      title: 'Amara Bank',
      image: require('../assets/Banks/Amara.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '9',
      title: 'Zemen Bank',
      image: require('../assets/Banks/ZemenBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '10',
      title: 'Bank of Abyssinia ',
      image: require('../assets/Banks/Absiniya.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '11',
      title: 'Awash International      Bank',
      image: require('../assets/Banks/AwashBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '12',
      title: 'Dashen Bank',
      image: require('../assets/Banks/DashenBank.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
    onPress={item.onpress}
    
    
    style={styles.BanksContainer}>
      <Image source={item.image} style={styles.BanksImage} />
      <Text style={styles.BanksName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = text => {
    setSearchText(text);
    // You can add your search/filter logic here
    console.log('Search text:', text);
  };

  return (
    <View style={styles.Container}>
     <OtherBanktopbar title="Transfer to Other Bank" />

      <ScrollView>
        <View style={styles.searchinput}>
          <View>
            <Image
              source={require('../assets/SearchIcons.png')}
              style={styles.searchicon}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Search Bank"
              value={searchText}
              onChangeText={handleSearchChange}
              clearButtonMode="while-editing" // iOS specific: adds a clear button
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <Text style={styles.selectBankText}>Select a Bank</Text>
        <FlatList
          data={Bank}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
        />
      </ScrollView>
    </View>
  );
};

export default SendToOtherBank;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  searchinput: {
    flexDirection: 'row',
    height: 50,
    width: '95%',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '3%',

    alignItems: 'center',
  },
  input: {
    color: 'gray',
  },
  searchicon: {
    width: 24,
    height: 24,
  },
  selectBankText: {
    marginHorizontal: '3%',
    marginTop: '3%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  BanksContainer: {
    flex: 1,
    maxWidth: 127,
    height: 127,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  BanksImage: {
    width: 95,
    height: 57,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  BanksName: {
    textAlign: 'center',
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 5, // 🔽 small padding around grid
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start', // 🔽 items align from left
  },
});
