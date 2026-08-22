import "./ProfileCard.css";
import { useEffect, useState } from "react";

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
  activities: {
    name: string;
    type: number;
    details?: string;
  }[];
  listening_to_spotify?: boolean;
  spotify?: {
    song: string;
    artist: string;
  };
}

function ProfileCard({
  name,
  tagline,
  location,
  discordId,
  avatarUrl,
  discordUrl,
  linkedin,
  instagramUrl,
  steamUrl,
  discordavatar,
  gitHub,
}: ProfileCardProps) {
  const [presence, setPresence] = useState<LanyardData | null>(null);

  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${discordId}`,
        );

        const json = await res.json();

        if (json.success) {
          setPresence(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch Discord presence:", error);
      }
    };

    fetchPresence();

    const interval = setInterval(fetchPresence, 15000);

    return () => clearInterval(interval);
  }, [discordId]);

  const activity = presence?.activities.find((a) => a.type !== 4);

  const statusText =
    presence?.listening_to_spotify && presence.spotify
      ? `🎧 Listening to ${presence.spotify.song} — ${presence.spotify.artist}`
      : activity?.type === 0
        ? `🎮 Playing ${activity.name}${
            activity.details ? ` — ${activity.details}` : ""
          }`
        : activity
          ? `${activity.name}${
              activity.details ? ` — ${activity.details}` : ""
            }`
          : presence?.discord_status === "offline"
            ? "Out of town"
            : presence
              ? "🟢 Currently Online"
              : "Loading...";

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Anonymous message:", message);

    setMessage("");
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <div className="w-full">

      {/* ================= PROFILE CARD ================= */}

      <div className="profilecard gap-5 bg-black/50 backdrop-blur-md rounded-2xl px-4 py-3 pb-5 text-white mt-4">

        {/* Avatar */}

        <div className="flex justify-center p-5">
          <img
            src={avatarUrl}
            alt="avatar"
            className="avatar h-25 rounded-2xl"
          />
        </div>

        {/* Name / Info */}

        <div className="text-display flex justify-center items-center flex-col">

          <h1 className="name text-2xl">
            {name}
          </h1>

          <p className="tagline">
            {tagline}
          </p>

          <p className="location text-xs pt-5">
            📍{location}
          </p>

        </div>

        {/* Social Links */}

        <div className="flex justify-center flex-row">

          <a
            href={discordUrl}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/DiscordLogo.gif"
              alt="Discord"
              className="badge-avatar w-15 h-15"
              style={{ transform: "translateY(-5px)" }}
            />
          </a>

          <a
            href={instagramUrl}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Insta-logo.gif"
              alt="Instagram"
              className="badge-avatar mt-1.5 w-12 h-12"
            />
          </a>

          <a
            href={steamUrl}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Steam.gif"
              alt="Steam"
              className="badge-avatar mt-1.5 w-12 h-12"
            />
          </a>

          <a
            href={linkedin}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/LinkedIn-logo.gif"
              alt="LinkedIn"
              className="badge-avatar mt-1.5 w-12 h-12"
            />
          </a>

          <a
            href={gitHub}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/GitGif.gif"
              alt="GitHub"
              className="badge-avatar mt-1.5 w-12 h-12"
            />
          </a>

        </div>

        {/* Discord Presence */}

        <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-6 mt-2 h-15">

          <div
            className="flex items-center gap-3"
            style={{ transform: "translateX(15px)" }}
          >

            <img
              src={discordavatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col">

              <p className="username font-semibold text-sm">
                {presence?.discord_user.global_name ||
                  presence?.discord_user.username ||
                  "Loading..."}
              </p>

              <p className="last-seen text-xs italic text-white/50">
                {statusText}
              </p>

            </div>

          </div>

        </div>

        {/* Anonymous Message Hint */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={() => setMessageOpen((prev) => !prev)}
            className="anonymous-hint"
          >
            {messageOpen
              ? "Close anonymous message"
              : "Click to send an anonymous message"}
          </button>

        </div>

      </div>


      {/* ================= ANONYMOUS MESSAGE CARD ================= */}

      <div
        className={`anonymous-container ${
          messageOpen ? "anonymous-container-open" : ""
        }`}
      >

        <div className="anonymous-card">

          {/* Header */}

          <div className="anonymous-header">

            <div>
              <p className="anonymous-small-title">
                ANONYMOUS MESSAGE
              </p>

              <h2 className="anonymous-title">
                Leave a message
              </h2>

              <p className="anonymous-description">
                Send something anonymously.
              </p>
            </div>

          </div>


          {/* Message */}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something..."
            maxLength={500}
            className="anonymous-textarea"
          />


          {/* Bottom */}

          <div className="anonymous-bottom">

            <span className="anonymous-counter">
              {message.length}/500
            </span>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="anonymous-send"
            >
              Send
            </button>

          </div>


          {/* Success */}

          {sent && (
            <p className="anonymous-success">
              ✓ Message sent anonymously
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;