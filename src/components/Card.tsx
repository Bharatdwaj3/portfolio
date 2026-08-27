interface Props {
  name: string;
  description: string;
  language: string;
  stars: number;
  topics: string[];
}

const Card = ({ name, description, language, stars, topics }: Props) => (
  <div className="bg-panel rounded-2xl p-6 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform">
    <div>
      <h4 className="text-base font-semibold mb-2">{name}</h4>
      <p className="text-sm text-gray-400 line-clamp-3 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {language && (
          <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full">
            {language}
          </span>
        )}
        {topics.slice(0, 4).map((topic) => (
          <span key={topic} className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-full">
            {topic}
          </span>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-end mt-4 text-sm">
      <span className="text-yellow-400">★ {stars}</span>
    </div>
  </div>
);

export default Card;
