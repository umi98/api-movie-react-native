import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ReviewCard = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_CHARACTERS = 200;
    const formattedDate = new Date(review.created_at).toLocaleDateString();

    const toggleExpansion = () => {
        setIsExpanded((prev) => !prev)
    };
    const reviewContent = 
        review.content.length > MAX_CHARACTERS && !isExpanded
            ? `${review.content.slice(0, MAX_CHARACTERS)}...`
            : review.content;

    return (
        <View style={styles.card}>
            <Text style={styles.author}>{review.author}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.content}>{reviewContent}</Text>
            {review.content.length > MAX_CHARACTERS && (
                <TouchableOpacity onPress={toggleExpansion}>
                    <Text style={styles.readMore}>
                        {isExpanded ? "Show Less" : "Read More"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
    author: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#1e40af'
    },
    date: {
        fontSize: 12,
        marginBottom: 8,
        color: '#64748b'
    },
    content: {
        fontSize: 14,
        lineHeight: 20,
        color: '#374151'
    },
    readMore: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: ' #2563eb'
    }
});

export default ReviewCard;