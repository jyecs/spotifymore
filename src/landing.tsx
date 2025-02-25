import React, { useRef } from "react"
interface Props {
  isChanged: boolean;
  isLoading: boolean
  callback: () => void;
}

const Landing: React.FC<Props> = ({isChanged, isLoading, callback}) => {

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  // const FAQSectionRef = useRef(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({behavior: "smooth"})
  }

  if(isLoading || isChanged) {
    return null;
  }

  return (    
    <div className=''>
      <header className='grid grid-cols-10 grid-rows-none bg-black text-white gap-2 text-xl m-5 pr-40 pl-40'>
        <p className='justify-self-center'>Listify</p>
        <p onClick={scrollToAbout} className='justify-self-end col-start-8 row-start-1'>About</p>
        <p className='justify-self-center col-start-9 row-start-1'>FAQ</p>
        <a href="https://github.com/jyecs" className='justify-self-start col-start-10 row-start-1'>GitHub</a>
      </header>
      <hr className='p-[1px 0px 0px 10px] w-full bg-gray-700 h-[2px] mb-30'></hr>
      <div className='flex flex-col text-white h-screen gap-2 items-center content-center'>
        <h1 className='font-bold text-[60px]'>Load. Tailor. Listen.</h1>
        <p className='text-4x1'>Quickly create playlists from your favorite songs on Spotify.</p>
        <button className='bg-green-600 h-12 w-30 rounded-3xl hover:bg-green-700' onClick={callback}>Get Started</button>
      </div>
      <div ref={aboutSectionRef} className='pl-60 pr-60 bg-gray-900'>
        <div className='flex flex-col text-white h-screen gap-4 items-center content-center bg-gray-900 pr-60 pl-60 pt-45'>
          <h1 className='font-bold text-[60px]'>FAQ</h1>
          <h2 className='text-2xl'>How does Listify work?</h2>
          <p className='text-center text-gray-400'>Listify retrieves your Spotify saved songs through Spotify's API and categorizes them by genre.</p>
          <h2 className='text-2xl'>How come some songs don't show up in any playlist?</h2>
          <p className='text-center text-gray-400'>We categorize songs through genre by proxy of their artist's genre. However some artists don't have genres associated with them, even some well known artists such as Imagine Dragons do not have a genre associated with them.</p>
          <h2 className='text-2xl'>How come it says that I can't use Listify?</h2>
          <p className='text-center text-gray-400'>Until this app gets an extended quota status from Spotify, you must be whitelisted in order to use.</p>
          <h2 className='text-2xl'>Is this app associated with Spotify?</h2>
          <p className='text-center text-gray-400'>While we use their API, Listify is not associated in anyway with Spotify</p>
        </div>
      </div>
    </div>)
}

export default Landing