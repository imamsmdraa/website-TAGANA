'use client';

import {EventCard} from "./Evencard";

export  function EventList() {
  const eventDummy = [
    {
      id: 1,
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      id: 2,
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      id: 3,
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      id: 4,
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
  ];

  const handleEventClick = (eventId: number) => {
    console.log("Event clicked:", eventId);
    // Tambahkan navigasi ke detail page jika diperlukan
    // router.push(`/Eventlist/${eventId}`);
  };

  return (
    <div className="flex flex-col gap-3 mt-4 mb-6 max-w-7xl mx-auto">
      {eventDummy.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => handleEventClick(event.id)}
        />
      ))}
    </div>
  );
}
