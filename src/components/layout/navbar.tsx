"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const isEvents = pathname?.startsWith("/events");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-obsidian/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="The Drip Room home">
          <Logo variant={isEvents ? "gold" : "drip"} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:text-white",
                pathname === item.href && (isEvents ? "text-gold-500" : "text-drip-500"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant={isEvents ? "gold" : "primary"} size="sm">
            <Link href="/services">Book Now</Link>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-obsidian lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium uppercase tracking-wide text-text-secondary transition-colors hover:bg-white/5 hover:text-white",
                    pathname === item.href && "text-drip-500",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-3" variant={isEvents ? "gold" : "primary"}>
                <Link href="/services">Book Now</Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
