import Image from "next/image";
// import  { useRouter } from "next/navigation";

type Status = "published" | "draft";

const statusBadge = (status: Status) => {
  if (status === "published") {
    return "bg-green-100 text-green-700";
  }
  return "bg-gray-200 text-gray-700";
};

export default function BeritaList() {
  //   const router = useRouter()
  const beritaDummy: {
    id: number;
    image: string;
    judul: string;
    tanggal: string;
    status: Status;
  }[] = [
    {
      id: 1,
      image: "/ketos.png",
      judul: "Perbaikan Jalan Dusun A Telah Selesai",
      tanggal: "12 Mar 2025",
      status: "published",
    },
    {
      id: 2,
      image: "/ketos.png",
      judul: "Perbaikan Jalan Dusun A Telah Selesai",
      tanggal: "12 Mar 2025",
      status: "published",
    },
    {
      id: 3,
      image: "/ketos.png",
      judul: "Perbaikan Jalan Dusun A Telah Selesai",
      tanggal: "12 Mar 2025",
      status: "draft",
    },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-3 rounded-lg">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Berita Terkini</h1>
        <button onClick={() => router.push("/admin/beritaTerkini")} className="text-blue-500 text-sm cursor-pointer hover:underline">
          Lihat Semua
        </button>
      </div> */}

      {beritaDummy.map((berita, index) => (
        <div
          key={index}
          className="flex flex-row gap-3 p-2 shadow-sm bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <Image
            src={berita.image}
            alt="image"
            width={100}
            height={100}
            className="rounded-md object-cover"
          />

          <div className="flex flex-col gap-1 justify-between">
            <h1 className="text-sm font-semibold leading-tight">
              {berita.judul}
            </h1>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{berita.tanggal}</span>

              <span
                className={`px-2 py-0.5 rounded-full font-medium capitalize ${statusBadge(
                  berita.status
                )}`}
              >
                {berita.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
