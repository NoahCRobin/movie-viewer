/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import MovieList from "@/components/MovieList";
import MovieDetails from "@/components/MovieDetails";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export default function MovieViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieId, setMovieId] = useState("");

  function handleSetId(imdbID: string) {
    setMovieId(imdbID);
  }

  return (
    <>
      <div className="search-bar grid grid-cols-2 items-center rounded">
        <div>Movie Viewer</div>
        <input
          className="search"
          placeholder="Search for a Movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <main className="main grid grid-cols-2">
        <MovieList searchQuery={searchQuery} onSelectMovie={handleSetId} />
        <MovieDetails movieId={movieId} />
      </main>
    </>
  );
}
