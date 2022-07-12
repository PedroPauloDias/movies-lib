import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MovieCard } from '../components/MovieCard';
import {
  BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsGraphUp
} from 'react-icons/bs';

import './movie.css'


const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)
  }

  const formatcurrency = (number) => {
    return number.toLocaleString("en-us", {
      style: "currency",
      currency: "USD"
    })
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    getMovie(movieURL)
  }, [])

  return (
    <div className="movie-page" >
      {movie && <>
        <MovieCard movie={movie} showlink={false} />
        <p className="tagline" >{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatcurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatcurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p> 
        </div>
        <div className="info">
          <h3>
            <BsFillFileEarmarkTextFill /> descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
      </>}
    </div>
  )
}