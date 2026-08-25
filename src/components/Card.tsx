interface Props {
  name: string;
  description: string;
  language: string;
  stars: number;
}

const Card = ({ name, description, language, stars }: Props) => (
  <div className="bg-panel rounded-2xl p-6 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform">
    <div>
      <h4 className="text-base font-semibold mb-2">{name}</h4>
      <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
    </div>
    <div className="flex items-center justify-between mt-4 text-sm">
      <span className="text-gray-400">{language}</span>
      <span className="text-yellow-400">Stars {stars}</span>
    </div>
  </div>
);
export default Card;
