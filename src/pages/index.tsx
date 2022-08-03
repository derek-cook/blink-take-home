import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Blink Take Home</title>
        <meta
          name="description"
          content="Derek's project for Blink take-home assessment."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-xl">Blink Take-Home Assessment</h1>
        <h2 className="text-lg">by Derek Cook</h2>
        <p className="">
          Here&apos;s my project! Go to{' '}
          <Link href="/drugs/search">
            <a className="text-blue-500">search.</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Home;
