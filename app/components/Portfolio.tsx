"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  story?: string;
  client?: string;
  scope?: string[];
  images: string[];
};

const staticProjects: Project[] = [
  {
    id: 1,
    title: "S House",
    category: "Private",
    image: "/havia-project-5.jpg",
    location: "Bandung",
    year: "2023",
    client: "S House Owner",
    scope: ["Architecture", "Interior"],
    story:
      "Rumah ini berdiri di lahan 160 m2, punya 4 kamar, 4 kamar mandi, Living Room, Dapur, dan masih ada innercourt di dalam. Kenapa harus ada innercourt? Karena di konfigurasi ruang yang padat. Keberadaan Innercourt ini \u201cmenyelamatkan\u201d sirkulasi udara dan cahaya alami ke seluruh bangunan. Tidak mesti terlalu besar, di rumah ini kami mengalokasikan 3,5 x 4 meter, kira-kira hanya seluas satu kamar. Namun, dengan keberadaan ruang terbuka ini, hasilnya: kamar tidur tamu dan dapur walaupun letaknya di belakang, tetap bisa terang dan dapat udara bersih; ruang keluarga punya view ke taman yang menambah estetika; bahkan kamar mandi utama pun tidak luput dari manfaat pendaran cahaya yang datang dari innercourt ini.",
    images: ["/havia-project-5.jpg", "/havia-project-8.jpg"],
  },
  {
    id: 2,
    title: "Klinik Edelweiss",
    category: "Public",
    image: "/havia-project-4.jpg",
    location: "Bandung",
    year: "2024",
    client: "Edelweiss Healthcare Group",
    scope: ["Architecture", "Interior"],
    story:
      "Klinik Edelweiss, salah satu proyek desain bangunan publik yang pernah Havia selesaikan. Berlokasi di Jl. Turangga, Kota Bandung. Desain klinik ini tampil dengan nuansa modern namun tetap humble, permainan interior custom dan second skin baru memberikan kesan yang benar-benar fresh kendati bangunan ini sebenarnya hanya renovasi parsial dari bangunan lama.",
    images: ["/havia-project-4.jpg", "/havia-project-9.jpg"],
  },
  {
    id: 3,
    title: "Avilla Lembang",
    category: "Private",
    image: "/havia-project-10.jpg",
    location: "Lembang, Bandung",
    year: "2022",
    client: "Bapak Sastra Jayadarma",
    scope: ["Architecture, Structure, Interior, Construction"],
    story:
      "Berlibur ramai-ramai bersama keluarga ke villa bisa jadi opsi yang menarik untuk \u201cescape\u201d sejenak dari hiruk pikuk kota. A-Villa, namanya diambil dari bentuk bangunannya yang menyerupai dua huruf A, menawarkan nuansa yang hangat di tengah sejuknya udara Lembang dengan pengalaman ruang yang menarik. Ruang-ruang dalamnya berada di bawah atap yang sekaligus membentuk dinding bangunan. Serunya, villa ini dapat disewa penuh semua bangunannya atau per-bagian saja, fleksibel.",
    images: ["/havia-project-10.jpg", "/havia-project-11.jpg"],
  },
  {
    id: 4,
    title: "DN House",
    category: "Private",
    image: "/havia-project-2.jpg",
    location: "Tanah Datar, Sumatra Barat",
    year: "2024",
    client: "DN House Owner",
    scope: ["Architecture", "Interior"],
    story:
      "Terinspirasi dari konsep ruang komunal Rumah Gadang, hunian ini bukan sekadar tempat tinggal, tapi tempat di mana hangatnya silaturahmi terjalin. Dalam merencanakan rumahnya, alih-alih mengambil bentuk visual dari rumah tradisional minang, pemilik DN-House ini lebih setuju mengadopsi nilai-nilai yang lebih mendasar: bagaimana layout ruang dibuat dan ditata.",
    images: [
      "/havia-project-2.jpg",
      "/havia-project-12.jpg",
      "/havia-project-13.jpg",
    ],
  },
  {
    id: 5,
    title: "Kampus Baru SMA Cendekia Muda",
    category: "Public",
    image: "/havia-project-1.jpg",
    location: "Bandung",
    year: "2024",
    client: "Cendekia Muda International",
    scope: ["Architecture", "Interior"],
    story:
      "Pada desain sekolah SMA Cendekia Muda ini dapat tergambarkan bagaimana visi sekolah yang ingin membuat proses pembelajaran menjadi lebih luwes dan adaptif. Hal itu tergambar di banyaknya ruang belajar yang tidak terbatas pada kelas-kelas konvensional saja. Di SMA CM ini, siswa tak hanya bisa memanfaatkan kelas, lab, dan perpustakaan untuk belajar seperti pada umumnya, hampir setiap penjuru sekolah sangat memfasilitasi aktivitas belajar yang lebih bebas dan beragam. Terutama dengan area sirkulasi sekolah yang didesain beriringan dengan sitting area lengkap dengan meja-meja dan rak buku yang terintegrasi. Sirkulasi cahaya dan udara juga sangat dimaksimalkan dengan adanya sebuah atrium besar setinggi tiga lantai yang menaungi \u201copen-classroom\u201d tadi.",
    images: [
      "/havia-project-1.jpg",
      "/havia-project-14.jpg",
      "/havia-project-15.jpg",
    ],
  },
  {
    id: 6,
    title: "Darul Hikam Integrated School ",
    category: "Public",
    image: "/havia-project-16.jpg",
    location: "Bandung",
    year: "2023",
    client: "Darul Hikam",
    scope: ["Architecture", "Interior", "Contruction"],
    story:
      "Darul Hikam Intergrated School (DHIS) ini berdiri di atas lahan seluas +-2700m2 yang awalnya adalah sebuah bangunan sekolah lama lain. Bangunan existingnya terdiri dari beberapa massa, antara bangunan satu dan lainnya dibangun di era yang berbeda, dan kelihatannya tanpa masterplan yang pasti. Tentu, ini merupakan tantangan tersendiri bagi kami sebagai perencana untuk mengakomodasi nilai, value, dan harapan dari lembaga pendidikan Darul Hikam, namun dengan realita existing yang ada.",
    images: ["/havia-project-16.jpg", "/havia-project-16.jpg"],
  },
  {
    id: 7,
    title: "DS House",
    category: "Private",
    image: "/havia-project-17.jpg",
    location: "Meulaboh, Aceh",
    year: "2023",
    client: "Bapak Defry",
    scope: ["Architecture, Structure, Interior, Construction"],
    story:
      "Rumah ini berlokasi di Meulaboh, Aceh yang cenderung ber-iklim panas. Untuk menghadapi iklim setempat, kami berusaha menghadirkan rumah yang sejuk dengan memanfaatkan bukaan dengan posisi yang mendukung cross-ventilation: terdapat pasangan bukaan yang bisa dibuka-tutup di dua sisi yang berseberangan.",
    images: ["/havia-project-17.jpg", "/havia-project-18.jpg"],
  },
  {
    id: 8,
    title: "Batang Anai Resort",
    category: "Masterplan",
    image: "/havia-project-6.jpg",
    location: "Padang Pariaman",
    year: "2023",
    client: "RE Capital",
    scope: ["Architecture"],
    story:
      "Tidak hanya pantai dan beachclubnya, bentangan alam kawasan Muara Batang Anai secara keseluruhan sangatlah khas dan sayang untuk dilewatkan. Nuansa pantai nya secara gradual berubah menjadi sungai bakau dan pepohonan. Semua terkoneksi oleh sirkulasi kawasan dengan beragam alternatif moda, mulai dari berjalan kaki, bersepeda, shuttle car, hingga tentu saja perahu. Dalam perjalanan eksplorasi kawasan, pengunjung akan menemui beragam suasana alam, playground di darat dan di air, aviary, dan ruang komunal, yang menjadi persinggahan mereka sebelum sampai di satu area besar di utara kawasan. Area di utara ini berkonsep festival besar yang memberikan kesempatan pengunjung untuk mengeksplor dan menikmati beragam hidangan khas Sumatera Barat, langsung dari para perwakilan setiap kota-kabupaten di provinsi Sumatera Barat.",
    images: ["/havia-project-7.jpg", "/havia-project-6.jpg"],
  },
];

