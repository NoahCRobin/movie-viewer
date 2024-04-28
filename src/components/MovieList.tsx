import { useEffect, useRef, useState } from "react";

import { API_KEY } from "@/utils/utils";

import Movie from "./Movie";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export default function MovieList({
  searchQuery,
  onSelectMovie,
}: {
  searchQuery: string;
  onSelectMovie: (imdbID: string) => void;
}) {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const listInnerRef = useRef(null);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${page}`
          );

          if (!res.ok)
            throw new Error("Something Went Wrong With Fetching Movies");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }

          if (page === 1) {
            setMovieList(data.Search);
          } else {
            setMovieList((movieList) => [...movieList, ...data.Search]);
          }
        } catch (err: any) {
          setError(err.message);
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (searchQuery.length < 3) {
        setMovieList([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [searchQuery, page]
  );

  const handleIncrementPage = () => {
    setPage((page) => (page += 1));
  };

  const onScroll = () => {
    if (page !== 1) {
      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        // console.log(
        //   "scrollTop",
        //   scrollTop,
        //   "clientHeight",
        //   clientHeight,
        //   "scrollHeight",
        //   scrollHeight,
        //   "scrollTop + clientHeigh",
        //   scrollTop + clientHeight
        // );
        console.log(movieList.length);
        if (Math.ceil(scrollTop) + clientHeight === scrollHeight) {
          handleIncrementPage();
        }
      }
    }
  };

  return (
    <div
      ref={listInnerRef}
      className="box rounded overflow-scroll"
      onScroll={onScroll}
    >
      <div className="grid align-items-center">
        <ul className="list list-movies ">
          {movieList.length > 0
            ? movieList.map((movie) => (
                <Movie
                  movie={movie}
                  key={movie.imdbID}
                  onSelectMovie={onSelectMovie}
                />
              ))
            : "Search for a movie above"}
        </ul>
        {page === 1 && searchQuery !== "" && (
          <button onClick={handleIncrementPage}>Load More</button>
        )}
      </div>
    </div>
  );
}
