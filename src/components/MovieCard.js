import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const MovieCard = ({ movie, onPress }) => (
    <Pressable onPress={onPress} style={styles.card}>
        <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
            style={styles.image}
        />
        <Text style={styles.title}>{movie.title}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3
    },
    image: {
        width:'100%',
        aspectRatio: 2/3
    },
    title:{
        padding: 8,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#1e293b'
    }
});

export default MovieCard;