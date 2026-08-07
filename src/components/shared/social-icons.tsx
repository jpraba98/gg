import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.83-.72-1.35-1.75-1.44-2.9h-2.68v13.02c0 1.31-1.06 2.37-2.37 2.37a2.37 2.37 0 0 1 0-4.74c.24 0 .48.04.7.1v-2.73a5.1 5.1 0 0 0-.7-.05 5.1 5.1 0 1 0 5.1 5.1V9.4a7.5 7.5 0 0 0 4.36 1.4V8.1c-1.1 0-2.15-.36-2.97-1.02z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12s0-3.2-.41-4.72a2.86 2.86 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.59.28a2.86 2.86 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.41 4.72a2.86 2.86 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.59-.28a2.86 2.86 0 0 0 2-2C22 15.2 22 12 22 12z" fillOpacity="0" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7.1l-5.6-6.9L4.3 22H1.2l8.1-9.3L1 2h7.3l5.1 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.3 5.4A18 18 0 0 0 15.9 4l-.3.6c1.7.5 2.7 1.1 3.7 2-1.6-.8-3.2-1.4-5.3-1.4s-3.7.6-5.3 1.4c1-1 2.2-1.6 3.7-2l-.3-.6a18 18 0 0 0-4.4 1.4C.9 9 .3 12.5.5 15.9a18 18 0 0 0 4.9 2.6c.4-.5.7-1.1 1-1.7-.6-.2-1.1-.5-1.6-.8l.4-.3c2.9 1.3 6 1.3 8.9 0l.4.3c-.5.3-1 .6-1.6.8.3.6.6 1.2 1 1.7a18 18 0 0 0 4.9-2.6c.3-4-1-7.4-3.5-10.5zM9 13.8c-.9 0-1.6-.8-1.6-1.8S8.1 10.2 9 10.2s1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
    </svg>
  );
}
