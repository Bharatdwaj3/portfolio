import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useAppSelector } from "../store/hooks";
import Alert from "../components/Alert";
import { sendMessage } from "../util/api";
import { motion } from "framer-motion";

function Form() {
  const lastVisitedProject = useAppSelector((state) => state.navigation.lastVisitedProject);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await sendMessage({ senderName, senderEmail, subject, message });
      if (response.ok) {
        setStatusMessage("Message sent, thank you! I'll get back to you soon.");
        setSenderName("");
        setSenderEmail("");
        setSubject("");
        setMessage("");
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
      <header className="text-white text-3xl font-semibold mb-8">Get In Touch</header>
      {lastVisitedProject && (
        <p className="text-accent text-sm mb-4">
          Have a question about {lastVisitedProject}? Mention it below.
        </p>
      )}
      {statusMessage && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}><Alert message={statusMessage} /></motion.div>)}
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        <div>
          <h4 className="text-white text-sm mb-1">Name</h4>
          <input
            type="text"
            required
            placeholder="Your Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full h-11 rounded-2xl bg-white/95 px-4 text-sm outline-none"
          />
        </div>
        <div>
          <h4 className="text-white text-sm mb-1">Email</h4>
          <input
            type="email"
            required
            placeholder="Your Email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="w-full h-11 rounded-2xl bg-white/95 px-4 text-sm outline-none"
          />
        </div>
        <div>
          <h4 className="text-white text-sm mb-1">Subject</h4>
          <input
            type="text"
            placeholder="Subject (optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-11 rounded-2xl bg-white/95 px-4 text-sm outline-none"
          />
        </div>
        <div>
          <h4 className="text-white text-sm mb-1">Message</h4>
          <input
            type="text"
            required
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-11 rounded-2xl bg-white/95 px-4 text-sm outline-none"
          />
        </div>
        <motion.input whileTap={{ scale: 0.97 }}
          type="submit"
          value="SEND MESSAGE"
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#a445b2] to-[#fa4299] text-white font-semibold tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
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
