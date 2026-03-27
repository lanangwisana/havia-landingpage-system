"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Undo2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    category: "Residential",
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
    category: "Commercial",
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
    category: "Residential",
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
    category: "Residential",
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
      "/havia-project-12.jpg",
      "/havia-project-13.jpg",
      "/havia-project-12.jpg",
      "/havia-project-13.jpg",
    ],
  },
  {
    id: 5,
    title: "Kampus Baru SMA Cendekia Muda",
    category: "Educational",
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
    category: "Educational",
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
    category: "Residential",
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
  const [activeImage, setActiveImage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileModalImageCount, setMobileModalImageCount] = useState(3);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const portfolioRef = useRef<HTMLElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const h2 = cmsData?.landingpage_portfolio_h2 || "Projects";

  const projects: Project[] =
    cmsData?.landingpage_portfolio_json &&
    Array.isArray(cmsData.landingpage_portfolio_json) &&
    cmsData.landingpage_portfolio_json.length > 0
      ? cmsData.landingpage_portfolio_json.slice(0, 9)
      : staticProjects;

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Educational",
    "Interior",
    "Masterplan",
  ];

  useEffect(() => {
    const storedCategory = sessionStorage.getItem("selectedCategory");
    if (storedCategory && categories.includes(storedCategory)) {
      setActiveCategory(storedCategory);
      sessionStorage.removeItem("selectedCategory");
    }

    const handleFilter = (e: CustomEvent) => {
      const { category } = e.detail;
      if (category && categories.includes(category)) {
        setActiveCategory(category);
      } else if (category === null) {
        setActiveCategory("All");
      }
    };

    window.addEventListener("filterProjects" as any, handleFilter);
    return () =>
      window.removeEventListener("filterProjects" as any, handleFilter);
  }, [categories]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayProjects = filtered.slice(0, 9);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    scrollTriggersRef.current.forEach((st) => st.kill());
    scrollTriggersRef.current = [];

    if (!gridContainerRef.current) return;

    const items = gridItemsRef.current.filter((item) => item !== null);
    if (items.length === 0) return;

    const animation = gsap.fromTo(
      items,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    if (animation.scrollTrigger) {
      scrollTriggersRef.current.push(animation.scrollTrigger);
    }

    const headerLine = portfolioRef.current?.querySelector(".header-line");
    if (headerLine) {
      const headerTrigger = ScrollTrigger.create({
        trigger: portfolioRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headerLine,
            { width: 0 },
            { width: "3rem", duration: 0.8, ease: "power2.out" },
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            headerLine,
            { width: 0 },
            { width: "3rem", duration: 0.8, ease: "power2.out" },
          );
        },
      });
      scrollTriggersRef.current.push(headerTrigger);
    }

    return () => {
      scrollTriggersRef.current.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
    };
  }, [activeCategory, displayProjects]);

  useEffect(() => {
    if (!selectedProject) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveImage(index);
          }
        });
      },
      { threshold: 0.7 },
    );
    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      imageRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [selectedProject, isScrolling]);

  const scrollToImage = (index: number) => {
    if (!imageRefs.current[index] || !modalContentRef.current) return;
    setActiveImage(index);
    const container = modalContentRef.current;
    const element = imageRefs.current[index];
    if (element) {
      const elementPosition = element.offsetTop;
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;
      const scrollTo =
        elementPosition - containerHeight / 2 + elementHeight / 2;
      const startPosition = container.scrollTop;
      const distance = scrollTo - startPosition;
      const duration = 600;
      let startTime: number | null = null;
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        container.scrollTop = startPosition + distance * ease(progress);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };
      setIsScrolling(true);
      requestAnimationFrame(animation);
    }
  };

  const setImageRef =
    (index: number) =>
    (el: HTMLDivElement | null): void => {
      imageRefs.current[index] = el;
    };

  useEffect(() => {
    setMobileModalImageCount(3);
  }, [selectedProject]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (selectedProject) {
      setLightboxIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setLightboxIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    setLightboxOpen(false);
  };

  return (
    <section
      ref={portfolioRef}
      id="portfolio"
      className="md:pt-16 pb-16 md:pb-20 font-sans"
      style={{ backgroundColor: "var(--havia-offwhite)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-12 lg:gap-16">
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">
                  {h2}
                </h2>
                <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mb-8" />
              </motion.div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
                    CATEGORY
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                          relative text-sm transition-all duration-300 text-left
                          ${
                            activeCategory === cat
                              ? "text-[var(--havia-charcoal)] font-semibold border-l-2 border-[var(--havia-gold)] pl-3"
                              : "text-gray-400 hover:text-gray-600 pl-4"
                          }
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div
              ref={gridContainerRef}
              className="grid grid-cols-3 gap-8 min-h-[600px] lg:min-h-[700px]"
            >
              {displayProjects.map((project, idx) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    gridItemsRef.current[idx] = el;
                  }}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveImage(0);
                  }}
                  className="group cursor-pointer"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden mb-3"
                    style={{ backgroundColor: "var(--havia-offwhite)" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--havia-charcoal)] tracking-wide mb-1">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-baseline text-xs text-gray-400">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)]">
                {h2}
              </h2>
              <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mt-2" />
            </motion.div>

            <button
              ref={filterButtonRef}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="p-2"
              aria-label="Open filter"
            >
              <SlidersHorizontal
                size={20}
                className="text-[var(--havia-charcoal)]"
              />
            </button>
          </div>

          {showFilterDropdown && (
            <div
              ref={dropdownRef}
              className="w-full mb-6"
              style={{ backgroundColor: "var(--havia-offwhite)" }}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="space-y-2">
                  {categories.slice(0, 3).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                block w-full text-left text-sm transition-colors duration-300
                ${
                  activeCategory === cat
                    ? "text-[var(--havia-charcoal)] font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                }
              `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {categories.slice(3).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                block w-full text-left text-sm transition-colors duration-300
                ${
                  activeCategory === cat
                    ? "text-[var(--havia-charcoal)] font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                }
              `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 min-h-[400px]">
            {displayProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveImage(0);
                }}
                className="group cursor-pointer"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden mb-2"
                  style={{ backgroundColor: "var(--havia-offwhite)" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <h3 className="text-sm font-medium text-[var(--havia-charcoal)] truncate mb-1">
                  {project.title}
                </h3>
                <div className="flex justify-between items-baseline text-xs text-gray-400">
                  <span className="truncate">{project.location}</span>
                  <span className="ml-2 flex-shrink-0">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL and LIGHTBOX*/}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 overflow-hidden font-sans"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="absolute top-0 left-0 right-0 z-[70] hidden lg:block">
            <Header />
          </div>

          <div className="fixed top-20 left-6 z-[70]">
            <div className="max-w-7xl">
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-1 text-[12px] text-[#2c2a29]/20 hover:text-[#c69c3d] transition-colors"
              >
                <Undo2 size={18} />
                Back to home
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[100px_1fr_320px] h-screen pt-20">
            <div
              className="flex flex-col justify-center overflow-y-auto p-4 scrollbar-hide"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="space-y-4">
                {selectedProject.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToImage(i)}
                    className={`relative w-full aspect-[16/9] overflow-hidden transition-all duration-500 ${
                      activeImage === i
                        ? "scale-[0.98]"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{
                      boxShadow:
                        activeImage === i
                          ? `0 0 0 2px ${i === activeImage ? "#c69c3d" : "#9ca3af"}`
                          : "none",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={modalContentRef}
              className="overflow-y-auto scroll-smooth px-10 py-10 space-y-10 scrollbar-hide justify-items-center"
              style={{ scrollBehavior: "smooth", backgroundColor: "#ffffff" }}
            >
              {selectedProject.images.map((img, i) => (
                <div
                  key={i}
                  ref={setImageRef(i)}
                  data-index={i}
                  className="relative w-[100vh] h-[60vh] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div
              className="overflow-y-auto p-8 scrollbar-hide"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-2xl font-medium tracking-tight mb-2"
                    style={{ color: "#2c2a29" }}
                  >
                    {selectedProject.title}
                  </h2>
                  <div
                    className="w-12 h-[2px]"
                    style={{ backgroundColor: "#c69c3d" }}
                  />
                </div>

                <div className="space-y-3 text-sm">
                  <div style={{ color: "#2c2a29" }}>
                    <span className="text-gray-400 w-20 inline-block">
                      Location
                    </span>
                    <span className="font-medium">
                      {selectedProject.location}
                    </span>
                  </div>
                  <div style={{ color: "#2c2a29" }}>
                    <span className="text-gray-400 w-20 inline-block">
                      Year
                    </span>
                    <span className="font-medium">{selectedProject.year}</span>
                  </div>
                  {selectedProject.client && (
                    <div style={{ color: "#2c2a29" }}>
                      <span className="text-gray-400 w-20 inline-block">
                        Client
                      </span>
                      <span className="font-medium">
                        {selectedProject.client}
                      </span>
                    </div>
                  )}
                  <div style={{ color: "#2c2a29" }}>
                    <span className="text-gray-400 w-20 inline-block">
                      Category
                    </span>
                    <span className="font-medium">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {selectedProject.scope && (
                  <div className="space-y-3 text-sm">
                    <span className="text-gray-400 w-20 inline-block">
                      Scope
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.scope.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1.5 font-semibold"
                          style={{
                            backgroundColor: "#f2f1f0",
                            color: "#2c2a29",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.story && (
                  <div className="pt-2 text-justify">
                    <p className="text-sm leading-relaxed text-gray-400">
                      {selectedProject.story}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden h-full overflow-y-auto pb-8">
            <div className="h-20" />

            <div className="px-4">
              <Header />
            </div>

            <div className="space-y-4 p-4 pt-6">
              {selectedProject.images
                .slice(0, mobileModalImageCount)
                .map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[16/9] cursor-pointer"
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={img}
                      alt={`${selectedProject.title} - ${i + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}

              {selectedProject.images.length > 3 && (
                <button
                  onClick={() => {
                    if (mobileModalImageCount === 3) {
                      setMobileModalImageCount(selectedProject.images.length);
                    } else {
                      setMobileModalImageCount(3);
                    }
                  }}
                  className="w-full py-3 text-sm border border-gray-200 rounded-lg flex items-center justify-center gap-2 transition-colors hover:border-[#c69c3d] hover:text-[#c69c3d]"
                  style={{ color: "#2c2a29" }}
                >
                  <span>
                    {mobileModalImageCount === 3
                      ? `Show ${selectedProject.images.length - 3} more pictures`
                      : "Show less pictures"}
                  </span>
                  {mobileModalImageCount === 3 ? (
                    <ChevronDown
                      size={16}
                      className="transition-transform group-hover:translate-y-0.5"
                    />
                  ) : (
                    <ChevronUp
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5"
                    />
                  )}
                </button>
              )}
            </div>

            {/* Project details */}
            <div className="px-4 mt-6">
              <div className="space-y-6">
                <div>
                  <h2
                    className="text-xl font-light tracking-tight mb-2"
                    style={{ color: "#2c2a29" }}
                  >
                    {selectedProject.title}
                  </h2>
                  <div
                    className="w-12 h-[2px]"
                    style={{ backgroundColor: "#c69c3d" }}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500 w-20 inline-block">
                      Location
                    </span>
                    <span style={{ color: "#2c2a29" }}>
                      {selectedProject.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500 w-20 inline-block">
                      Year
                    </span>
                    <span style={{ color: "#2c2a29" }}>
                      {selectedProject.year}
                    </span>
                  </div>
                  {selectedProject.client && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500 w-20 inline-block">
                        Client
                      </span>
                      <span style={{ color: "#2c2a29" }}>
                        {selectedProject.client}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500 w-20 inline-block">
                      Category
                    </span>
                    <span style={{ color: "#2c2a29" }}>
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {selectedProject.scope && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500 w-20 inline-block">
                      Scope
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.scope.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1.5"
                          style={{
                            backgroundColor: "#f2f1f0",
                            color: "#2c2a29",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.story && (
                  <div className="text-justify">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#2c2a29" }}
                    >
                      {selectedProject.story}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxOpen && selectedProject && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4">
            <div className="relative w-full h-full">
              <Image
                src={selectedProject.images[lightboxIndex]}
                alt={`${selectedProject.title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 text-white text-sm rounded-full">
              {lightboxIndex + 1} / {selectedProject.images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
