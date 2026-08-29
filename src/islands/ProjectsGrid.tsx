import { Provider } from "react-redux";
import { store } from "../store/store";
import { useAppDispatch } from "../store/hooks";
import { setLastVisitedProject } from "../store/navigationSlice";
import { useProjects } from "../hooks/useProjects";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, FILTER_CATEGORIES } from "../util/skillCategories";

function Grid() {
  const projects = useProjects();
  const dispatch = useAppDispatch();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((project) => projectCategories(project.language, project.topics).includes(activeFilter));

  const visibleProjects = filtered.slice(0, 6);

  const handleCardClick = (projectName: string) => {
    dispatch(setLastVisitedProject(projectName));
    window.location.href = `/project/${projectName}`;
  };

  return (
    <div className="mt-16 bg-panel rounded-2xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h4 className="text-2xl font-bold">Projects &amp; Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["All", ...FILTER_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === cat
                  ? "bg-accent text-black"
                  : "bg-surface border border-border text-text-muted hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            key={project.name}
            onClick={() => handleCardClick(project.name)}
            className="cursor-pointer"
          >
            <Card
              name={project.name}
              description={project.description}
              language={project.language}
              stars={project.stars}
              topics={project.topics}
              htmlUrl={project.htmlUrl}
              liveUrl={project.liveUrl}
              imageUrl={project.imageUrl}
            />
          </motion.div>
        ))}
      </div>
      {visibleProjects.length === 0 && (
        <p className="text-text-muted text-sm text-center py-12">No projects tagged in this category yet.</p>
      )}
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
