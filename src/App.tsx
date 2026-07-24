import { useRef, useState } from 'react'
import ProfileCard from './components/ProfileCard'
import Background from './components/Background'
import EnterGate from './components/Entergate'
import MusicPlayer from './components/MusicProps'
import type { MusicPlayerHandle } from './components/MusicProps'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)
  const playerRef = useRef<MusicPlayerHandle>(null)

  const handleEnter = () => {
    playerRef.current?.play()
    setTimeout(() => setEntered(true), 700) // matches EnterGate's fade-out duration
  }

  return (
    <div className='app-background min-h-screen w-full flex items-center justify-center'>

      {!entered && <EnterGate onEnter={handleEnter} />}

      <Background videoURL='/Blink-eye-background.mp4' />

      <div className='content-wrapper'>
        <ProfileCard
          name="𝕙𝕩𝕣𝕤𝕙.𝟞𝟡_"
          tagline="links"
          location="5 inches from a mental breakdown"
          avatarUrl="/profilepic.gif"
          discordId="353953706384818177"
          discordUrl='https://discord.com/users/353953706384818177'
          instagramUrl='https://www.instagram.com/hxrsh.69_/'
          steamUrl='https://steamcommunity.com/id/90909090123/'
          linkedin='https://www.linkedin.com/in/harsh-hemraz-38317b2b1/'
          discordavatar='avatar.png'
        />
        <MusicPlayer
          ref={playerRef}
          title='Augxst - See Me'
          coverURL='/AudioBeat.gif'
          songURL='/seeme.mp3'
          volume={1}
        />
      </div>
    </div>
  )
}

export default App