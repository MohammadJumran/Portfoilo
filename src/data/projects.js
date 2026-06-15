import { Network, Activity, Cctv, HardDrive } from "lucide-react";

// Structural project data — icon, image, links, tags. Category/title/description
// are translated in src/i18n/translations.js (projects.items, matched by index).
// The GitHub icon on each card links to its public repository.
export const projects = [
  {
    icon: Network,
    image: "/projects/net-mikrotik.svg",
    tags: ["MikroTik", "RouterOS", "VLANs", "Firewall"],
    link: "https://github.com/MohammadJumran/mikrotik-network-config",
    github: "https://github.com/MohammadJumran/mikrotik-network-config",
  },
  {
    icon: Activity,
    image: "/projects/net-monitor.svg",
    tags: ["Python", "Monitoring", "Networking", "CLI"],
    link: "https://github.com/MohammadJumran/network-uptime-monitor",
    github: "https://github.com/MohammadJumran/network-uptime-monitor",
  },
  {
    icon: Cctv,
    image: "/projects/cctv-monitor.svg",
    tags: ["Python", "CCTV", "RTSP", "NVR"],
    link: "https://github.com/MohammadJumran/cctv-camera-monitor",
    github: "https://github.com/MohammadJumran/cctv-camera-monitor",
  },
  {
    icon: HardDrive,
    image: "/projects/cctv-storage.svg",
    tags: ["Python", "CCTV", "Storage", "Planning"],
    link: "https://github.com/MohammadJumran/cctv-storage-planner",
    github: "https://github.com/MohammadJumran/cctv-storage-planner",
  },
];
