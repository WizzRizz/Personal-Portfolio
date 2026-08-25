import "./ProfileCard.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("messages")
      .insert([{ content: message.trim() }]);

    setSending(false);

    if (insertError) {
      console.error("Failed to send message:", insertError);
      setError("Something went wrong. Try again.");
      return;
    }

    setMessage("");
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* ================= PROFILE CARD ================= */}

      <div className="profilecard bg-black/50 backdrop-blur-md rounded-2xl text-white">
        {/* Avatar */}

        <div className="flex justify-center pt-2 pb-1">
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="avatar h-25 rounded-2xl"
          />
        </div>

        {/* Name / Info */}

        <div className="text-display flex justify-center items-center flex-col py-1">
          <h1 className="name text-2xl">{name}</h1>

          <p className="tagline">{tagline}</p>

          <p className="location text-xs pt-1.5">📍{location}</p>
        </div>

        {/* Social Links */}

        <div className="flex justify-center flex-row gap-1 pt-2">
          <a
            href={discordUrl}
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/DiscordLogo.gif"
              alt="Discord"
              className="badge-avatar w-15 h-15 mt-10 hover:scale-120"
              
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

        <div className="discord-presence-wrapper">
          <div className="discord-presence">
            <img
              src={discordavatar}
              alt="Discord avatar"
              className="discord-avatar"
            />

            <div className="discord-info">
              <p className="discord-username">
                {presence?.discord_user.global_name ||
                  presence?.discord_user.username ||
                  "Loading..."}
              </p>

              <p className="discord-status">{statusText}</p>
            </div>
          </div>
        </div>

        {/* Anonymous Message Hint */}

        <div className="mt-4 flex justify-center">
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
              <p className="anonymous-small-title">ANONYMOUS MESSAGE</p>

              <h2 className="anonymous-title">Leave a message</h2>

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
              disabled={!message.trim() || sending}
              className="anonymous-send"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>

          {/* Error */}

          {error && <p className="anonymous-error">{error}</p>}

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