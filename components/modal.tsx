import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { useRecoilValue, useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import {
  PlusIcon,
  XMarkIcon,
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player/lazy';
import { Genre, IElement } from '../typings';
import { FaPlay } from 'react-icons/fa';
const Modal = () => {
  const movie = useRecoilValue(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [trailer, setTrailer] = useState('');
  const [muted, setMuted] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (movie === null) return;
    const fetchMovie = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === 'tv' ? 'tv' : 'movie'
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        ).then(async (response) => await response.json());
        if (data?.videos !== null) {
          const index = data.videos.results.findIndex(
            (element: IElement) => element.type === 'Trailer'
          );
          setTrailer(data.videos?.results[index]?.key);
        }
        if (data?.genres !== null) {
          setGenres(data.genres);
        }
      } catch (error) {
        alert(error);
      }
    };
    void fetchMovie();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex items-center justify-between w-full px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl text-black font-bold transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">{movie?.release_date}</p>
              <div className="flex items-center rounded border border-white/40">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres
                    .map((genre) => {
                      return genre.name;
                    })
                    .join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