export default function Portfolio({ cmsData }: { cmsData: any }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const portfolioRef = useRef<HTMLElement | null>(null);

  const accent = cmsData?.landingpage_portfolio_accent || "Portfolio";
  const h2 = cmsData?.landingpage_portfolio_h2 || "Selected Works";
  const downloadText = cmsData?.landingpage_portfolio_download_text || "Download Portfolio";

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImage((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImage((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1,
    );
  };

  const itemsPerPage = 6;

  // Use CMS projects if available, otherwise use static
  const projects: Project[] =
    cmsData?.landingpage_portfolio_json && Array.isArray(cmsData.landingpage_portfolio_json) && cmsData.landingpage_portfolio_json.length > 0
      ? cmsData.landingpage_portfolio_json
      : staticProjects;

  const categories = ["All", "Private", "Public", "Masterplan"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedProjects = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const getPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <section id="portfolio" ref={portfolioRef} className="py-24 bg-havia-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2 md:mb-6">
              <div className="h-[1px] w-10 bg-havia-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-havia-gold font-semibold">
                {accent}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
              {h2}
            </h2>
          </div>

          {/* Tombol Download PDF */}
          <a
            href="/havia-portofolio.pdf"
            download
            className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white bg-havia-gold px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
          >
            {downloadText}
          </a>
        </div>

        {/* Filter */}
        <div className="flex gap-6 md:gap-10 mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-xs uppercase tracking-[0.2em] whitespace-nowrap ${
                activeCategory === cat
                  ? "text-havia-gold border-b border-havia-gold"
                  : "text-havia-charcoal/50 hover:text-[var(--havia-gold)] transition"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setActiveImage(0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-500 flex items-end p-6">
                  <div className="opacity-0 group-hover:opacity-100 transition duration-500">
                    <p className="text-xs uppercase tracking-[0.1em] text-havia-gold mb-2 font-medium">
                      {project.location}
                    </p>

                    <p className="text-sm text-white/90 line-clamp-1">
                      {project.story}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mt-4 text-sm text-havia-charcoal font-medium">
                {project.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden flex gap-6 overflow-x-auto snap-x">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="min-w-[80%] snap-center cursor-pointer"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-sm text-havia-charcoal font-medium">
                {project.title}
              </h3>

              <p className="text-xs text-havia-charcoal/60 mt-1">
                {project.location}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Desktop */}
        {totalPages > 1 && (
          <div className="hidden md:flex justify-center items-center gap-6 mt-16">
            {/* LEFT BUTTON */}
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
            >
              <ChevronLeft size={16} />
            </button>

            {/* PAGE NUMBERS */}
            <div className="flex items-center gap-4">
              {getPagination().map((page, i) =>
                page === "..." ? (
                  <span key={i} className="text-havia-charcoal/40">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(page as number);
                      portfolioRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`text-sm ${
                      currentPage === page
                        ? "text-havia-gold"
                        : "text-havia-charcoal/40 hover:text-[var(--havia-gold)]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start md:items-center justify-center p-4 md:p-10 md:mt-0">
            <div className="bg-white max-w-7xl w-full rounded-sm shadow-xl relative">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-white/90 rounded-full shadow hover:scale-105 transition"
              >
                <X size={20} />
              </button>

              {/* CONTENT */}
              <div className="grid md:grid-cols-2">
                {/* LEFT IMAGE */}
                <div className="bg-havia-offwhite p-4 md:p-6 overflow-hidden">
                  <div className="relative h-[260px] md:h-[520px] w-full mb-4 group">
                    <Image
                      src={selectedProject.images[activeImage]}
                      alt=""
                      fill
                      className="object-cover"
                    />

                    {/* PREVIOUS */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* NEXT */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 pt-1 max-w-full">
                    {selectedProject.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-20 h-16 flex-shrink-0 border ${
                          activeImage === i
                            ? "border-havia-gold"
                            : "border-transparent"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="p-5 md:p-12 font-[Helvetica]">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <div className="h-[1px] w-8 bg-havia-gold" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-havia-gold font-semibold">
                      Project
                    </span>
                  </div>

                  <h3 className="text-xl md:text-3xl text-havia-charcoal mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* DESCRIPTION */}
                  {selectedProject.story && (
                    <p className="text-sm text-havia-charcoal/80 leading-relaxed mb-6 text-justify">
                      {selectedProject.story}
                    </p>
                  )}

                  {/* INFO */}
                  <div className="border-t pt-6 grid grid-cols-2 gap-4 md:gap-6 text-sm">
                    {/* LEFT COLUMN */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Location
                        </span>
                        <p>{selectedProject.location}</p>
                      </div>

                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Year
                        </span>
                        <p>{selectedProject.year}</p>
                      </div>

                      {selectedProject.client && (
                        <div>
                          <span className="text-havia-charcoal/60 font-semibold">
                            Client
                          </span>
                          <p>{selectedProject.client}</p>
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-4">
                      {selectedProject.scope && (
                        <div>
                          <span className="text-havia-charcoal/60 font-semibold">
                            Scope of Work
                          </span>
                          <p>{selectedProject.scope.join(", ")}</p>
                        </div>
                      )}

                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Category
                        </span>
                        <p>{selectedProject.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
