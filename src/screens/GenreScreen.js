import React, { useEffect, useState } from "react";
import { fetchGenres } from "../api/api";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <View style={styles.container}>
            <Text style={styles.title}>Discover by Genre</Text>
            <FlatList
                data={genres}
                keyExtractor={(item) => item.id.toString() }
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.genre}
                        onPress={() => navigation.navigate('Movies', {genreId: item.id, genreName: item.name})}
                    >
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8fafc'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#0f172a'
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genre: {
        flex: 1,
        marginHorizontal: 8,
        padding: 16,
        backgroundColor: '#1e2938',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default GenreScreen;