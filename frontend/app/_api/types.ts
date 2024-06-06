// types.ts
export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  profile_path: string | null;
  original_name: string;
  character: string;
}

export interface Credits {
  cast: Cast[];
}

export interface MovieData {
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
}
