/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import Box from "@/components/Box";
import MovieList from "@/components/MovieList";
import MovieDetails from "@/components/MovieDetails";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const MovieData = {
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
  Awards: "Won 4 Oscars. 159 wins & 220 nominations total",
  BoxOffice: "$292,587,330",
  Country: "United States, United Kingdom",
  DVD: "20 Jun 2013",
  Director: "Christopher Nolan",
  Genre: "Action, Adventure, Sci-Fi",
  Language: "English, Japanese, French",
  Metascore: "74",
  Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  Production: "N/A",
  Rated: "PG-13",
  Ratings: [],
  Released: "16 Jul 2010",
  Response: "True",
  Runtime: "148 min",
  Title: "Inception",
  Type: "movie",
  Website: "N/A",
  Writer: "Christopher Nolan",
  Year: "2010",
  imdbID: "tt1375666",
  imdbRating: "8.8",
  imdbVotes: "2,547,638",
};

const tempMovieData: Movie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite ",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function MovieViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieId, setMovieId] = useState("");

  function handleSetId(imdbID: string) {
    setMovieId(imdbID);
  }

  return (
    <>
      <nav className="search-bar grid grid-cols-2 items-center rounded">
        <div>Movie Viewer</div>
        <input
          className="search"
          placeholder="Search for a Movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </nav>
      <main className="main grid grid-cols-2">
        <MovieList searchQuery={searchQuery} onSelectMovie={handleSetId} />
        <MovieDetails movieId={movieId} />
      </main>
    </>
  );
}
