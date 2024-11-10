import './Home.css'
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const [shouldPlay, setShouldPlay] = useState(true);
  const clickSoundEffect = new Audio(`src/assets/Mouse Click Sound Effect (2).mp3`);
  clickSoundEffect.preload = 'auto';
  const [bojackTheme] = useState(new Audio(`src/assets/BoJack's Theme (Full Length).mp3`)); 


  useEffect(() => {
    const playbojackTheme = async () => {
      try {
        bojackTheme.play();
        setShouldPlay(true);
      } catch(err) {
        console.error(`Autoplay was prevented: `, err)
      }
    };

    playbojackTheme();

    return () => {
      bojackTheme.pause();
      bojackTheme.currentTime = 0;
      // setShouldPlay(false);
    };
  }, [bojackTheme])


  const fadeOutAudio = async (duration: number): Promise<void> => {
    const fadeDuration = duration || 3000; // Default fade duration is 3 seconds
    const fadeSteps = 30; // Number of fade steps
    const fadeInterval = fadeDuration / fadeSteps;
    let currentVolume = bojackTheme.volume;
  
    return new Promise<void>((resolve) => { // Specify void here
      const interval = setInterval(() => {
        if (currentVolume > 0) {
          currentVolume -= 1 / fadeSteps;
          bojackTheme.volume = Math.abs(currentVolume);
        } else {
          clearInterval(interval); // Stop fading when volume reaches 0
          bojackTheme.pause(); // Ensure audio is paused after fade
          resolve(); // Fade-out complete
        }
      }, fadeInterval);
    });
  };

  //errors

  async function handleClick() {
    await fadeOutAudio(1000);
    navigate('./play-solo')
    // if(whereTo === 'play-solo') {
    //   navigate('./playsolo');
    // } else if(whereTo === 'play-friend') {
    //   navigate('./playfriend')
    // } else if(whereTo === 'how-to-play') {
    //   navigate('./how-to-play')
    // }
  }

  return (
    createHomePage(handleClick)
  );
}

function createHomePage(handleClick: any) {
  return (
    <>
      <div className="main-container">
        <div className="title">
            <h1 className='main'>HollyWoo Stars and Celebrities</h1>
            <h3 className='sub'>What do they know? Do they know things?? Let's find out!</h3>
          </div>

          <div className="play">
            <button className='how-to' onClick={handleClick}>How to Play</button>
            <button className="solo" onClick={handleClick}>Play Solo</button>
            <button className="join-a-friend" onClick={handleClick}>Join a Friend</button>
          </div>
        </div>
    </>
  )
}
