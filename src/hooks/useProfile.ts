import { useEffect, useState } from "react";
import { fetchProfile, type ProfileData } from "../util/api";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch((error) => console.error("Error:", error));
  }, []);

  return profile;
}
