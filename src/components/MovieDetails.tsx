/* eslint-disable @next/next/no-img-element */

import { MovieData, API_KEY } from "@/utils/utils";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MovieDetails({ movieId }: { movieId: string }) {
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
        );
        const data = await res.json();
        setMovieData(data);
        console.log(data);
      }
      if (movieId !== "") {
        getMovieDetails();
      }
    },
    [movieId]
  );

  return (
    <div className="box rounded text-center">
      {movieData ? (
        <>
          <div className="movie-details grid-cols-2 grid-row-4 justify-items-center gap-1 p-3 rounded">
            <img
              className="row-span-4"
              src={movieData.Poster}
              alt={`${movieData.Title} Poster`}
              width={"125rem"}
            ></img>
            <h3>{movieData.Title}</h3>
            <p>
              {movieData.Rated} - {movieData.Runtime}
            </p>
            <p>{movieData.Released}</p>
            <p>{movieData.Genre}</p>
          </div>
          <div className="movie-about flex flex-col mt-5 p-1.5 gap-5 rounded">
            <p className="italic">{movieData.Plot}</p>
            <p>Starring: {movieData.Actors}</p>
            <p>Directed By: {movieData.Director}</p>
          </div>
          <Link href={`/movieviewer/${movieData.imdbID}`}>
            Click Here to go this movies detail page
          </Link>
        </>
      ) : (
        "Select a movie to view it's details"
      )}
    </div>
  );
}
