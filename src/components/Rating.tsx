import { useState } from "react";

import { usePathname } from "next/navigation";

interface MovieRating {
  username: string;
  rating: string;
  imdbid: string;
}

export default function Rating({ imdbid }: { imdbid: string }) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleUsernameInput(usernameInput: string) {
    setUsername(usernameInput);
  }

  function handleRatingInput(ratingInput: string) {
    setRating(ratingInput);
  }

  function handleSubmit() {
    const data: MovieRating = {
      username: username,
      rating: rating.toString(),
      imdbid: imdbid,
    };

    fetch("https://eguxcy2sv8.execute-api.us-east-1.amazonaws.com/prod/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then(() => setIsSubmitted(true))
      .catch((err) => console.log(`ERROR: ${err}`));
    setIsLoading(false);
  }

  return (
    <>
      {!isSubmitted ? (
        <>
          <input
            type="text"
            placeholder="Enter your Name"
            value={username}
            onChange={(e) => handleUsernameInput(e.target.value)}
          />
          <input
            value={rating}
            onChange={(e) => handleRatingInput(e.target.value)}
            type="number"
            placeholder="Enter your Rating"
          />
          <button
            onClick={() => (handleSubmit(), setIsLoading(true))}
            disabled={isLoading}
          >
            Submit
          </button>
        </>
      ) : (
        <h3>Thanks for Rating!</h3>
      )}
    </>
  );
}

/*

{
  "username": "username,"
  "rating": "rating.toString(),"
  "imdbid": "imdbid,"
}

{
  "username": "username,",
  "rating": "rating.toString(),",
  "imdbid": "imdbid,"
}

*/
