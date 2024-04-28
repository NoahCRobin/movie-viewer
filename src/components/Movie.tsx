/* eslint-disable @next/next/no-img-element */
type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export default function Movie({
  movie,
  onSelectMovie,
}: {
  movie: Movie;
  onSelectMovie: (imdbID: string) => void;
}) {
  return (
    <li
      className="grid grid-cols-2 grid-rows-2 items-center gap-1 pt-3"
      key={movie.imdbID}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        className="row-span-2 justify-self-center"
        width="65px"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3 className="">{movie.Title}</h3>
      <div className="self-start">
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
