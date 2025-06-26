import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

const { width } = Dimensions.get('window');

// Interfaz para definir el tipo de datos de perritos
interface Perrito {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
}

// Datos de perritos con imágenes
const perritosData: Perrito[] = [
    {
        id: '1',
        nombre: 'Golden Retriever',
        imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        descripcion: 'Un perro amigable y leal'
    },
    {
        id: '2',
        nombre: 'Husky Siberiano',
        imagen: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop',
        descripcion: 'Perro enérgico y aventurero'
    },
    {
        id: '3',
        nombre: 'Labrador',
        imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        descripcion: 'Inteligente y juguetón'
    },
    {
        id: '4',
        nombre: 'Bulldog Francés',
        imagen: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
        descripcion: 'Pequeño pero con gran personalidad'
    },
    {
        id: '5',
        nombre: 'Border Collie',
        imagen: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop',
        descripcion: 'Muy inteligente y trabajador'
    },
    {
        id: '6',
        nombre: 'Pomerania',
        imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        descripcion: 'Pequeño y adorable'
    },
    {
        id: '7',
        nombre: 'Pastor Alemán',
        imagen: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=300&fit=crop',
        descripcion: 'Leal y protector'
    },
    {
        id: '8',
        nombre: 'Beagle',
        imagen: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop',
        descripcion: 'Curioso y amigable'
    }
];

const PerritoItem = ({ item }: { item: Perrito }) => (
    <View style={styles.itemContainer}>
        <Image
            source={{ uri: item.imagen }}
            style={styles.imagen}
            resizeMode="cover"
        />
        <View style={styles.textoContainer}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
        </View>
    </View>
);

export default function three() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>🐕 Perritos Adorables 🐕</Text>

            <FlatList
                data={perritosData}
                renderItem={PerritoItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listaContainer}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
            />

            {/* <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                    networkExtras: {
                        collapsible: "top",
                    }
                }}
            >
            </BannerAd> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    listaContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    imagen: {
        width: '100%',
        height: 200,
    },
    textoContainer: {
        padding: 16,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    descripcion: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    separador: {
        height: 16,
    },
});