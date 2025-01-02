import React, { useEffect, useState } from "react";
import { fetchGenres } from "../api/api";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text } from "react-native";

const GenreScreen = ({ navigation }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGenres = async() => {
            try {
                const data = await fetchGenres();
                setGenres(data);
            } catch (error) {
                alert('Failed to load genres');
            } finally {
                setLoading(false);
            }
        }
        loadGenres();
    }, []);

    if (loading)
        return <ActivityIndicator style={styles.loader} />;
    
    return (
        <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString() }
            renderItem={({ item }) => (
                <Pressable
                    style={styles.genre}
                    onPress={() => navigation.navigate('Movies', {genreId: item.id, genreName: item.name})}
                >
                    <Text style={styles.text}>{item.name}</Text>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genre: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    text: {
        fontSize: 18
    }
});

export default GenreScreen;