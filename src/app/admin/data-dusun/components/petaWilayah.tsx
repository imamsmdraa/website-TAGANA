'use client';

import { useState, useEffect } from "react";
import { Map, ChevronDown, Search } from "lucide-react"; 
import { dusunService } from "@/services/dusunService";

export default function PetaWilayah() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Pilih Lokasi");
  
  const [dusunOptions, setDusunOptions] = useState<{ id: number; nama: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDusun = async () => {
      try {
        const data = await dusunService.getAllNames();
        setDusunOptions(data || []);
      } catch (error) {
        console.error("Gagal load dusun:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDusun();
  }, []);

  const handleTampilkan = () => {
    if (selected === "Pilih Lokasi") {
      alert("Silakan pilih dusun terlebih dahulu");
      return;
    }
    console.log("Navigasi ke data:", selected);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-md font-semibold text-blue-400">
        Pilih Wilayah Dusun
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3">
        {/* DROPDOWN SECTION */}
        <div className="relative flex items-center w-full md:w-2/3"> 
          <Map size={18} className="absolute left-3 text-black z-10" />

          <div
            onClick={() => setOpen(!open)}
            className={`
              w-full bg-white pl-10 pr-3 py-3 shadow-md rounded-xl text-sm cursor-pointer border border-gray-300 
              flex items-center justify-between hover:border-blue-400 transition-colors
              ${open ? "ring-2 ring-blue-100 border-blue-400" : ""}
            `}
          >
            <span className={selected === "Pilih Lokasi" ? "text-gray-500" : "text-gray-800 font-medium"}>
              {selected}
            </span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl p-2 z-20 max-h-60 overflow-y-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-100">
              {loading ? (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">
                  Memuat data...
                </div>
              ) : dusunOptions.length > 0 ? (
                dusunOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelected(opt.nama);
                      setOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {opt.nama}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">
                  Tidak ada data dusun
                </div>
              )}
            </div>
          )}
        </div>

        {/* BUTTON SECTION */}
        <div className="w-full md:w-1/3 flex justify-end">
          <button 
            onClick={handleTampilkan}
            className="flex flex-row gap-2 justify-center items-center w-full md:w-auto bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all duration-300 py-3 px-6 rounded-xl shadow-md text-white font-medium"
          >
            <Search size={18} />
            <span>Tampilkan Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}