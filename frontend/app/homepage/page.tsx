"use client";
import { useEffect, useState } from "react";
import { getPopularMovies } from "@/_api/getpopularmovies";
import Image from "next/image";
import { getNowPlaying } from "@/_api/getnowplaying";
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
    <span className="movie-list-item-title">{title}</span>
    <p className="movie-list-item-desc">{summary}</p>
    <button className="movie-list-item-button">Watch</button>
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
  <div
    className="featured-content"
    style={{
      background: `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('https://image.tmdb.org/t/p/original${image}')`,
    }}
  >
    {/* <Image
      className="featured-title"
      src={`https://image.tmdb.org/t/p/original${image}`}
      alt=""
      width={150}
      height={225}
    /> */}
    
    <p className="featured-desc">{summary}</p>
  </div>
);

const HomePage: React.FC = () => {
  const [playingData, setPlayingData] = useState<{ data: any; loading: boolean }>({
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

  const [popularData, setPopularData] = useState<{ data: any; loading: boolean }>({
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

  return (
    <div>
      {!playingData.loading && !popularData.loading && (
        <div className="container">
          <div className="content-container">
            <FeaturedContent
              image={playingData.data[0].image}
              title={playingData.data[0].title}
              summary={playingData.data[0].summary}
            />
            <MovieListContainer title="NEW RELEASES" movies={playingData.data} />
            <FeaturedContent
              image="/img/f-2.jpg"
              title="/img/f-t-2.png"
              summary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident."
            />
            <MovieListContainer title="POPULAR" movies={popularData.data} />
            <MovieListContainer title="NEW RELEASES" movies={popularData.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
