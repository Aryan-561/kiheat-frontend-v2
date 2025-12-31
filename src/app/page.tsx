"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Send } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="bg-background w-full relative" ref={ref}>
      <nav className="absolute top-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
        <div className="text-xl font-bold tracking-tighter opacity animate-in fade-in duration-1000 z-50">
          KIHEAT.
        </div>
      </nav>

      <section className="w-full h-screen relative overflow-hidden flex items-center justify-center">

        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          {mounted && (
            <Image
              src="/images/hero-kiheat.jpeg"
              alt="University Campus Architecture"
              fill
              priority
              quality={100}
              className="object-cover object-center"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/50" />
        </motion.div>

        {/* --- Content Layer --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-8 mt-10"
        >
       

          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-foreground drop-shadow-sm"
          >
            Insights that drive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              Academic Excellence.
            </span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl font-light leading-relaxed"
          >
            The unified intelligence system for institutional performance.
            Transform raw data into clear, actionable academic rankings.
          </motion.p>

          <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4 items-center">
            <Button variant={"outline"} effect="slide" className="rounded-full">
              Check Results
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 z-20"
        >
          <span className="text-xs uppercase tracking-widest text-primary">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

      </section>

      <section className="w-full h-screen flex items-center justify-center bg-background border-t border-border/10">
        <h2 className="text-2xl font-semibold opacity-50">
          Next Section Content
        </h2>
      </section>
    </div>
  );
}