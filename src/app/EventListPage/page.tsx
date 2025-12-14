"use client";

import MobileCalendar from "./components/calendar";
import { EventCard } from "./components/Evencard";
import { EventList } from "./components/Eventlist";
import {Header} from "./components/Header";
import { useRouter } from "next/navigation";

export default function EventListPage() {
  const router = useRouter();
  const sampleEvent = {
    bulan: "January",
    tanggal: 1,
    judul: "Sample Event",
    deskripsi: "This is a sample event description",
    startTime: "09:00",
    endTime: "17:00",
    lokasi: "Sample Location",
    image: "/dusun.jpg",
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 via-white to-blue-200 ">
       <Header onBack={() => router.push("/peta-page")} />
      <div className="max-w-7xl mx-auto w-full py-6">
        <MobileCalendar />

        <div className="w-full p-8 rounded-xl shadow-2xl bg-white py-2 mt-10 mb-4 ">
          <div className="inline-block px-10 mt-4 py-3 rounded-xl shadow-[-1px_0px_19px_5px_rgba(0,_0,_0,_0.15)]  bg-white">
            <h1 className="text-2xl font-bold">List Event</h1>
          </div>
          <EventList />
        </div>
      </div>
    </div>
  );
}
