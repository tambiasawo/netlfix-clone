import React from 'react'
import MuiModal from '@mui/material/Modal'
import { modalState, movieState } from '../atom/modalAtom'
import { useRecoilState } from 'recoil'
import CloseIcon from '@mui/icons-material/Close'
import ReactPlayer from 'react-player/lazy'
import { Element, Genre } from '../typings.def'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurentMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = React.useState('')
  const [genre, setGenre] = React.useState<Genre[]>([])
  const [muted, setMuted] = React.useState(true)

  React.useEffect(() => {
    if (!currentMovie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currentMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${currentMovie?.id}?api_key=${
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
  }, [currentMovie])

  const handleClose = () => {
    setShowModal(false)
    setCurentMovie(null)
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-8 w-8 cursor-pointer border-none bg-[#181818] p-1 !font-extralight hover:bg-[#181818]"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            muted={muted}
            playing
            style={{ position: 'absolute', top: '0', left: '0' }}
            height="100%"
            width="100%"
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayArrowIcon
                  fontSize="large"
                  className="h-7 w-7 text-black"
                />
                Play
              </button>
              <button className="modalButton">
                <AddIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpOffAltIcon className="h-7 w-7" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-7 w-7" />
              ) : (
                <VolumeUpIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400 ">
                {currentMovie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {' '}
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className="flex h-4  items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray] ">Genres: </span>
                  {genre.map((gen) => gen.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total Votes: </span>

                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}
