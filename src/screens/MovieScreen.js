import React, { useEffect, useState } from "react";
import { fetchMovieByGenre } from "../api/api";
import MovieCard from "../components/MovieCard";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

const MovieScreen = ({ route, navigation }) => {
    const { genreId, genreName } = route.params;

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMovies(page);
    }, [page]);

    const loadMovies = async (pageNum) => {
        try {
            setLoading(true);
            const data = await fetchMovieByGenre(genreId, pageNum);
            setMovies((prevMovies) => (pageNum === 1 ? data.results : [...prevMovies, ...data.results]));
        } catch (error) {
            alert('Failed to load movies');
        } finally {
            setLoading(false);
        }
    };    

    if (loading && page === 1)
        return <ActivityIndicator style={styles.loader} />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Movie in {genreName}</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
                    />
                )}
                onEndReached={loadMovies}
                onEndReachedThreshold={0.5}
                ListFooterComponent={hasMore ? <ActivityIndicator style={styles.loadr} /> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    loader: {
        marginVertical: 20
    }
});

export default MovieScreen;