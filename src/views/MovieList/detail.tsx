import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";
import axios from "axios";
import Loading from "../../components/Loading";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "468c3b7e";

interface MovieDetails {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            i: id,
          },
        });
        if (response.data.Error) {
          console.error("Error fetching movie details:", response.data.Error);
        } else {
          setMovie(response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const handleControl = (data: string) => (data === "N/A" ? "" : data);

  return (
    <Container>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ margin: "20px" }}
      >
        Back
      </Button>

      <Card>
        {movie?.Poster !== "N/A" ? (
          <CardMedia
            component="img"
            alt={movie?.Title}
            height="350"
            image={movie?.Poster}
            title={movie?.Title}
          />
        ) : (
          ""
        )}
        <CardContent>
          <Typography variant="h4">
            {handleControl(movie?.Title || "")}
          </Typography>
          <Typography variant="subtitle1">
            {handleControl(movie?.Year || "")}
          </Typography>
          <Typography variant="subtitle2">
            Genre: {handleControl(movie?.Genre || "")}
          </Typography>
          <Typography variant="subtitle2">
            Director: {handleControl(movie?.Director || "")}
          </Typography>
          <Typography variant="subtitle2">
            Cast: {handleControl(movie?.Actors || "")}
          </Typography>
          <Typography variant="subtitle2">
            IMDb Rating: {handleControl(movie?.imdbRating || "")}
          </Typography>
          <Typography>{handleControl(movie?.Plot || "")}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;
