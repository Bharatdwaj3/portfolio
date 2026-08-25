import { useEffect, useState } from "react";
import { fetchSkills, type Skill } from "../util/api";

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .catch((error) => console.error("Error:", error));
  }, []);

  return skills;
}
