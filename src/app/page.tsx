/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface MovieRating {
  movieRatings: string;
  rating: string;
  username: string;
}

export default function Home() {
  const [movieRatingsList, setMovieRatingsList] = useState<any>([]);
  const headers: HeadersInit = {
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(function () {
    async function callAWS() {
      const res = await fetch(
        "https://eguxcy2sv8.execute-api.us-east-1.amazonaws.com/prod/all",
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await res.json();
      console.log(data);
      setMovieRatingsList(data.Items);
    }
    callAWS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Recent Activity:</h1>
      {movieRatingsList.length !== 0 ? (
        <ul>
          {movieRatingsList.map((movieRating: any) => (
            <li key={movieRating.movieRatings.S}>
              <img alt={movieRating.imdbid.S} />
              {`${movieRating.username.S} ${movieRating.rating.S}`}
            </li>
          ))}
        </ul>
      ) : (
        "Loading"
      )}
    </div>
  );
}
