import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReviewCard = ({ review }) => (
    <View style={styles.card}>
        <Text style={styles.author}>{review.author}</Text>
        <Text style={styles.content}>{review.content}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    author: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    content: {
        fontSize: 14, 
        color: '#555'
    }
});

export default ReviewCard;