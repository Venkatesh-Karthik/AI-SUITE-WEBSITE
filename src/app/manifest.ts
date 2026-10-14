import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Suite",
    short_name: "AI Suite",
    description: "JARVIS, FRIDAY, and EDITH — a Windows AI ecosystem.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0E14",
    theme_color: "#0A0E14",
    icons: [
      {
        src: "/logo/app_icon.ico",
        sizes: "256x256 128x128 64x64 48x48 32x32 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
