// components/PageHeader.js

export default function PageHeader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
        Selamat Datang di Official Website
      </div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
        Pioner Penghuni
        <br />
        <span className="text-green-600">Rumah Negara</span>
        <br />
        Puspiptek
      </h1>
    </div>
  );
}