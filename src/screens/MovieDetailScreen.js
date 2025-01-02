import React, { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieReviews, fetchMovieTrailer } from "../api/api";
import ReviewCard from "../components/ReviewCard";
import YoutubePlayer from 'react-native-youtube-iframe';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const MovieDetailScreen = ({ route }) => {
    const { movieId } = route.params;

    const [details, setDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewPage, setReviewPage] = useState(1);
    const [hasMoreReviews, setHasMoreReviews] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const movieDetails = await fetchMovieDetails(movieId);
                const movieTrailer = await fetchMovieTrailer(movieId);
                setDetails(movieDetails);
                setTrailer(movieTrailer);
            } catch (error) {
                alert('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
        loadMoreReviews();
    }, [movieId]);
    
    const loadMoreReviews = async () => {
        if (!hasMoreReviews) return;
    
        try {
            const newReviews = await fetchMovieReviews(movieId, reviewPage);
            const formattedReviews = newReviews.map((review, index) => ({
                ...review,
                id: review.id || `generated-${reviewPage}-${index}`,
            }));
            setReviews((prev) => [...prev, ...formattedReviews]);
            setReviewPage((prev) => prev + 1);
            if (newReviews.length === 0) setHasMoreReviews(false);
        } catch (error) {
            alert('Failed to load reviews.');
        }
      };

    if (loading)
        return <ActivityIndicator style={styles.loader} />;

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={reviews}
                keyExtractor={(item, index) => `${item.id || `generated-${index}`}`}
                renderItem={({ item }) => <ReviewCard review={item} />}
                onEndReached={loadMoreReviews}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={
                    <>
                        {details && (
                            <>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                                }}
                                style={styles.poster}
                            />
                                <Text style={styles.title}>{details.title}</Text>
                                <Text>{details.overview}</Text>
                            </>
                        )}
                        {trailer && (
                            <YoutubePlayer
                            height={200}
                            play={false}
                            videoId={trailer.key}
                            style={styles.trailer}
                            />
                        )}
                        <Text style={styles.sectionHeader}>Reviews</Text>
                    </>
                }
                ListFooterComponent={
                    hasMoreReviews ? (
                    <ActivityIndicator style={styles.loader} />
                    ) : null
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    loader: {
        marginVertical: 20
    },
    poster: {
        width: '100%',
        height: undefined,
        aspectRatio: 3/4,
        resizeMode: "cover",
        borderRadius: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    overview: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    sectionHeader: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    trailer: {
        marginBottom: 20
    }
});

export default MovieDetailScreen;