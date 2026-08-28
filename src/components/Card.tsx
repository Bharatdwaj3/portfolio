interface Props {
  name: string;
  description: string;
  language: string;
  stars: number;
  topics: string[];
  htmlUrl: string;
  liveUrl: string | null;
  imageUrl?: string | null;
}

const LANGUAGE_HUES: Record<string, number> = {
  JavaScript: 48, TypeScript: 205, Java: 25, Python: 200, PHP: 265,
  HTML: 15, CSS: 340, SCSS: 330, C: 220, Blade: 350, Makefile: 10,
  "yaml-configuration": 160,
};
const getHue = (language: string) => LANGUAGE_HUES[language] ?? 330;

const Card = ({ name, description, language, stars, topics, htmlUrl, liveUrl, imageUrl }: Props) => {
  const hue = getHue(language);

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors h-full flex flex-col">
      <div
        className="relative overflow-hidden shrink-0 h-40 flex flex-col"
        style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 16%), hsl(${hue} 55% 8%))` }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} preview`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-black/20 shrink-0">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2 px-5">
              <div className="h-2 rounded" style={{ width: "70%", background: `hsl(${hue} 60% 55% / 0.35)` }} />
              <div className="h-2 rounded" style={{ width: "45%", background: "rgba(255,255,255,0.12)" }} />
              <div className="h-2 rounded" style={{ width: "60%", background: "rgba(255,255,255,0.12)" }} />
              <div className="h-2 rounded" style={{ width: "30%", background: `hsl(${hue} 60% 55% / 0.35)` }} />
            </div>
            <span
              className="absolute bottom-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold uppercase"
              style={{ background: `hsl(${hue} 50% 20%)`, color: `hsl(${hue} 70% 65%)` }}
            >
              {name.slice(0, 2)}
            </span>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h4 className="text-base font-semibold mb-2 text-text">{name}</h4>
          <p className="text-sm text-text-muted line-clamp-3 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {language && (
              <span className="text-[13px] border border-accent/40 text-accent px-2.5 py-1 rounded-full">
                {language}
              </span>
            )}
            {topics.slice(0, 4).map((topic) => (
              <span key={topic} className="text-[13px] border border-border text-text-muted px-2.5 py-1 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1 text-sm text-yellow-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> {stars}
          </span>
          <div className="flex items-center gap-3">
              <a
            
              href={htmlUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${name} source on GitHub`}
              className="text-text-muted hover:text-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.71 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>
            </a>
            {liveUrl && (
              
                <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${name} live demo`}
                className="text-text-muted hover:text-accent transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
