import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Banner from '../components/banner';
import Header from '../components/Header';
import Modal from '../components/modal';
import Row from '../components/row';
import useAuth from '../hooks/useAuth';
import { IMovie } from '../typings';
import requests from '../utils/requests';

interface homeProps {
  netflixOriginals: IMovie[];
  trendingNow: IMovie[];
  topRated: IMovie[];
  actionMovies: IMovie[];
  comedyMovies: IMovie[];
  horrorMovies: IMovie[];
  romanceMovies: IMovie[];
  documentaries: IMovie[];
}
const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow
}: homeProps) => {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) {
    return null;
  }
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* Header */}
      <main className="relative pl-4 md:pl-16 pb-24 lg:space-y-24 lg:pl-16 pt-24">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchTrending).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchTopRated).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchActionMovies).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchComedyMovies).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchHorrorMovies).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchRomanceMovies).then(
      async (res: Response) => await res.json()
    ),
    fetch(requests.fetchDocumentaries).then(
      async (res: Response) => await res.json()
    )
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results
    }
  };
};
