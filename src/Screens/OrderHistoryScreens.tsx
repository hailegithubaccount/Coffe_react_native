import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, ImageBackground } from 'react-native';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const sizes = [
    { label: 'Small', multiplier: 1 },
    { label: 'Medium', multiplier: 1.5 },
    { label: 'Large', multiplier: 2 },
];

const OrderScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(1);

    // Extract base price number from product.price string (e.g. '$3' -> 3)
    const basePrice = parseFloat(product.price.replace('$', ''));

    // Calculate total price
    const totalPrice = (basePrice * selectedSize.multiplier * quantity).toFixed(2);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.image }}
                style={styles.productImage}
            />
            <View style={styles.ovrlapicons}>

                <View style={styles.BackIcon}>
                    <TouchableOpacity
                   onPress={() => navigation.goBack()}
                    >
                        <Icon
                            name="arrow-left"
                            size={45}
                            color={'white'}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.favoraiteIcon}>
                    <TouchableOpacity>
                        <Icon
                        name="favorite"
                        size={40}
                        color={'red'}
                    />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.overBack}>
                <View style={{
                    flexDirection: 'row', margin: 15, justifyContent: "space-between"
                }}>
                    <View >
                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 25 }}>{product.name}</Text>
                        <Text style={{ color: "white", fontSize: 10 }}>from {product.ingredients}</Text>
                    </View>

                    <View style={styles.icons}>

                        <TouchableOpacity style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <MaterialCommunityIcons name="coffee" size={30} color="orange" />
                            <Text style={{ color: 'orange' }}>
                                bean
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}>
                            <Ionicons name="location-sharp" size={30} color="orange" />
                            <Text style={{ color: 'orange' }}>
                                Africa
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
                <View style={{
                    flexDirection: 'row', marginEnd: 10, marginBottom: 20, justifyContent: "space-between"
                }}
                >
                    <View style={{ flexDirection: 'row', gap: 1, marginLeft: 10, marginTop: 23 }}>
                        <Icon name="star"
                            size={23}
                            color={'orange'}>
                        </Icon>
                        <Text style={{ color: "white", fontSize: 20 }}>45(1.678)</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 150,
                            height: 60,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,

                        }}>
                        <Text style={{ color: 'white' }}>
                            medioum Roeasted

                        </Text>



                    </TouchableOpacity>
                </View>


            </View>


            <View>
                <Text style={{ color: 'white', fontSize: 20, margin: 10 }}>Descriptions</Text>
                <Text style={{ color: 'white', fontSize: 15, margin: 10 }}>{product.description}</Text>
            </View>
            <Text style={{ margin: 5, fontSize: 30, color: 'white' }}>size</Text>
            <View style={styles.sizeContainer}>
                {sizes.map(size => (
                    <TouchableOpacity
                        key={size.label}
                        style={[styles.Buttons,
                        selectedSize.label === size.label && styles.selectedSizeButton
                        ]}
                        onPress={() => setSelectedSize(size)}






                    >
                        <Text
                            style={[styles.Text,
                            selectedSize.label === size.label && styles.selectedSizeText
                            ]}>
                            {size.label}

                        </Text>
                    </TouchableOpacity>




                ))





                }













            </View>


            <Text style={{ margin: 5, fontSize: 27, color: 'white' }}>Quantity</Text>

            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 100 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={{ width: 30, height: 30, backgroundColor: 'orange', alignItems: 'center', justifyContent: "center" }}
                        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}>-</Text>

                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white'
                    }}>{quantity}</Text>
                    <TouchableOpacity
                        style={{ width: 30, height: 30, backgroundColor: 'orange', alignItems: 'center', justifyContent: "center" }}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}>+</Text>

                    </TouchableOpacity>
                </View>






            </View>


            <Text style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 29,
            }}>Total price: ${totalPrice}</Text>

            <TouchableOpacity
                style={{
                    width: 200,
                    height: 50,
                    backgroundColor: 'orange',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 100,
                    marginTop: 10,
                    borderRadius: 50,



                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,


                    }}>
                    Add To Cart

                </Text>


            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: COLORS.primaryBlackHex
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    sizesContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    sizeButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 10,
    },
    selectedSizeButton: {
        backgroundColor: 'orange',
    },
    sizeText: {
        color: '#000',
    },
    selectedSizeText: {
        color: '#fff',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityValue: {
        marginHorizontal: 20,
        fontSize: 18,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    productImage: {
        height: 450,
        marginBottom: 16,
    },
    ovrlapicons: {
        position: 'absolute',
        flexDirection: 'row',
        gap: 280,
        left: 20,
        top: 30,
    },
    favoraiteIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'


    },
    BackIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10

    },
    overBack: {
        width: '100%',
        height: 150,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: 'absolute',
        marginTop: 300,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30



    },
    icons: {
        flexDirection: 'row',
        gap: 30,


    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    Text: {
        color: 'black'
    },
    Buttons: {
        width: 70,
        height: 30,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedSizeButton: {
        backgroundColor: 'white'

    },
    selectedSizeText: {
        color: 'orange'

    },




});

export default OrderScreen;
