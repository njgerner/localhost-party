export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="border-2 border-[var(--neon-cyan)] bg-[var(--noir-dark)] p-8 rounded-lg">
        <h1
          className="text-5xl font-bold mb-4 neon-text-cyan"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ADMIN CONSOLE
        </h1>
        <p className="text-xl text-gray-300">
          Manage your localhost:party game platform
        </p>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Prompts"
          value="26"
          description="Hardcoded prompts"
          color="cyan"
          icon="📝"
        />
        <StatCard
          title="Sound Effects"
          value="9"
          description="Audio files"
          color="magenta"
          icon="🔊"
        />
        <StatCard
          title="Games"
          value="1"
          description="Quiplash active"
          color="yellow"
          icon="🎮"
        />
      </div>

      {/* Quick actions */}
      <div className="border border-[var(--noir-medium)] bg-[var(--noir-dark)] p-6 rounded-lg">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          QUICK ACTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionButton
            href="/admin/prompts"
            title="Manage Prompts"
            description="Create and edit game prompts"
            icon="📝"
            available={false}
          />
          <QuickActionButton
            href="/admin/config"
            title="Game Configuration"
            description="Configure game settings and rules"
            icon="⚙️"
            available={false}
          />
          <QuickActionButton
            href="/admin/assets"
            title="Asset Manager"
            description="Upload and manage audio/visual assets"
            icon="🎨"
            available={false}
          />
          <QuickActionButton
            href="/admin/analytics"
            title="Analytics"
            description="View platform statistics"
            icon="📊"
            available={false}
            comingSoon
          />
        </div>
      </div>

      {/* System status */}
      <div className="border border-[var(--noir-medium)] bg-[var(--noir-dark)] p-6 rounded-lg">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SYSTEM STATUS
        </h2>
        <div className="space-y-3">
          <StatusRow
            label="Platform"
            status="online"
            message="All systems operational"
          />
          <StatusRow
            label="Database"
            status="online"
            message="Connected to Neon"
          />
          <StatusRow
            label="WebSocket"
            status="online"
            message="Real-time server running"
          />
          <StatusRow
            label="TTS API"
            status="online"
            message="ElevenLabs connected"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  color,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  color: "cyan" | "magenta" | "yellow";
  icon: string;
}) {
  const colorClasses = {
    cyan: "border-[var(--neon-cyan)] neon-text-cyan",
    magenta: "border-[var(--neon-magenta)] neon-text-magenta",
    yellow: "border-[var(--neon-yellow)] neon-text-yellow",
  };

  return (
    <div
      className={`border-2 ${colorClasses[color]} bg-[var(--noir-dark)] p-6 rounded-lg`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      </div>
      <div
        className={`text-4xl font-bold mb-1 ${colorClasses[color]}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function QuickActionButton({
  href,
  title,
  description,
  icon,
  available,
  comingSoon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  comingSoon?: boolean;
}) {
  const Component = available ? "a" : "div";

  return (
    <Component
      {...(available ? { href } : {})}
      className={`
        border-2 border-[var(--neon-cyan)] bg-[var(--noir-darker)] p-4 rounded-lg
        transition-all duration-200
        ${available ? "hover:bg-[var(--noir-dark)] cursor-pointer" : "opacity-50 cursor-not-allowed"}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {comingSoon && (
              <span className="text-xs px-2 py-1 bg-[var(--neon-magenta)] text-black rounded">
                SOON
              </span>
            )}
            {!available && !comingSoon && (
              <span className="text-xs px-2 py-1 bg-[var(--noir-medium)] text-gray-400 rounded">
                PENDING
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </Component>
  );
}

function StatusRow({
  label,
  status,
  message,
}: {
  label: string;
  status: "online" | "offline" | "warning";
  message: string;
}) {
  const statusConfig = {
    online: { color: "var(--neon-green)", text: "ONLINE" },
    offline: { color: "var(--neon-magenta)", text: "OFFLINE" },
    warning: { color: "var(--neon-yellow)", text: "WARNING" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2 border-b border-[var(--noir-medium)] last:border-0">
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: config.color,
            boxShadow: `0 0 10px ${config.color}`,
          }}
        />
        <span className="font-semibold">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">{message}</span>
        <span
          className="text-xs font-bold px-2 py-1 rounded"
          style={{
            color: config.color,
            borderColor: config.color,
            border: "1px solid",
          }}
        >
          {config.text}
        </span>
      </div>
    </div>
  );
}
