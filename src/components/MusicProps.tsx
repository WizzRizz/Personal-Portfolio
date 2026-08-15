import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FaPlay, FaPause } from 'react-icons/fa';

interface musicPlayerProps {
    title: string;
    songURL: string;
    coverURL: string;
    volume: number;
}

export interface MusicPlayerHandle {
    play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, musicPlayerProps>(
    ({ title, songURL, coverURL, volume = 0.3 }, ref) => {
        const [isPlaying, setIsPlaying] = useState<boolean>(false);
        const [currentTime, setCurrentTime] = useState<number>(0);
        const [duration, setDuration] = useState<number>(0);
        const audioRef = useRef<HTMLAudioElement>(null);

        useImperativeHandle(ref, () => ({
            play: () => {
                audioRef.current?.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        }));

        useEffect(() => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
            }
        }, [volume]);

        const togglePlay = () => {
            if (!audioRef.current) return;
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        };

        useEffect(() => {
            const audio = audioRef.current;
            if (!audio) return;

            const updateTime = () => setCurrentTime(audio.currentTime);
            const setAudioDuration = () => setDuration(audio.duration);

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', setAudioDuration);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', setAudioDuration);
            };
        }, []);

        const formatTime = (time: number): string => {
            if (isNaN(time)) return '0:00';
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        const progressPercent = duration ? (currentTime / duration) * 100 : 0;

        return (
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md rounded-2xl px-4 py-3 w-[400px] text-white mt-4">
                <audio ref={audioRef} src={songURL} loop />
                <img src={coverURL} alt="cover" className="w-11 h-11 rounded-lg object-cover" />

                <div className="flex-1">
                    <span className="text-sm font-medium">{title}</span>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-300" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                    </div>
                </div>

                {isPlaying ? (
                    <FaPause className="cursor-pointer text-lg" onClick={togglePlay} />
                ) : (
                    <FaPlay className="cursor-pointer text-lg" onClick={togglePlay} />
                )}
            </div>
        );
    }
);

export default MusicPlayer;