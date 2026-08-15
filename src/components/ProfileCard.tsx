import './ProfileCard.css'
import { useEffect, useState } from 'react';

interface ProfileCardProps {
    name: string;
    tagline: string;
    location: string;
    discordId: string;
    avatarUrl: string;
    discordUrl: string;
    instagramUrl: string;
    steamUrl: string;
    linkedin: string;
    discordavatar: string;
    gitHub: string;
}

interface LanyardData {
  discord_user: {
    username: string;
    global_name: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: { name: string; type: number; details?: string }[];
  listening_to_spotify?: boolean;
  spotify?: { song: string; artist: string };
}

function ProfileCard({ name, tagline, location, discordId, avatarUrl, discordUrl, linkedin, instagramUrl, steamUrl, discordavatar, gitHub }: ProfileCardProps) {
    const [presence, setPresence] = useState<LanyardData | null>(null);

    useEffect(() => {
        const fetchPresence = async () => {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
            const json = await res.json();
            if (json.success) setPresence(json.data);
        };

        fetchPresence();
        const interval = setInterval(fetchPresence, 15000);
        return () => clearInterval(interval);
    }, [discordId]);

    const activity = presence?.activities.find(a => a.type !== 4);

   const statusText = presence?.listening_to_spotify && presence.spotify
    ? `🎧 Listening to ${presence.spotify.song} — ${presence.spotify.artist}`
    : activity?.type === 0
    ? `🎮 Playing ${activity.name}${activity.details ? ` — ${activity.details}` : ""}`
    : activity
    ? `${activity.name}${activity.details ? ` — ${activity.details}` : ""}`
    : presence?.discord_status === "offline"
    ? "Out of town"
    : presence
    ? "🟢 Currently Online  "
    : "Loading...";

    return (
    <div className='profilecard gap-5 bg-black/50 backdrop-blur-md rounded-2xl px-4 py-3 pb-5 text-white mt-4'>

        <div className='flex justify-center p-5'>
        <img src={avatarUrl} alt='avatar' className='avatar h-25 rounded-2xl' />
        </div>

        <div className='text-display flex justify-center items-center flex-col'>
        <h1 className='name text-2xl'>{name}</h1>
        <p className='tagline'>{tagline}</p>
        <p className='location text-xs pt-5'>📍{location}</p>
        </div>

        <div className='flex justify-center flex-row'>
            <a href={discordUrl} className='logo'>
            <img src="/DiscordLogo.gif" className="badge-avatar w-15 h-15" style={{ transform: 'translateY(-5px)' }}/>
            </a>
            <a href={instagramUrl} className='logo'>
            <img src="Insta-logo.gif" className='badge-avatar mt-1.5 w-12 h-12' />
            </a>
            <a href={steamUrl} className='logo'>
            <img src="Steam.gif" className='badge-avatar mt-1.5 w-12 h-12' />
            </a>
            <a href={linkedin} className='logo'>
            <img src="LinkedIn-logo.gif" className='badge-avatar mt-1.5 w-12 h-12' />
            </a>
            <a href={gitHub} className='logo'>
                <img src="GitGif.gif" className='badge-avatar mt-1.5 w-12 h-12' />
            </a>
        </div>

<div className='flex items-center gap-3 bg-white/5 rounded-2xl px-6 mt-2 h-15'>
  <div className='flex items-center gap-3' style={{ transform: 'translateX(15px)' }}>
    <img
      src={discordavatar}
      alt='avatar'
      className='w-10 h-10 rounded-full object-cover'
    />

    <div className='flex flex-col'>
      <p className='username font-semibold text-sm'>
        {presence?.discord_user.global_name || presence?.discord_user.username || 'Loading...'}
      </p>

      <p className='last-seen text-xs italic text-white/50'>
        {statusText}
      </p>
    </div>
  </div>
</div>
</div>
    
    );
}

export default ProfileCard;