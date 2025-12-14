"use client";

import React from "react";

export default function LegendCard() {
  return (
    <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
        <span>Legenda Peta</span>
      </h1>
      <div className="space-y-3 grid grid-cols-3 grid-rows-2 gap-4 ">
        <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <div>
            <p className="font-semibold text-sm text-blue-700">Zona Banjir</p>
            <p className="text-xs text-blue-600">Area rawan banjir</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-yellow-700"></div>
          <div>
            <p className="font-semibold text-sm text-yellow-700">Batas Desa</p>
            <p className="text-xs text-yellow-600">Garis batas wilayah desa</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-400 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-white"></div>
          <div>
            <p className="font-semibold text-sm text-white">Batas RT</p>
            <p className="text-xs text-white">
              Garis batas Rukun Tetangga
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-orange-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-orange-500"></div>
          <div>
            <p className="font-semibold text-sm text-orange-700">Batas Dusun</p>
            <p className="text-xs text-orange-600">Garis batas wilayah dusun</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-slate-600"></div>
          <div>
            <p className="font-semibold text-sm text-slate-700">Jalan</p>
            <p className="text-xs text-slate-600">Jalur jalan utama</p>
          </div>
        </div>
      </div>
    </div>
  );
}
