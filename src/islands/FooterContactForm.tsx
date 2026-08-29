import { useState } from "react";
import { sendMessage } from "../util/api";

export default function FooterContactForm() {
  const [senderEmail, setSenderEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "limited">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await sendMessage({ senderEmail });
      if (response.ok) {
        setStatus("sent");
        setSenderEmail("");
      } else if (response.status === 429) {
        setStatus("limited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        required
        placeholder="Email"
        value={senderEmail}
        onChange={(e) => setSenderEmail(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent text-sm text-white placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent text-black px-3 rounded-lg font-bold text-xs uppercase"
      >
        {status === "sent" ? "Sent!" : "Send"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
      {status === "limited" && (
        <p className="text-red-400 text-xs mt-2">Too many messages sent. Try again later.</p>
      )}
    </form>
  );
}
