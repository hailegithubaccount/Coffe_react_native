import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../Components/Colors';
import OtherBanktopbar from '../Components/otherBanktopbar';

const SuccessfulTransaction = ({ route, navigation }) => {
  const { amount, accountNumber, recipientName, isBudgetEnabled, reason } =
    route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={require('../assets/successfully-done2.png')}
          style={styles.imageofrigth}
        />

        <Text style={styles.bigtext}>Money Successfully Sent!</Text>
        <Text style={styles.nexttext}>
          You have successfully sent money! Thank you for using our service.
        </Text>
        <Text style={styles.Amounttext}>
          {amount}.00
          <Text
            style={{
              fontSize: 16,
            }}
          >
            (ETB)
          </Text>
        </Text>
      </View>

      <View style={styles.transactionBox}>
        <View style={styles.content}>
          <Text style={styles.firstText}>Sender Account:</Text>
          <Text style={styles.secondText}>Abebe Ayele Girma</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.firstText}>Recipient Account:</Text>
          <Text style={styles.secondText}>{accountNumber}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.firstText}>Recipient Name:</Text>
          <Text style={styles.secondText}>{recipientName}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.firstText}>Budget Type:</Text>
          <Text style={styles.secondText}>
            {isBudgetEnabled ? 'ON Budget' : 'OFF Budget'}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.firstText}>Fee:</Text>
          <Text style={styles.secondText}>0.00 ETB</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.totalText}>Total Amount:</Text>
          <Text style={styles.secondText}>{amount} ETB</Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.totalText2}>status:</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              backgroundColor: '#ddf5d6ff',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Image
              source={require('../assets/righticons.png')}
              style={{
                width: 10,
                height: 10,

                alignSelf: 'center',
              }}
            />
            <Text style={styles.seccuessText}>Success</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 10,
            borderWidth: 1,
            borderColor: Colors.third,
            width: 150,
            height: 50,
            justifyContent: 'center',
            borderRadius: 10,

            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/uit_print.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 20,
            borderWidth: 1,
            width: 150,
            height: 50,
            justifyContent: 'center',
            borderColor: Colors.third,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/uit_print.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Print
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.nextButton}
        onPress={()=>navigation.goBack()}
        
        >

          <Text style={styles.nextButtonText}>Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessfulTransaction;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10, color: '#444' },
  value: { fontSize: 16, marginTop: 2, color: 'black' },
  doneButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  doneText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  box: {
    backgroundColor: '#F2FFF7',
    marginTop: '20%',
  },
  imageofrigth: {
    width: 170,
    height: 170,

    alignSelf: 'center',
  },
  nexttext: {
    fontSize: 16,
    color: Colors.third,
    textAlign: 'center',
  },
  bigtext: {
    fontSize: 28,
    textAlign: 'center',
  },
  Amounttext: {
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '10%',
  },
  transactionBox: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  content2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignContent: 'center',
  },
  totalText2: {
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  firstText: { fontSize: 14 },
  secondText: { fontSize: 16 },
  totalText: { fontSize: 14 },
  seccuessText: {
    color: 'green',

    fontSize: 16,
    fontWeight: '500',
  },
  bottomButton: { marginHorizontal: '3%', marginTop: '10%' },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
