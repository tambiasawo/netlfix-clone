import React from 'react'
import { Movie } from '../typings.def'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atom/modalAtom'
interface Props {
  movie: Movie
  //when using firebase
}
function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div>
      <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-sm object-cover md:rounded"
          layout="fill"
          onClick={() => {
            setShowModal(true)
            setCurrentMovie(movie)
          }}
        />
      </div>
    </div>
  )
}

export default Thumbnail
