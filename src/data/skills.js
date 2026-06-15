import {
  Server,
  Network,
  ShieldCheck,
  Cloud,
  Database,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";

// Structural skill data — icons + items (technology names stay in their original
// form in both languages). Group titles are translated (see translations.js,
// skills.groupTitles, matched by index).
export const skillGroups = [
  {
    icon: Server,
    items: [
      "Windows Server",
      "Linux Administration",
      "Active Directory",
      "Group Policy",
      "Microsoft 365",
      "Exchange / Email Administration",
      "Identity & Access Management",
      "User Provisioning",
      "Patch Management",
    ],
  },
  {
    icon: Cloud,
    items: [
      "VMware",
      "Hyper-V",
      "Virtualization",
      "Cloud Services",
      "Cloud Administration",
      "Microsoft 365 Administration",
    ],
  },
  {
    icon: Network,
    items: [
      "LAN / WAN",
      "Routing & Switching",
      "Cisco",
      "MikroTik",
      "VLANs",
      "DNS / DHCP",
      "VPN",
      "Wireless & Access Points",
      "Structured Cabling",
      "Network Monitoring (Wireshark)",
    ],
  },
  {
    icon: ShieldCheck,
    items: [
      "Cybersecurity",
      "Firewall Configuration",
      "Endpoint Protection",
      "Threat Monitoring",
      "Incident Response",
      "Security Hardening",
      "Security Policies",
      "Backup Solutions",
      "Disaster Recovery",
    ],
  },
  {
    icon: Database,
    items: ["SQL Server", "Database Administration", "Backup & Restore"],
  },
  {
    icon: MonitorSmartphone,
    items: [
      "IT Infrastructure Management",
      "Help Desk / ITSM",
      "Ticketing & Incident Tracking",
      "Technical Support",
      "Remote Support (AnyDesk / TeamViewer)",
      "Hardware Maintenance",
      "CCTV / Surveillance",
      "System Monitoring",
      "IT Documentation",
    ],
  },
  {
    icon: Wrench,
    items: [
      "Cisco Packet Tracer",
      "MikroTik Winbox",
      "Wireshark",
      "AnyDesk",
      "TeamViewer",
      "VS Code",
      "SQL Server Management",
      "Al-Ameen Software",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "CapCut",
    ],
  },
];

// Flat marquee list for the hero "technologies" strip (kept in English).
export const techMarquee = [
  "Windows Server",
  "Linux",
  "Active Directory",
  "Group Policy",
  "Microsoft 365",
  "VMware",
  "Hyper-V",
  "Firewalls",
  "Cisco",
  "MikroTik",
  "SQL Server",
  "Endpoint Protection",
  "Backup & DR",
  "Cloud",
  "Cybersecurity",
];
