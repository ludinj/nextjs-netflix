import Image from 'next/image';
import { IMovie } from '../typings';
import { useSetRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

interface IThumbnailProps {
  //   movie: IMovie |IDocumentData;
  movie: IMovie;
}
const Thumbnail = ({ movie }: IThumbnailProps) => {
  const setShowModal = useSetRecoilState(modalState);
  const setCurrentMovie = useSetRecoilState(movieState);

  return (
    <div
      className={
        'relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      }
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill
        sizes="180px 112px"
        alt={movie.title}
      />
    </div>
  );
};

export default Thumbnail;
