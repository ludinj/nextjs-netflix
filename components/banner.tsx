import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { baseUrl } from '../constants/movie';
import { IMovie } from '../typings';
interface BannerProps {
  netflixOriginals: IMovie[];
}
const Banner = ({ netflixOriginals }: BannerProps) => {
  const [radomMovie, setRadomMovie] = useState<IMovie | null>(null);
  const setShowModal = useSetRecoilState(modalState);
  const setCurrentMovie = useSetRecoilState(movieState);
  useEffect(() => {
    setRadomMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 md:space-y-4 lg:h-[65vh]  lg:justify-end   ">
      <div className="absolute top-0 left-0 h-[95vh] -z-10 w-full ">
        <Image
          src={`${baseUrl}${
            radomMovie?.backdrop_path !== null
              ? radomMovie?.backdrop_path
              : radomMovie.poster_path
          }`}
          alt={radomMovie !== null ? radomMovie.title : 'movie'}
          fill={true}
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl md:text-4xl  lg:text-5xl  font-bold">
        {radomMovie?.title}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-3xl lg:text-xl">
        {radomMovie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(radomMovie);
            setShowModal(true);
          }}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
