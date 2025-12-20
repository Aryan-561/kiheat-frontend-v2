"use client"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading({ className = "min-h-screen" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center  bg-background ${className}`}>
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <DotLottieReact
                        src="/animation/loading circle.json"
                        loop
                        autoplay
                        style={{ width: 100, height: 100 }}
                    />
                </div>
            </div>
        </div>
    );
}

export function LoadingSkeleton() {
    return (
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (<Card>
            <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>))
    );
}

export function LoadingBar() {
    return (
        <div className="w-full space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export function LoadingTable() {
    return (
        <div className="w-full border rounded-lg overflow-hidden">

            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 grid grid-cols-6 gap-4 border-b  last:border-b-0">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
            ))}
        </div>
    );
}