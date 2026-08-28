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
  const visibleProjects = projects.slice(0, 6);
  const handleCardClick = (projectName: string) => {
    dispatch(setLastVisitedProject(projectName));
    window.location.href = `/project/${projectName}`;
  };
  return (
    <div className="mt-16 bg-panel rounded-2xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h4 className="text-2xl font-bold">My Projects</h4>
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
