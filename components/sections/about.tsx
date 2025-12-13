"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function AboutSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "about"][0]{
        title,
        penjelasanPusiptek,
        tentangPPRNP,
        pengurus[]{
          nama,
          jabatan,
          foto
        },
        dataInformasi[]{
          judul,
          deskripsi,
          file
        }
      }`;

      const result = await client.fetch(query);
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) return <div className="text-center py-10">Memuat...</div>;

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      {/* JUDUL */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        {data.title}
      </h1>

      {/* ============================
            1. PENJELASAN PUSIPTEK
      ============================ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Penjelasan Pusiptek</h2>
        <PortableText value={data.penjelasanPusiptek} />
      </div>

      {/* ============================
            2. TENTANG PPRNP
      ============================ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Tentang PPRNP</h2>
        <PortableText value={data.tentangPPRNP} />
      </div>

      {/* ============================
            3. PENGURUS PPRNP
      ============================ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pengurus PPRNP</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.pengurus?.map((item: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              {item.foto && (
                <img
                  src={urlFor(item.foto).width(300).height(300).url()}
                  alt={item.nama}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="text-xl font-semibold">{item.nama}</h3>
              <p className="text-sm text-gray-600">{item.jabatan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================
            4. DATA & INFORMASI
      ============================ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Data & Informasi PPRNP</h2>

        <div className="space-y-4">
          {data.dataInformasi?.map((item: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="text-lg font-bold">{item.judul}</h3>
              <p className="text-sm mb-2 text-gray-700">{item.deskripsi}</p>

              {item.file && (
                <a
                  href={item.file.asset.url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Download File
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
