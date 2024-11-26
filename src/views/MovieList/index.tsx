import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom"; // Link for navigation
import YearPicker from "../../components/YearPicker";

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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("Pokemon");
  const [type, setType] = useState("movie");
  const [year, setYear] = useState<string | null>(null); // Year is nullable
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        s: search,
        type,
        y: year || "", // If year is null, pass an empty string (to get all years)
        page,
      },
    });

    if (response.data.Search) {
      setMovies(response.data.Search);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
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
      {/* Filters section */}
      <div className="filters">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <input
              type="text"
              placeholder="Search Movies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <YearPicker value={year} onChange={setYear} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as string)}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="series">TV Series</MenuItem>
              <MenuItem value="episode">Episodes</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>

      {/* Movie Section */}
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
            <Card className="movie-card">
              <Link
                to={`/movie/${movie.imdbID}`}
                style={{ textDecoration: "none" }}
              >
                {movie.Poster !== "N/A" ? (
                  <CardMedia
                    component="img"
                    alt={movie.Title}
                    height="350"
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

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        className="pagination"
      />
    </Container>
  );
};

export default MovieList;
