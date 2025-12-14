"use client";

import { useState, useEffect } from "react";
import AddEvent from "./components/addEvent";
import Agenda from "./components/agenda";
import { eventService, EventDB } from "@/services/eventService";

export default function KalenderPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [allEvents, setAllEvents] = useState<EventDB[]>([]);

  const fetchMarkerEvents = async () => {
    try {
      const data = await eventService.getAll();
      setAllEvents(data);
    } catch (error) {
      console.error("Gagal load marker events:", error);
    }
  };

  useEffect(() => {
    fetchMarkerEvents();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row gap-8 w-full mb-[100px]">
      <div className="h-full w-full">
        <AddEvent onSuccess={handleRefresh} />
      </div>

      <div className="h-full w-full">
        <Agenda refreshTrigger={refreshKey} events={allEvents} />
      </div>
    </div>
  );
}