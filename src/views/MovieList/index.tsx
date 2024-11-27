// src/components/MovieList.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch, setType, setYear, setPage } from "../../store/slices/movieFilterSlice";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { Link } from "react-router-dom";
import YearPicker from "../../components/yearPicker";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "468c3b7e";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

const MovieList: React.FC = () => {
  const dispatch = useDispatch();

  const { search, type, year, page } = useSelector((state: any) => state.movie);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [error, setError] = React.useState<string>("");

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: search,
          type,
          y: year || "",
          page,
        },
      });

      if (response.data.Response === "False") {
        setError(response.data.Error);
        setMovies([]);
        setTotalPages(1);
      } else {
        setMovies(response.data.Search);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
        setError("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, type, year, page]);

  return (
    <Container>
      <h1 className="movie-title">
        🎬 <span className="title">CineVerse</span>
      </h1>

      {/* Filters Section */}
      <div className="filters">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <input
              type="text"
              placeholder="Search Movies"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="filter-input"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <YearPicker
              value={year}
              onChange={(value) => dispatch(setYear(value))}
              className="filter-yearpicker"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              value={type}
              onChange={(e) => dispatch(setType(e.target.value as string))}
              variant="outlined"
              fullWidth
              className="filter-select"
            >
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="series">TV Series</MenuItem>
              <MenuItem value="episode">Episodes</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>

      {/* Error Message */}
      {error && (
        <Typography variant="h6" color="error" style={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {/* Movie Section */}
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
            <Card className="movie-card">
              <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
                {movie.Poster !== "N/A" ? (
                  <CardMedia
                    component="img"
                    alt={movie.Title}
                    height="450"
                    image={movie.Poster}
                    title={movie.Title}
                  />
                ) : (
                  ""
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {movie.Year}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {movie.imdbID}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => dispatch(setPage(value))}
        className="pagination-wrapper"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      />
    </Container>
  );
};

export default MovieList;
