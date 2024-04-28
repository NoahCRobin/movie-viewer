/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import { MovieData, API_KEY } from "@/utils/utils";

export default function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  console.log(params);
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  /*
   TODO: 
    Find a way to pass the Movie object here when coming from /movieviewer/ 
    to save the call when coming from /movieviewer/imdbID
   */

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${params.movieId}`
        );
        const data = await res.json();
        setMovieData(data);
        console.log(data);
      }
      getMovieDetails();
    },
    [params.movieId]
  );
  return movieData ? (
    <div className="movie-detail-page flex flex-col text-center">
      <header>
        <h1 className="">{movieData.Title}</h1>
      </header>
      <section className="grid grid-cols-2">
        <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
        <ul className="flex flex-col justify-center  px-2 gap-4">
          <li className="italic">{movieData.Plot}</li>
          <li>Starring: {movieData.Actors}</li>
        </ul>
      </section>
      <ul className="grid grid-cols-2 justify-items-center">
        <li>Director: {movieData.Director}</li>
        <li>Writer: {movieData.Writer}</li>
        <li>Genre: {movieData.Genre}</li>
        <li>Rated: {movieData.Rated}</li>
        <li>BoxOffice: {movieData.BoxOffice}</li>
        <li>DVD: {movieData.DVD}</li>
        <li>Country: {movieData.Country}</li>
        <li>imdbRating: {movieData.imdbRating}</li>
      </ul>
    </div>
  ) : (
    "Loading..."
  );
}
