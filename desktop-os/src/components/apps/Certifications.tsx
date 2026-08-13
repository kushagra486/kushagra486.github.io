import { certifications } from '@/lib/portfolioData';

export function Certifications() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-white/50">
        {certifications.length} certifications earned. Images pending — drop files under{' '}
        <code className="rounded bg-white/10 px-1 py-0.5">public/certs/</code> and set{' '}
        <code className="rounded bg-white/10 px-1 py-0.5">imageUrl</code> in{' '}
        <code className="rounded bg-white/10 px-1 py-0.5">lib/portfolioData.ts</code> to show them.
      </p>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={cert.slug}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/10 text-xl">
              {cert.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.imageUrl} alt={cert.name} className="h-full w-full rounded-md object-cover" />
              ) : (
                '🏅'
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/90">{cert.name}</p>
              <p className="truncate text-xs text-white/50">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
