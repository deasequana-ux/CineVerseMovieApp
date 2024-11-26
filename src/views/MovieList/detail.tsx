import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import Loading from "../../components/Loading";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  Awards: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
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
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        style={{
          position: "fixed", 
          top: "20px", 
          right: "20px", 
          zIndex: 10, 
          backgroundColor:"#6f1a30",
          color:"white",
        }}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      <Card
        style={{
          maxWidth: "900px",
          margin: "auto",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          overflow: "hidden",
          marginTop: "60px",
        }}
      >
        {movie?.Poster !== "N/A" ? (
          <CardMedia
            component="img"
            alt={movie?.Title}
            height="500"
            image={movie?.Poster}
            title={movie?.Title}
            style={{
              objectFit: "cover",
              filter: "brightness(80%)",
            }}
          />
        ) : (
          ""
        )}

        <CardContent
          style={{
            padding: "30px",
            backgroundColor: "#f7f7f7",
            borderTop: "5px solid #915465", 
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            {handleControl(movie?.Title || "")}
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "#915465",
              marginBottom: "10px",
            }}
          >
            {handleControl(movie?.Year || "")}
          </Typography>
          <Box display="flex" flexDirection="column" marginBottom="15px">
            <Typography
              variant="body1"
              style={{
                fontStyle: "italic",
                color: "#333",
                lineHeight: "2.5",
              }}
            >
              {handleControl(movie?.Plot || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Genre: {handleControl(movie?.Genre || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Actors: {handleControl(movie?.Actors || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Awards: {handleControl(movie?.Awards || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Director: {handleControl(movie?.Director || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Cast: {handleControl(movie?.Actors || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              IMDb Rating: {handleControl(movie?.imdbRating || "")}
            </Typography>
          </Box>

          {/* Ratings Section */}
          <Box marginTop="20px">
            <Typography variant="h6" style={{ color: "#333" }}>
              Ratings:
            </Typography>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              {movie?.Ratings?.map((rating, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    style={{
                      padding: "15px",
                      backgroundColor: "#E5E3D4",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" style={{ color: "#555", fontWeight: "600" }}>
                      {rating.Source}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#333", marginTop: "8px" }}>
                      {rating.Value}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;
