import { useEffect, useState } from "react";
import { fetchTestimonials, type Testimonial } from "../util/api";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch((error) => console.error("Error:", error));
  }, []);

  return testimonials;
}
