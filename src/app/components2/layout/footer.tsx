"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const developers = [
    {
      name: "Naufal Adna",
      role: "mapper & Backend Developer",
      initial: "N",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Sagara",
      role: "Layout Designer",
      initial: "S",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Heri",
      role: "Frontend Developer",
      initial: "H",
      color: "from-blue-500 to-blue-600",
    },
  ];

  
}
