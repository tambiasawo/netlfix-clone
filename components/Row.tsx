import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import React from 'react'
import { Movie } from '../typings.def'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[]
  //when using firebase
}
function Row({ title, movies }: Props) {
  const rowRef = React.useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false)

  function handleClick(direction: string): void {
    setIsScrolled(true)
    if (rowRef.current) {
      /*
         clientWidth: is the width of the screen
         scrollLeft: is how much to the left the div/ref can scroll to
        */
      const { clientWidth, scrollLeft } = rowRef.current
      const scrollDestination =
        direction === 'left'
          ? scrollLeft - clientWidth
          : clientWidth + scrollLeft
      rowRef.current.scrollTo({ left: scrollDestination, behavior: 'smooth' })
    }
  }
  return (
    <div className="h-40 sm:space-y-0.5 md:space-y-2">
      <h2 className="pointer semi-bold w-56 cursor-pointer text-sm text-[#e5e5e5] hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftOutlined
          onClick={() => handleClick('left')}
          className={`absolute top-0 left-2 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 ${
            !isScrolled && 'hidden'
          }`}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightOutlined
          onClick={() => handleClick('right')}
          className={`absolute top-0 right-2 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125`}
        />
      </div>
    </div>
  )
}

export default Row
