import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useAppSelector } from "../store/hooks";
import Alert from "../components/Alert";
import { sendMessage } from "../util/api";
import { motion } from "framer-motion";

function Form() {
  const lastVisitedProject = useAppSelector((state) => state.navigation.lastVisitedProject);
  const [senderEmail, setSenderEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await sendMessage({ senderEmail });
      if (response.ok) {
        setStatusMessage("Thanks! I'll be in touch soon.");
        setSenderEmail("");
      } else if (response.status === 429) {
        setStatusMessage("Too many messages sent. Please try again later.");
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-white/5 shadow-xl rounded-lg px-8 py-12 w-full max-w-md text-center mx-auto">
      <header className="text-white text-3xl font-semibold mb-2">Get In Touch</header>
      <p className="text-gray-400 text-sm mb-8">Drop your email and I'll reach out.</p>
      {lastVisitedProject && (
        <p className="text-accent text-sm mb-4">
          Have a question about {lastVisitedProject}? I'll mention it when I reply.
        </p>
      )}
      {statusMessage && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}><Alert message={statusMessage} /></motion.div>)}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="flex-1 h-12 rounded-full bg-white/95 px-5 text-sm outline-none"
        />
        <motion.input whileTap={{ scale: 0.97 }}
          type="submit"
          value="Send"
          className="h-12 px-6 rounded-full bg-gradient-to-r from-[#a445b2] to-[#fa4299] text-white font-semibold tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
        />
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
}
