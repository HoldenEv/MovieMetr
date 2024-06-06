"use client";
import { useEffect, useState } from "react";
import { getPopularMovies } from "@/_api/getpopularmovies";
import Image from "next/image";
import { getNowPlaying } from "@/_api/getnowplaying";
import { getTopRated } from "@/_api/gettopratedmovies";
import "./homepage.css";

interface Movie {
  image: string;
  title: string;
  summary: string;
}

interface MovieListItemProps {
  image: string;
  title: string;
  summary: string;
}

const MovieListItem: React.FC<MovieListItemProps> = ({
  image,
  title,
  summary,
}) => (
  <div className="movie-list-item">
    <Image
      className="movie-list-item-img"
      src={`https://image.tmdb.org/t/p/original${image}`}
      alt={title}
      width={150}
      height={225}
    />
    <div className="movie-list-item-title">{title}</div>
    {/* <p className="movie-list-item-desc">{summary}</p> */}
  </div>
);

interface MovieListContainerProps {
  title: string;
  movies: Movie[];
}

const MovieListContainer: React.FC<MovieListContainerProps> = ({
  title,
  movies,
}) => (
  <div className="movie-list-container">
    <h1 className="movie-list-title">{title}</h1>
    <div className="movie-list-wrapper">
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieListItem
            key={index}
            image={movie.image}
            title={movie.title}
            summary={movie.summary}
          />
        ))}
      </div>
      <i className="fas fa-chevron-right arrow"></i>
    </div>
  </div>
);

interface FeaturedContentProps {
  image: string;
  title: string;
  summary: string;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
  image,
  title,
  summary,
}) => (
  <div className="featured-content">
    <Image
      className="backdrop-image"
      src={`https://image.tmdb.org/t/p/original${image}`}
      alt=""
      width={1400}
      height={1200}
      style={{ height: "auto" }}
    />
    <div className="featured-info">
      <div className="featured-title">{title}</div>
      <div className="featured-desc">{summary}</div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [playingData, setPlayingData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNowPlaying();
      setPlayingData({ data: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, []);

  const [popularData, setPopularData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularMovies();
      setPopularData({ data: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, []);
  const [topratedData, setTopRatedData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopRated();
      setTopRatedData({ data: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === playingData.data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playingData.data.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === playingData.data.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 15 seconds

    return () => clearInterval(interval);
  }, [playingData.data]);

  return (
    <div>
      {!playingData.loading &&
        !popularData.loading &&
        !topratedData.loading && (
          <div className="container">
            <div className="content-container">
              <FeaturedContent
                image={playingData.data[currentIndex].backdrop_path}
                title={playingData.data[currentIndex].title}
                summary={playingData.data[currentIndex].summary}
              />
              <div
                className="arrow"
                onClick={handlePrev}
                style={{ right: "1340px", top: "350px", fontSize: "60px" }}
              >
                {"<"}
              </div>
              <div
                className="arrow"
                onClick={handleNext}
                style={{ top: "350px", fontSize: "60px" }}
              >
                {">"}
              </div>
              <MovieListContainer
                title="NEW RELEASES"
                movies={playingData.data}
              />
              <MovieListContainer title="POPULAR" movies={popularData.data} />
              <MovieListContainer
                title="ALL TIME FAVORITES"
                movies={topratedData.data}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default HomePage;
