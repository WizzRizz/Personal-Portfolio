import { useEffect, useState } from "react";

interface LanyardData {
  discord_user: {
    username: string;
    global_name: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: { name: string; type: number; state?: string; details?: string }[];
}

function DiscordPresence({ discordId }: { discordId: string }) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    const fetchPresence = async () => {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, [discordId]);

  if (!data) return null;

  const activity = data.activities.find(a => a.type !== 4); // skip custom status type
  const doingText = activity
    ? `${activity.name}${activity.details ? ` — ${activity.details}` : ""}`
    : data.discord_status === "offline"
    ? "Offline"
    : "Just chilling";

  return (
    <div className="text-display flex justify-center items-center flex-col">
      <p className="username">Username: {data.discord_user.global_name || data.discord_user.username}</p>
      <p className="last-seen">{doingText}</p>
    </div>
  );
}

export default DiscordPresence;