import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useAppDispatch } from "../store/hooks";
import { setLastVisitedProject } from "../store/navigationSlice";
import { useProjects } from "../hooks/useProjects";
import Card from "../components/Card";
import { motion } from "framer-motion";

function Grid() {
  const projects = useProjects();
  const dispatch = useAppDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const availableLanguages = Array.from(
    new Set(projects.map((p) => p.language).filter(Boolean))
  );

  const visibleProjects = projects
    .filter((p) => selectedLanguage === "all" || p.language === selectedLanguage)
    .filter((p) => p.name.toLowerCase().includes(searchKeyword.toLowerCase()));

  const handleCardClick = (projectName: string) => {
    dispatch(setLastVisitedProject(projectName));
    window.location.href = `/project/${projectName}`;
  };

  return (
    <div className="mt-16 bg-panel rounded-2xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h4 className="text-2xl font-bold">
          <em className="text-accentDark not-italic">My</em> Projects
        </h4>
        <div className="flex items-center gap-3">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-surface text-gray-300 border-0 rounded-lg h-10 px-3"
          >
            <option value="all">All languages</option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search projects"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="bg-surface text-gray-300 rounded-full h-10 px-4 text-sm outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
            key={project.name}
            onClick={() => handleCardClick(project.name)}
            className="cursor-pointer"
          >
            <Card
              name={project.name}
              description={project.description}
              language={project.language}
              stars={project.stars}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
}
