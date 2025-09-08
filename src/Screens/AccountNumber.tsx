import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';

const EnterAccountNumber = ({ navigation }) => {
  // Previous transfers (history)
  const [history] = useState([
    {
      id: '1',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      image: require('../assets/Banks/commercialBank.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
    {
      id: '2',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      image: require('../assets/Banks/commercialBank.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
    {
      id: '3',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      image: require('../assets/Banks/commercialBank.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
  ]);

  // Fake accounts database
  const accounts = [
    {
      AccountNumber: '100004234546',
      holder: 'Kebede Lema Ayenew',
      image: require('../assets/Banks/photouser.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
      ImageBackground: require('../assets/Banks/backroundforaccounr.png'),
    },
    { AccountNumber: '789101', holder: 'Alice Smith' },
    { AccountNumber: '555666', holder: 'Michael Brown' },
    { AccountNumber: '999888', holder: 'Sarah Johnson' },
  ];

  // State for input and matching
  const [account, setAccount] = useState('');
  const [matchedAccounts, setMatchedAccounts] = useState([]);

  useEffect(() => {
    if (account === '') {
      setMatchedAccounts([]);
    } else {
      const matches = accounts.filter((a) =>
        a.AccountNumber.startsWith(account)
      );
      setMatchedAccounts(matches);
    }
  }, [account]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <OtherBanktopbar title="Transfer to Other Bank" />
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.TopText}>
              <Text style={styles.FirstText}>Enter Account Number</Text>
              <Text style={styles.SecondText}>
                Enter recipient account number
              </Text>
            </View>

            <View>
              <Text style={styles.accountText}>Account Number</Text>

              {/* Input box using device keyboard */}
              <TextInput
                style={styles.input}
                placeholder="000000000000"
                value={account}
                onChangeText={setAccount}
                keyboardType="number-pad"
                autoFocus={true}
              />

              {account === '' ? (
                <View style={{ marginHorizontal: '3%', marginTop: 10 }}>
                  <Text style={styles.historyHeaderText}>Beneficiaries</Text>
                  <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.HistoryBox}>
                        <View style={styles.both}>
                          <Image source={item.image} style={styles.bankimage} />
                          <View>
                            <Text style={styles.historyItem}>{item.name}</Text>
                            <Text style={styles.historyItem2}>
                              {item.bankname}{' '}
                              <Text>({item.AccountNumber})</Text>
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('TypeMoney', {
                              AccountNumber: item.AccountNumber,
                            })
                          }
                        >
                          <Image source={item.imageback} style={styles.backicon} />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              ) : matchedAccounts.length > 0 ? (
                <FlatList
                  data={matchedAccounts}
                  keyExtractor={(item) => item.AccountNumber}
                  renderItem={({ item }) => (
                    <ImageBackground
                      source={item.ImageBackground}
                      style={styles.backgroundimage}
                    >
                      <View style={styles.AccountBox}>
                        <View style={styles.bothimageandtextfordisplayaccount}>
                          <View
                            style={{
                              width: 65,
                              height: 65,
                              borderWidth: 1,
                              borderRadius: 50,
                              justifyContent: 'center',
                              alignContent: 'center',
                            }}
                          >
                            <Image
                              source={item.image}
                              style={styles.imageofaccountdisplay}
                            />
                          </View>
                          <View style={styles.holderPLUSaccount}>
                            <Text style={styles.holderName}>{item.holder}</Text>
                            <Text style={styles.holderAccount}>
                              {item.AccountNumber}
                            </Text>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('TypeMoney', {
                                AccountNumber: item.AccountNumber,
                              })
                            }
                          >
                            <Image
                              source={item.imageback}
                              style={styles.backiconforaccount}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  )}
                />
              ) : (
                <View style={styles.accountInfo}>
                  <Text style={styles.notFoundText}>Account not found</Text>
                </View>
              )}
            </View>
          </View>

          {/* Floating Bottom Button */}
          <View style={[styles.bottomButton, { bottom: 20 }]}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                if (account !== '') {
                  console.log('Check account:', account);
                } else {
                  console.log('Go Next');
                }
              }}
            >
              <Text style={styles.nextButtonText}>
                {account !== '' ? 'Check Account ' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EnterAccountNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TopText: {
    marginHorizontal: '3%',
    marginTop: '3%',
  },
  FirstText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  SecondText: {
    fontSize: 16,
    color: '#757575',
  },
  accountText: {
    marginTop: '10%',
    marginHorizontal: '3%',
    fontSize: 14,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    margin: 12,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
  },
  historyHeaderText: {
    fontSize: 18,
    marginBottom: 8,
    color: Colors.third,
  },
  historyItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  historyItem2: {
    fontSize: 14,
    color: Colors.third,
  },
  accountInfo: {
    marginTop: 10,
    marginHorizontal: '3%',
  },
  imageofaccountdisplay: {
    width: 58,
    height: 58,
  },
  bothimageandtextfordisplayaccount: {
    flexDirection: 'row',
    gap: 10,
  },
  holderAccount: {},
  holderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
  holderPLUSaccount: {
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  HistoryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.third,
  },
  backicon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  bankimage: {
    width: 44,
    height: 44,
  },
  both: {
    flexDirection: 'row',
    gap: 10,
  },
  bottomButton: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundimage: {
    marginHorizontal: '3%',
    borderRadius: 50,
  },
  AccountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
  },
  backiconforaccount: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    marginTop: '4%',
  },
});
