import Link from "next/link";
import { Mail } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  XIcon,
  DiscordIcon,
} from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: TikTokIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YouTubeIcon },
  { label: "Twitter/X", href: siteConfig.social.twitter, icon: XIcon },
  { label: "Discord", href: siteConfig.social.discord, icon: DiscordIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="drip" />
          <p className="mt-4 max-w-sm text-sm text-text-secondary">
            Toronto&apos;s premier independent entertainment brand spanning talent
            management, media production, and event production.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-text-secondary transition-all hover:border-drip-500 hover:text-drip-500"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="section-label">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-drip-500" />
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>{siteConfig.handle}</li>
            <li>
              <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                discord.gg/JZ4JNKJN3
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center gap-2 text-center text-xs text-text-secondary sm:flex-row sm:justify-between">
          <p>© {year} The Drip Room. All rights reserved.</p>
          <p>Powered by {siteConfig.parentCompany}</p>
        </Container>
      </div>
    </footer>
  );
}
