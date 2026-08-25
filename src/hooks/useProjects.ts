import { useEffect, useState } from "react";
import { fetchProjects, type Project } from "../util/api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((error) => console.error("Error:", error));
  }, []);

  return projects;
}
