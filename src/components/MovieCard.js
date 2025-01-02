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
        margin: 10,
        width: 150
    },
    image: {
        width:150,
        height: 225,
        borderRadius: 8
    },
    title:{
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default MovieCard;