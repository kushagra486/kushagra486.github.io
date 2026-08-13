export function Wallpaper() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#0a1a2e] via-[#0f2740] to-[#040810]">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />
      <div
        className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] animate-pulse rounded-full bg-blue-500/20 blur-3xl"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 animate-pulse rounded-full bg-purple-500/10 blur-3xl"
        style={{ animationDelay: '3s' }}
      />
    </div>
  );
}
