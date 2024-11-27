import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../../store/slices/movieFilterSlice";
import Loading from "../../components/loading";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppDispatch, useSelector } from "../../store/store";

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  

  const { Movie, MovieLoading, MovieError } = useSelector((state) => state.movie);
  
  useEffect(() => {
    
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    
    if (Movie) {
      
    }
  }, [ dispatch]);

  const handleControl = (data: string) => (data === "N/A" ? "" : data);

  if (MovieLoading) {
    return <Loading />;
  }

  if (MovieError) {
    return <div>{`Error: ${MovieError}`}</div>;
  }

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        style={{
          position: "fixed", 
          top: "10px", 
          right: "30px", 
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
          maxWidth: "1000px",
          margin: "auto",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          overflow: "hidden",
          marginTop: "60px",
        }}
      >
        {Movie && Movie?.Poster !== "N/A" ? (
          <CardMedia
            component="img"
            alt={Movie?.Title}
            height="400"
            image={Movie?.Poster}
            title={Movie?.Title}
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
            {handleControl(Movie?.Title || "")}
          </Typography>
          <Typography
            variant="h6"
            style={{
              color: "#915465",
              marginBottom: "10px",
            }}
          >
            {handleControl(Movie?.Year || "")}
          </Typography>
          <Box display="flex" flexDirection="column" marginBottom="15px">
            <Typography
              variant="body1"
              style={{
                fontStyle: "italic",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              {handleControl(Movie?.Plot || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Genre: {handleControl(Movie?.Genre || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Actors: {handleControl(Movie?.Actors || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Awards: {handleControl(Movie?.Awards || "")}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: "600",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Director: {handleControl(Movie?.Director || "")}
            </Typography>
          </Box>

          {/* Ratings Section */}
          <Box marginTop="20px">
            <Typography variant="h6" style={{ color: "#333" }}>
              Ratings:
            </Typography>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              {Movie?.Ratings?.map((rating, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    className="rating-card"
                    style={{
                      padding: "15px",
                      backgroundColor: "#E5E3D4",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" style={{ color: "#6f1a30", fontWeight: "600" }}>
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

export default Movie;
