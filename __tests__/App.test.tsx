/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
export const Favour = () => {
    const navigation = useNavigation();
    return (
        <View>
            {/* tobbar */}
            <View
                style={{
                    flexDirection: 'row',
                    gap: 20,
                    marginTop: 50,
                    marginLeft: 10,
                }}
            >
                <TouchableOpacity

                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require('../assets/lefticons.png')}
                        style={{
                            width: 20,
                            height: 20,
                        }} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                    }}

                >Create PIN</Text>
            </View>


            {/* text */}
            <View style={{
                marginHorizontal: 20,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontWeight: 700,
                        fontSize: 20,
                        fontStyle: 'bold'
                    }}>
                    You are almost finished
                </Text>
                <Text
                    style={{
                        marginTop: 1,
                        fontWeight: 400,
                        fontSize: 14,
                        color: '#8A8A8A',
                    }}>
                    You're just one step away! Set up your secure PIN to complete the setup and access your account.                   </Text>


            </View>

            {/* logo */}
            <Image
                source={require('../assets/dashenlogo.png')}
                style={{
                    top: 60,
                    left: 151,
                    width: 72,
                    height: 72,
                }} />
            <View />
        </View>
    );
};
