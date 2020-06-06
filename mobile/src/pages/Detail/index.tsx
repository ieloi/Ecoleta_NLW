import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon ,FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'expo';

interface RouteParams {
    point_id: number;
}

interface DadosCompletosPonto {
    point: {
        image: string;
        image_url: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[];
}

const Detail = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as RouteParams; // fazer com que o typescript entenda que o formato a ser utilizado sera o da interface

    const [dadosCompletosPonto, setDadosCompletosPonto] = useState<DadosCompletosPonto>({} as DadosCompletosPonto);

    useEffect(() => {
        api.get(`points/${routeParams.point_id}`).then(response => {
            setDadosCompletosPonto(response.data);
        });
    }, [])

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de Itens',
            recipients: [dadosCompletosPonto.point.email],
        })
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${dadosCompletosPonto.point.whatsapp}&text=Tenho interesse na coleta de Itens`);
    }

    if (!dadosCompletosPonto.point) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: dadosCompletosPonto.point.image_url}} />

                <Text style={styles.pointName}>{dadosCompletosPonto.point.name}</Text>
                <Text style={styles.pointItems}>
                    {dadosCompletosPonto.items.map(item => item.title).join(', ')}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{dadosCompletosPonto.point.city}, {dadosCompletosPonto.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;