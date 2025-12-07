"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Send } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <footer className="relative w-full bg-background border-t border-border/40 overflow-hidden pt-20 pb-10">

            {/* Moving Background Text */}
            <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden flex justify-center z-0 opacity-[0.1] dark:opacity-[0.05]">
                <motion.h1
                    className="text-[12rem] md:text-[18rem] font-bold tracking-tighter text-primary whitespace-nowrap"
                    animate={{ x: [0, -100, 0] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    KIHEAT RANKLIST
                </motion.h1>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-10 container mx-auto px-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold tracking-tight">KIHEAT RANKLIST </h2>
                        <p className="text-muted-foreground max-w-sm">
                            Empowering students with precise data. We build the tools that shape the future of academic transparency.
                        </p>

                        <div className="flex gap-2 mt-4 max-w-sm">
                            <Input
                                placeholder="Enter your email"
                                className="bg-background/50 border-input focus-visible:ring-primary"
                            />
                            <Button size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>

                    <div className="hidden md:block md:col-span-1"></div>

                    {/* Links Columns */}
                    <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h3 className="font-semibold">Platform</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <FooterLink href="#">Rankings</FooterLink>
                                <FooterLink href="#">Analytics</FooterLink>
                                <FooterLink href="#">University List</FooterLink>
                                <FooterLink href="#">API Access</FooterLink>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h3 className="font-semibold">Company</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <FooterLink href="#">About</FooterLink>
                                <FooterLink href="#">Careers</FooterLink>
                                <FooterLink href="#">Blog</FooterLink>
                                <FooterLink href="#">Contact</FooterLink>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h3 className="font-semibold">Legal</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <FooterLink href="#">Privacy</FooterLink>
                                <FooterLink href="#">Terms</FooterLink>
                                <FooterLink href="#">Cookie Policy</FooterLink>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} KIHEAT RANKLIST Inc. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <SocialIcon icon={<Github className="w-5 h-5" />} href="#" />
                        <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                        <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" />
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <motion.a
                href={href}
                initial="initial"
                whileHover="hover"
                className="relative block overflow-hidden whitespace-nowrap"
            >
                <motion.div
                    variants={{
                        initial: { y: 0 },
                        hover: { y: "100%" },
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {children}
                </motion.div>

                <motion.div
                    className="absolute inset-0 text-primary"
                    variants={{
                        initial: { y: "-100%" },
                        hover: { y: 0 },         
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {children}
                </motion.div>
            </motion.a>
        </li>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <motion.a
            href={href}
            initial="initial"
            whileHover="hover"
            className="relative block overflow-hidden w-5 h-5 text-muted-foreground"
        >
            {/* 1. Original Icon */}
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "100%" },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {icon}
            </motion.div>

            {/* 2. Color Icon from Top */}
            <motion.div
                className="absolute inset-0 text-primary"
                variants={{
                    initial: { y: "-100%" },
                    hover: { y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {icon}
            </motion.div>
        </motion.a>
    );
}