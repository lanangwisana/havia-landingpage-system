import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative pt-28 pb-24 bg-havia-offwhite overflow-hidden"
    >
      {/* Watermark Logo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.2] pointer-events-none">
        <Image
          src="/havia-vector.svg"
          alt="Havia Studio Watermark"
          width={700}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-2xl">

          {/* Accent */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              About Havia
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-[Helvetica] leading-tight text-havia-charcoal mb-8">
            Architecture Rooted in Clarity and Craft.
          </h2>

          {/* Body */}
          <p className="mb-6 text-havia-charcoal/80 leading-relaxed">
            Halo! Kami Havia Studio. Studio Arsitektur yang hadir untuk membantu
            anda mewujudkan desain bangunan terbaik sesuai kebutuhan anda melalui
            kolaborasi dalam pelaksanaannya.
          </p>

          <p className="text-havia-charcoal/80 leading-relaxed">
            Dengan pengalaman hampir 10 tahun di dunia rancang bangun, kami
            semakin yakin untuk bisa membantu lebih banyak visi menjadi nyata.
          </p>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-10 border-t border-havia-charcoal/20 pt-10">
            
            <div>
              <p className="text-4xl font-light text-havia-charcoal">
                120+
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-havia-charcoal/60 mt-2">
                Projects Completed
              </p>
            </div>

            <div>
              <p className="text-4xl font-light text-havia-charcoal">
                12
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-havia-charcoal/60 mt-2">
                Years of Practice
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}