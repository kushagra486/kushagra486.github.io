export function GitHubStreakWidget() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://streak-stats.demolab.com?user=kushagra486&theme=tokyonight&hide_border=true&background=00000000&ring=00e5ff&fire=00ff94&currStreakLabel=00e5ff&sideLabels=b8c9db&dates=4a6178&sideNums=00e5ff"
        alt="GitHub contribution streak"
        className="w-full"
      />
    </div>
  );
}
