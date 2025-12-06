"use client"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import Toggle from "@/components/toggle-theme";
import { useProgrammes } from "@/hooks/use-programmes";
export default function HomePage() {
  const {data, isLoading, isError} =  useProgrammes()
  return <div className="bg-background w-full h-screen">
  <Toggle />

  <div className='bg-yellow-300/15'>

     <DotLottieReact
      src="/animation/loading circle.json"
      loop
      autoplay
      />
      </div>
  </div>
}