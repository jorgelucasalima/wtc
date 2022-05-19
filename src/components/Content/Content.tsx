import { useEffect, useState } from 'react';
import '../../styles/content.scss';
import { api } from '../../services/api';

import { MovieCard } from '../MovieCard/MovieCard';
import { Header } from '../Header/Header';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreId: number;
}

export function Content( { selectedGenreId }: ContentProps ) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    // retorna a lista de filmes de acordo com o gênero selecionado pelo id do gênero
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    // retorna o genêro selecionado para o título da página de conteúdo de acordo com o id do gênero selcionado na side bar
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
    });

  }, [selectedGenreId]);
  // a listagem de filmes de acordo com o gênero é atualizada toda vez que houver uma mudança de gênero

  return (
    <div className="container">
        <Header selectedGenreTitle={selectedGenre.title}/>
        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  );
}