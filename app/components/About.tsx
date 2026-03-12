import Image from "next/image";

export default function About({ cmsData }: { cmsData: any }) {
  const accent = cmsData?.landingpage_about_accent || "About Havia";
  const h2 = cmsData?.landingpage_about_h2 || "Architecture Rooted in Clarity and Craft.";
  const p1 = cmsData?.landingpage_about_p1 || "Halo! Kami Havia Studio. Studio Arsitektur yang hadir untuk membantu anda mewujudkan desain bangunan terbaik sesuai kebutuhan anda melalui kolaborasi dalam pelaksanaannya.";
  const p2 = cmsData?.landingpage_about_p2 || "Dengan pengalaman hampir 10 tahun di dunia rancang bangun, kami semakin yakin untuk bisa membantu lebih banyak visi menjadi nyata.";
  const stat1Val = cmsData?.landingpage_about_stat1_val || "120+";
  const stat1Label = cmsData?.landingpage_about_stat1_label || "Projects Completed";
  const stat2Val = cmsData?.landingpage_about_stat2_val || "10";
  const stat2Label = cmsData?.landingpage_about_stat2_label || "Years of Practice";

  return (
    <section
      id="about"
      className="relative pt-24 md:pt-28 pb-20 md:pb-24 bg-havia-offwhite overflow-hidden"
    >
      {/* Watermark Logo */}
      <div className="absolute right-[-120px] md:right-0 top-0 md:top-1/2 md:-translate-y-1/2 opacity-[0.06] md:opacity-[0.2] pointer-events-none">
        <Image
          src="/havia-vector.svg"
          alt="Havia Studio Watermark"
          width={700}
          height={400}
          className="object-contain w-[420px] md:w-[700px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl">
          {/* Accent */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              {accent}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-[Helvetica] leading-tight text-havia-charcoal mb-6 md:mb-8">
            {h2}
          </h2>

          {/* Body */}
          <p className="mb-5 md:mb-6 text-sm md:text-base text-havia-charcoal/80 leading-relaxed">
            {p1}
          </p>

          <p className="text-sm md:text-base text-havia-charcoal/80 leading-relaxed">
            {p2}
          </p>

          {/* Stats */}
          <div className="mt-10 md:mt-14 grid grid-cols-2 gap-8 md:gap-10 border-t border-havia-charcoal/20 pt-8 md:pt-10">
            <div>
              <p className="text-3xl md:text-4xl font-light text-havia-charcoal">
                {stat1Val}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-havia-charcoal/60 mt-2">
                {stat1Label}
              </p>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-light text-havia-charcoal">
                {stat2Val}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-havia-charcoal/60 mt-2">
                {stat2Label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
