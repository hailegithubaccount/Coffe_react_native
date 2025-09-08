import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';
import Modal from 'react-native-modal';

const TypeMoney = ({ route, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const { AccountNumber } = route.params || {};
  const [selectedAccount, setSelectedAccount] = useState(AccountNumber || null);

  const [isModalVisible, setIsModalVisible] = useState(false); // Account Modal
  const [nextModalVisible, setNextModalVisible] = useState(false); // Budget + Category Modal
  const [tempSelection, setTempSelection] = useState(selectedAccount);

  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = key => setAmount(prev => prev + key);
  const handleBackspace = () => setAmount(prev => prev.slice(0, -1));

  const Bank = [
    {
      id: '1',
      title: 'House Rental',
      amount: '10,000',
      image: require('../assets/inthebottomsheet/House.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'House Rental',
          amount: '10,000',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
    {
      id: '2',
      title: 'Loan',
      amount: '5,000',
      image: require('../assets/inthebottomsheet/Loan.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'Loan',
          amount: '5,000',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
    {
      id: '3',
      title: 'Groceries',
      amount: '10,000',
      image: require('../assets/inthebottomsheet/Grocerry.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'Groceries',
          amount: '10,000',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
    {
      id: '4',
      title: 'Food',
      amount: '6,000',
      image: require('../assets/inthebottomsheet/Food.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'Food',
          amount: '6,000',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
    {
      id: '5',
      title: 'Transport',
      amount: '1,500',
      image: require('../assets/inthebottomsheet/Transport.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'Transport',
          amount: '1,500',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
    {
      id: '6',
      title: 'Other',
      amount: '1,000',
      image: require('../assets/inthebottomsheet/otherss.png'),
      onpress: () =>
        navigation.navigate('ConfirmTransfer', {
          reason: 'Other',
          amount: '1,000',
          accountNumber: selectedAccount,
          recipientName: 'John Doe',
          isBudgetEnabled: isEnabled,
        }),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.onpress} style={styles.BanksContainer}>
      <Image source={item.image} style={styles.BanksImage} />
      <Text style={styles.BanksName}>{item.title}</Text>
      <Text style={styles.amount}>{item.amount} ETB</Text>
    </TouchableOpacity>
  );

  const accounts = [
    { id: '1', number: '1234 5678 9012' },
    { id: '2', number: '9876 5432 1098' },
    { id: '3', number: '1122 3344 5566' },
  ];

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="Transfer to Other Bank" />

      <ScrollView>
        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setShowKeyboard(true);
              Keyboard.dismiss(); // optional: hide default keyboard
            }}
          >
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>
                {amount !== '' ? `${amount} Birr` : '0 Birr'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Select Account */}
        <Text style={styles.SelectText}>Select Account</Text>
        <TouchableOpacity
          onPress={() => {
            setTempSelection(selectedAccount);
            setIsModalVisible(true); // open account modal
          }}
          style={styles.borderSelecetAccount}
        >
          <Text style={styles.SelectAccount}>
            {selectedAccount ? selectedAccount : 'Select Account'}
          </Text>
          <Image
            source={require('../assets/Downicon.png')}
            style={styles.downicon}
          />
        </TouchableOpacity>

        {/* Available Balance */}
        <View style={styles.monay}>
          <Text style={{ fontSize: 16, color: Colors.third }}>
            Available Amount:
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
              {' '}
              ETB 20,000.00
            </Text>
          </Text>
        </View>

        {/* Number Keyboard */}
        {showKeyboard && (
          <View style={styles.keyboardContainer}>
            <View style={styles.numberGrid}>
              {numberKeys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map(key => (
                    <TouchableOpacity
                      key={key}
                      style={styles.key}
                      onPress={() => handleKeyPress(key)}
                    >
                      <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('.')}
                >
                  <Text style={styles.keyText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('0')}
                >
                  <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.key} onPress={handleBackspace}>
                  <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Next Button */}
        <View style={styles.bottomButton}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss(); // hide keyboard before opening modal
              setNextModalVisible(true); // open budget modal
            }}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Account Selection Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.bottomModal}
      >
        <View style={[styles.modalContent, { maxHeight: 400 }]}>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.modalBtn,
                { backgroundColor: 'rgba(71,99,255,0.1)' },
              ]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalBtn,
                { backgroundColor: 'rgba(71,99,255,0.1)' },
              ]}
              onPress={() => {
                setSelectedAccount(tempSelection);
                setIsModalVisible(false);
              }}
            >
              <Text style={{ color: 'green', fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>Select Account</Text>
          <ScrollView>
            {accounts.map(acc => {
              const isSelected = tempSelection === acc.number;
              return (
                <TouchableOpacity
                  key={acc.id}
                  style={[
                    styles.accountRow,
                    {
                      borderColor: isSelected ? 'black' : 'gray',
                      backgroundColor: isSelected
                        ? 'rgba(71,99,255,0.15)'
                        : 'rgba(71,99,255,0.1)',
                    },
                  ]}
                  onPress={() => setTempSelection(acc.number)}
                >
                  <Image
                    source={
                      isSelected
                        ? require('../assets/rightwithcricle.png')
                        : require('../assets/Ellipse20.png')
                    }
                    style={{ width: 15, height: 15, marginRight: 10 }}
                  />
                  <Image
                    source={require('../assets/house.png')}
                    style={{ width: 30, height: 20, marginRight: 8 }}
                  />
                  <Text
                    style={[
                      styles.accountNumber,
                      { color: isSelected ? Colors.primary : 'black' },
                    ]}
                  >
                    {acc.number}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      {/* Budget + Category Modal */}
      <Modal
        isVisible={nextModalVisible}
        onBackdropPress={() => setNextModalVisible(false)}
        style={styles.bottomModal}
      >
        <View style={[styles.modalContent, { maxHeight: 500 }]}>
          <View style={styles.modalButtons}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
              Budget selection on Transfers
            </Text>
            <TouchableOpacity
              style={[
                styles.modalBtn,
                { backgroundColor: 'rgba(71,99,255,0.1)' },
              ]}
              onPress={() => setNextModalVisible(false)}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Budget selection on Transfers</Text>
            <Switch
              trackColor={{ false: '#767577', true: Colors.primary }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <FlatList
            data={Bank}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TypeMoney;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  amountContainer: { marginTop: 3, marginHorizontal: '5%' },
  amountBox: { marginTop: '35%', padding: 15, alignItems: 'center' },
  amountText: { fontSize: 48, fontWeight: 'bold', color: Colors.primary },
  SelectText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.third,
    marginBottom: '2%',
  },
  SelectAccount: { textAlign: 'center', fontSize: 16, color: Colors.third },
  downicon: { width: 11, height: 6, alignSelf: 'center' },
  monay: { marginTop: '5%', alignSelf: 'center' },
  borderSelecetAccount: {
    flexDirection: 'row',
    gap: 10,
    width: 160,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  keyboardContainer: {
    marginTop: '5%',
    backgroundColor: '#FBFBFB',
    height: 290,
    padding: 10,
  },
  numberGrid: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 124,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 31 },
  bottomButton: { marginHorizontal: '3%', marginTop: '20%' },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: '2%' },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    marginTop: '2%',
    height: 50,
    borderRadius: 10,
  },
  accountNumber: { flex: 1, fontSize: 16, fontWeight: 'bold' },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    paddingVertical: '2%',
    paddingHorizontal: '6%',
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: '3%',
  },
  BanksContainer: {
    flex: 1,
    maxWidth: 120,
    height: 65,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  BanksImage: { width: 24, height: 24, resizeMode: 'contain', marginBottom: 6 },
  BanksName: { textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
  amount: { color: Colors.primary, fontWeight: '600' },
  gridContainer: { paddingVertical: 10 },
});
