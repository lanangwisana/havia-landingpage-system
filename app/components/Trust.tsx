"use client";

import Image from "next/image";

type Testimonial = {
  id: number;
  image: string;
  quote: string;
  name: string;
  role: string;
};

export default function Trust() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/havia-project-1.jpg",
      quote:
        "Havia Studio delivered beyond expectation. The design feels timeless and deeply thoughtful.",
      name: "Residential Client",
      role: "Bandung",
    },
    {
      id: 2,
      image: "/havia-project-2.jpg",
      quote:
        "Professional, detail-oriented, and visionary in every aspect of the project execution.",
      name: "Healthcare Project Owner",
      role: "Jakarta",
    },
  ];

  return (
    <section id="trust" className="py-20 bg-havia-offwhite">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              Trust
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
            Trusted By Clients
          </h2>
        </div>

        {/* Logo Clients */}
        {/* <div className="flex flex-wrap items-center gap-16 mb-28 opacity-70">
          <Image src="/havia-client-1.png" alt="Client 1" width={120} height={40} className="grayscale hover:grayscale-0 transition" />
          <Image src="/havia-client-2.png" alt="Client 2" width={120} height={40} className="grayscale hover:grayscale-0 transition" />
          <Image src="/havia-client-3.png" alt="Client 3" width={120} height={40} className="grayscale hover:grayscale-0 transition" />
        </div>  */}

        {/* Testimonials Zig-Zag */}
        <div className="space-y-28">

          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`grid md:grid-cols-2 gap-16 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* Image */}
              <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                <div className="relative h-[420px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`${index % 2 !== 0 ? "md:order-1" : ""}`}>
                <p className="text-lg md:text-xl leading-relaxed text-havia-charcoal italic">
                  “{item.quote}”
                </p>

                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-havia-charcoal">
                    {item.name}
                  </p>
                  <p className="text-sm text-havia-charcoal/60 mt-2">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}