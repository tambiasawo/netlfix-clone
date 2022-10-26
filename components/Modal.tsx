import React from 'react'
import MuiModal from '@mui/material/Modal'
import { modalState, movieState } from '../atom/modalAtom'
import { useRecoilState } from 'recoil'
import CloseIcon from '@mui/icons-material/Close'
import ReactPlayer from 'react-player/lazy'
import { Element, Genre } from '../typings.def'

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [curentMovie, setcurentMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = React.useState('')
  const [genre, setGenre] = React.useState<Genre[]>([])
  const [muted, setMuted] = React.useState(false)

  React.useEffect(() => {
    if (!curentMovie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          curentMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${curentMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
      if (data?.videos) {
        const index = data?.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data?.videos.results[index]?.key)
      }

      if (data?.genres) {
        setGenre(data?.genres)
      }
    }
    fetchMovie()
  }, [curentMovie])

  const handleClose = () => {
    setShowModal(false)
    setcurentMovie(null)
  }
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-8 w-8 cursor-pointer border-none bg-[#181818] p-1 !font-extralight hover:bg-[#181818]"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            muted={muted}
            playing
            style={{ position: 'absolute', top: '0', left: 0 }}
            height="100%"
            width="100%"
          />
        </div>
      </>
    </MuiModal>
  )
}
