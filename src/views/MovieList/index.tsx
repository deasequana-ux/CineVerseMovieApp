import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../../store/store";
import { setSearch, setType, setYear, setPage, fetchMovies } from "../../store/slices/movieFilterSlice";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Link } from "react-router-dom";
import YearPicker from "../../components/yearPicker";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Search, Type, Year, Page, Movies, TotalPage, MoviesError } = useSelector((state) => state.movie);

  // Loading state to track when the data is being fetched
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true); 
    dispatch(fetchMovies({ Search, Type, Year, Page }))
      .finally(() => {
        setLoading(false); 
      });
  }, [dispatch, Search, Type, Year, Page]);

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
              value={Search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="filter-input"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <YearPicker
              value={Year}
              onChange={(value) => dispatch(setYear(value))}
              className="filter-yearpicker"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              value={Type}
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
      {MoviesError && (
        <Typography variant="h6" color="error" style={{ marginBottom: "20px" }}>
          {MoviesError}
        </Typography>
      )}

      {loading ? (
        <Grid container justifyContent="center" style={{ marginTop: "30px" }}>
          <CircularProgress />
        </Grid>
      ) : (
        // Movie Section
        <Grid container spacing={4} justifyContent="center">
          {Movies.map((movie) => (
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
      )}

      <Pagination
        count={TotalPage}
        page={Page}
        onChange={(e, value) => dispatch(setPage(value))}
        className="pagination-wrapper"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      />
    </Container>
  );
};

export default MovieList;
