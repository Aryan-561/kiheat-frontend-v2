"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <section className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Lottie Animation */}
        <div className="w-32 h-32">
          <DotLottieReact
            src="/animation/loading circle.json"
            loop
            autoplay
          />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Loading
          </h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we fetch your data...
          </p>
        </div>

        {/* Animated Dots */}
        <motion.div
          className="flex gap-1"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
