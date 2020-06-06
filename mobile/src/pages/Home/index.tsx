import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, Image, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();

    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf,
            city,
        });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{ width: 274, height: 350 }} style={styles.container}>
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu Marketplace de Coleta de Resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                    </View>
                </View>

                <View>
                    <TextInput style={styles.input} placeholder="Digite a UF" value={uf} onChangeText={text => setUf(text)} maxLength={2} autoCapitalize="characters" autoCorrect={false} />
                    <TextInput style={styles.input} placeholder="Digite a Cidade" value={city} onChangeText={text => setCity(text)} autoCorrect={false} />
                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 16
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 8,
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 304,
        marginTop: 16,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 8,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;