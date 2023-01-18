import { IMovie } from '../typings';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Thumbnail from './thumbnail';
import { useRef, useState } from 'react';
interface IRowProps {
  title: string;
  movies: IMovie[];
  //   movie: IMovie []|IDocumentData;
}
const Row = ({ title, movies }: IRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const handleClick = (side: string) => {
    setIsMoved(true);
    if (rowRef.current !== null) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        side === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 ">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <BsChevronLeft
          className={`top-0 bottom-0 absolute left-2 z-40  m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          ref={rowRef}
          className="scrollbar-hide flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail movie={movie} key={movie.id} />
          ))}
        </div>
        <BsChevronRight
          className={
            'top-0 bottom-0 absolute right-2 z-40  m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100'
          }
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;
