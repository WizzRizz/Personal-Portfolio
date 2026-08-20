import { useRef, useState } from 'react'
import ProfileCard from './components/ProfileCard'
import Background from './components/Background'
import EnterGate from './components/Entergate'
import MusicPlayer from './components/MusicProps'
import type { MusicPlayerHandle } from './components/MusicProps'

import './App.css'

// --- Add your options here ---
const backgrounds = [
  '/Blink-eye-background.mp4',
  '/yourname.mp4',
  '/fate.mp4',
]

const songs = [
  { title: 'Augxst - See Me', coverURL: '/AudioBeat.gif', songURL: '/seeme.mp3' },
  { title: "LOVIXX and STOSLIV - Don't tell your dreams", coverURL: '/AudioBeat.gif', songURL: '/donttellyourdreams.mp3' },
  { title: "IRIAS and STOSLIV - Prada", coverURL: '/AudioBeat.gif', songURL: '/prada.mp3' },
  { title: "Farazi - Dobro Vecer (Remastered)", coverURL: '/AudioBeat.gif', songURL: '/dobrovercer.mp3' },
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function App() {
  const [entered, setEntered] = useState(false)
  const playerRef = useRef<MusicPlayerHandle>(null)

  // Lazy initializers => runs once per mount (i.e. once per refresh)
  const [background] = useState(() => pickRandom(backgrounds))
  const [song] = useState(() => pickRandom(songs))

  const handleEnter = () => {
    playerRef.current?.play()
    setTimeout(() => setEntered(true), 700)
  }

  return (
    <div className='app-background min-h-screen w-screen h-screen flex items-center justify-center overflow-hidden bg-black'>

      {!entered && <EnterGate onEnter={handleEnter} />}

      <Background videoURL={background} />

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
          linkedin='https://www.linkedin.com/in'
          discordavatar='avatar.png'
          gitHub='https://github.com/WizzRizz'
        />
        <MusicPlayer
          ref={playerRef}
          title={song.title}
          coverURL={song.coverURL}
          songURL={song.songURL}
          volume={1}
        />
      </div>
    </div>
  )
}

export default App