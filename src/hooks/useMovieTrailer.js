import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/redux/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants/tmdbApis";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideoDataExist = useSelector(
    (store) => store.movies.trailerVideo
  );

  const getMovieTrailerVideo = async () => {
    try {
      
      const videos = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      // console.log("videos ", videos.data.results);
      const trailerData = videos.data.results.find(
        (video) => video.type === "Trailer"
      );
      // To handle the case if there is no trailer type, we can take any video
      const trailer = trailerData ? trailerData : videos.data.results[0];
      // console.log("trailer ", trailer);
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    !trailerVideoDataExist && getMovieTrailerVideo();
  }, []);
};

export { useMovieTrailer };
