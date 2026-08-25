interface Props {
  message: string;
}

const Alert = ({ message }: Props) => (
  <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 text-red-300 px-4 py-3 text-sm" role="alert">
    {message}
  </div>
);
export default Alert;
