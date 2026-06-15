import { useLang } from "@/i18n/language-context";

// All human-readable text for the site, in English and Arabic. Structural data
// (icons, images, links, numbers, periods, tags) lives in src/data/* and is
// merged with these strings by index in each component.
export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      name: "Mohammad Jumran",
      greeting: "Hi, I'm",
      iam: "I'm a",
      roles: [
        "System Administrator",
        "IT Specialist",
        "Data Security Specialist",
      ],
      summary:
        "IT Engineer with 9 years of experience administering, securing, and supporting enterprise systems — Windows Server, Active Directory, virtualization, networking, and cybersecurity — keeping the infrastructure people depend on running without interruption.",
      available: "Available for work",
      yearsExperience: "Years Experience",
      getInTouch: "Get in touch",
      downloadCV: "Download CV",
      connect: "Connect",
      techTitle: "Technologies I work with",
      statusOperational: "status: operational",
      yearsSecuring: "Years securing IT",
      locationCity: "Damascus",
      locationSub: "Syria · Remote-ready",
    },
    about: {
      eyebrow: "About Me",
      title: "Keeping systems running,",
      accent: "quietly and reliably.",
      paragraphs: [
        "IT Engineer with 9 years of experience administering, securing, and supporting enterprise infrastructure — internal networks, servers, and the systems people depend on every day.",
        "My focus is system stability, cybersecurity, and fast technical support — working across Windows Server, Active Directory, virtualization, MikroTik and Cisco networking, firewalls, and business platforms like Al-Ameen.",
        "I combine engineering reliability with practical problem-solving: networks that don't drop, servers that don't fail, and recoverable backups that protect what matters.",
      ],
      quote:
        "My mission is to keep the systems people rely on running smoothly — networks that don't drop, servers that don't fail, and support that arrives before the problem grows.",
      highlights: [
        {
          title: "Systems Administration",
          description:
            "Windows Server, Active Directory, Group Policy, and Microsoft 365 — provisioning, hardening, and keeping operations running uninterrupted.",
        },
        {
          title: "Network Engineering",
          description:
            "LAN/WAN design, switching, routing, and structured cabling with documented, segmented, and monitored topologies.",
        },
        {
          title: "Data Security",
          description:
            "Firewalls, endpoint protection, backups, and security policies — monitoring threats and protecting business-critical data.",
        },
        {
          title: "Technical Support",
          description:
            "Fast, reliable support across hardware and software — resolving issues before they grow and keeping teams productive.",
        },
        {
          title: "Surveillance Systems (CCTV)",
          description:
            "Installing, configuring, and maintaining CCTV cameras and NVR recording systems — with troubleshooting and uptime monitoring to keep every site secure.",
        },
      ],
    },
    skills: {
      eyebrow: "Technical Skills",
      title: "A full-stack of",
      accent: "infrastructure expertise.",
      description:
        "From servers and virtualization to networking and security — the technologies I use to build and protect enterprise environments.",
      groupTitles: [
        "Systems Administration",
        "Virtualization & Cloud",
        "Networking",
        "Security & Data Protection",
        "Databases",
        "IT Operations & Support",
        "Tools & Software",
      ],
    },
    experience: {
      eyebrow: "Career Journey",
      title: "Experience that",
      accent: "speaks volumes.",
      description:
        "Nine years across system administration, network engineering, and technical operations — building, securing, and supporting business infrastructure.",
      current: "Current",
      items: [
        {
          role: "System Administrator",
          location: "Damascus, Syria",
          description:
            "Manage LAN/WAN networks and configure switches, routers, access points, and structured cabling; maintain CCTV systems, servers, backups, firewalls, and security policies; monitor cybersecurity threats; administer the Al-Ameen accounting/HR system; integrate fingerprint attendance; manage email and cloud services; document network architecture and apply regular security updates.",
        },
        {
          role: "IT Specialist",
          location: "Damascus, Syria",
          description:
            "Provided hardware and software maintenance and troubleshooting; managed user accounts and access permissions; installed and maintained computers, printers, routers, fingerprint devices, and CCTV systems; prepared equipment status reports.",
        },
        {
          role: "Technical Manager",
          location: "Damascus, Syria",
          description:
            "Diagnosed software, hardware, and server issues with hosting providers and proposed solutions; monitored the hosted application database; built weekly and monthly operational plans across departments; supervised call-center staff and evaluated department performance.",
        },
        {
          role: "IT HelpDesk",
          location: "Damascus, Syria",
          description:
            "Provided first-line IT support for staff — logging, prioritizing, and resolving tickets for hardware, software, account, and network issues; set up workstations, user accounts, and access; guided users through fixes remotely and on-site; and escalated complex incidents to the right team while tracking them to resolution.",
        },
        {
          role: "Technical Support",
          location: "Damascus, Syria",
          description:
            "Delivered technical support for ISP customers, diagnosing service issues and providing solutions and guidance; collaborated with cross-functional teams to enhance support processes; trained new team members on support protocols and best practices.",
        },
        {
          role: "Technical Support",
          location: "Damascus, Syria",
          description:
            "Provided technical assistance to customers and resolved issues efficiently; managed network configurations and optimized performance for better connectivity; collaborated with engineering teams and analyzed customer feedback to improve service delivery.",
        },
      ],
    },
    projects: {
      eyebrow: "Featured Work",
      title: "Infrastructure &",
      accent: "security in action.",
      description:
        "Selected engagements across network architecture, security hardening, disaster recovery, and system integration.",
      viewAll: "View All Projects",
      items: [
        {
          category: "Network Architecture",
          title: "MikroTik Network Config",
          description:
            "Reusable MikroTik RouterOS scripts for bringing up a small-office network — base router setup, VLAN segmentation (staff / servers / guest), DHCP, and a stateful firewall with NAT.",
        },
        {
          category: "Network Monitoring",
          title: "Network Uptime Monitor",
          description:
            "A lightweight, dependency-free Python tool that pings routers, switches, servers, and access points on a schedule, logs every up/down change, and prints a live color-coded status table.",
        },
        {
          category: "Surveillance Systems",
          title: "CCTV Camera Monitor",
          description:
            "Python tool that watches IP cameras and the NVR for availability — ICMP ping plus an RTSP port-554 stream check — logging downtime so a dropped camera is caught before the footage is needed.",
        },
        {
          category: "Surveillance Systems",
          title: "CCTV Storage Planner",
          description:
            "A Python CLI that sizes NVR storage for a CCTV deployment from camera count, bitrate, recording hours, and retention period — including a RAID/headroom suggestion to plan disks before install.",
        },
      ],
    },
    stats: {
      labels: [
        "Years of Experience",
        "Systems Managed",
        "Projects Completed",
        "Users Supported",
      ],
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Let's build",
      accent: "something secure.",
      description:
        "Have infrastructure to deploy, a network to design, or systems to protect? Send a message and let's discuss how I can help.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Your name...",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell me about your project or role...",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "Failed to send message. Please try again later.",
      infoTitle: "Contact Information",
      info: { email: "Email", phone: "Phone", location: "Location" },
      locationValue: "Almidan, Damascus, Syria",
      available: "Currently Available",
      availableBody:
        "Open to new opportunities and projects — full-time roles, freelance infrastructure work, or security consulting. Let's talk.",
      resume: "Resume",
    },
    footer: {
      rights: "All rights reserved.",
      roles: "System Administrator · IT Specialist · Data Security Specialist",
    },
    allProjects: {
      eyebrow: "Portfolio",
      title: "All",
      accent: "projects.",
      description:
        "A complete collection of infrastructure, security, and systems work — network architecture, disaster recovery, integrations, and deployments.",
      back: "Back to Home",
    },
    toggle: { switchTo: "Switch to Arabic" },
  },

  ar: {
    nav: {
      about: "نبذة",
      skills: "المهارات",
      experience: "الخبرات",
      projects: "المشاريع",
      contact: "تواصل",
      resume: "السيرة الذاتية",
    },
    hero: {
      name: "محمد جمران",
      greeting: "مرحباً، أنا",
      iam: "أنا",
      roles: ["مسؤول أنظمة", "أخصائي تقنية معلومات", "أخصائي أمن بيانات"],
      summary:
        "مهندس تقنية معلومات بخبرة 9 سنوات في إدارة وتأمين ودعم أنظمة المؤسسات — Windows Server وActive Directory والأنظمة الافتراضية والشبكات والأمن السيبراني — مع الحفاظ على عمل البنية التحتية التي يعتمد عليها الجميع دون انقطاع.",
      available: "متاح للعمل",
      yearsExperience: "سنوات خبرة",
      getInTouch: "تواصل معي",
      downloadCV: "تحميل السيرة الذاتية",
      connect: "تواصل:",
      techTitle: "التقنيات التي أعمل بها",
      statusOperational: "الحالة: تعمل",
      yearsSecuring: "سنوات في تأمين الأنظمة",
      locationCity: "دمشق",
      locationSub: "سوريا · جاهز للعمل عن بُعد",
    },
    about: {
      eyebrow: "نبذة عني",
      title: "أُبقي الأنظمة تعمل،",
      accent: "بهدوء وموثوقية.",
      paragraphs: [
        "مهندس تقنية معلومات بخبرة 9 سنوات في إدارة وتأمين ودعم البنية التحتية للمؤسسات — الشبكات الداخلية والخوادم والأنظمة التي يعتمد عليها الناس يومياً.",
        "أركّز على استقرار الأنظمة والأمن السيبراني والدعم الفني السريع — عبر Windows Server وActive Directory والأنظمة الافتراضية وشبكات MikroTik وCisco والجدران النارية ومنصات الأعمال مثل الأمين.",
        "أجمع بين موثوقية الهندسة وحلّ المشكلات العملي: شبكات لا تنقطع، وخوادم لا تتعطل، ونُسخ احتياطية قابلة للاستعادة تحمي ما يهم.",
      ],
      quote:
        "مهمتي أن تبقى الأنظمة التي يعتمد عليها الناس تعمل بسلاسة — شبكات لا تسقط، وخوادم لا تتعطل، ودعم يصل قبل أن تكبر المشكلة.",
      highlights: [
        {
          title: "إدارة الأنظمة",
          description:
            "Windows Server وActive Directory وGroup Policy وMicrosoft 365 — التهيئة والتحصين والحفاظ على استمرارية العمليات دون انقطاع.",
        },
        {
          title: "هندسة الشبكات",
          description:
            "تصميم شبكات LAN/WAN والتبديل والتوجيه والكابلات المنظَّمة مع توثيق الشبكة وتقسيمها ومراقبتها.",
        },
        {
          title: "أمن البيانات",
          description:
            "الجدران النارية وحماية الأجهزة الطرفية والنسخ الاحتياطي وسياسات الأمن — مراقبة التهديدات وحماية بيانات الأعمال الحسّاسة.",
        },
        {
          title: "الدعم الفني",
          description:
            "دعم سريع وموثوق للأجهزة والبرامج — حلّ المشكلات قبل أن تتفاقم والحفاظ على إنتاجية الفرق.",
        },
        {
          title: "أنظمة المراقبة (CCTV)",
          description:
            "تركيب وتهيئة وصيانة كاميرات المراقبة وأنظمة التسجيل NVR — مع استكشاف الأعطال ومراقبة الجاهزية لتأمين كل موقع.",
        },
      ],
    },
    skills: {
      eyebrow: "المهارات التقنية",
      title: "حزمة متكاملة من",
      accent: "خبرة البنية التحتية.",
      description:
        "من الخوادم والأنظمة الافتراضية إلى الشبكات والأمن — التقنيات التي أستخدمها لبناء بيئات المؤسسات وحمايتها.",
      groupTitles: [
        "إدارة الأنظمة",
        "الأنظمة الافتراضية والسحابة",
        "الشبكات",
        "الأمن وحماية البيانات",
        "قواعد البيانات",
        "عمليات ودعم تقنية المعلومات",
        "الأدوات والبرمجيات",
      ],
    },
    experience: {
      eyebrow: "المسيرة المهنية",
      title: "خبرة",
      accent: "تتحدث عن نفسها.",
      description:
        "تسع سنوات عبر إدارة الأنظمة وهندسة الشبكات والعمليات التقنية — بناء وتأمين ودعم البنية التحتية للأعمال.",
      current: "الحالي",
      items: [
        {
          role: "مسؤول أنظمة",
          location: "دمشق، سوريا",
          description:
            "إدارة شبكات LAN/WAN وتهيئة المبدّلات والموجِّهات ونقاط الوصول والكابلات المنظَّمة؛ صيانة أنظمة المراقبة والخوادم والنسخ الاحتياطي والجدران النارية وسياسات الأمن؛ مراقبة التهديدات السيبرانية؛ إدارة نظام الأمين للمحاسبة والموارد البشرية؛ دمج أجهزة البصمة؛ إدارة البريد والخدمات السحابية؛ توثيق بنية الشبكة وتطبيق تحديثات الأمن بانتظام.",
        },
        {
          role: "أخصائي تقنية معلومات",
          location: "دمشق، سوريا",
          description:
            "صيانة واستكشاف أعطال الأجهزة والبرامج؛ إدارة حسابات المستخدمين والصلاحيات؛ تركيب وصيانة الحواسيب والطابعات والموجِّهات وأجهزة البصمة وأنظمة المراقبة؛ إعداد تقارير حالة الأجهزة.",
        },
        {
          role: "مدير تقني",
          location: "دمشق، سوريا",
          description:
            "تشخيص مشكلات البرامج والأجهزة والخوادم مع مزوّدي الاستضافة واقتراح الحلول؛ مراقبة قاعدة بيانات التطبيق المُستضاف؛ وضع الخطط الأسبوعية والشهرية عبر الأقسام؛ الإشراف على موظفي مركز الاتصال وتقييم أداء القسم.",
        },
        {
          role: "مكتب مساعدة تقنية",
          location: "دمشق، سوريا",
          description:
            "تقديم الدعم الفني للموظفين — تسجيل وترتيب وحلّ التذاكر المتعلقة بالأجهزة والبرامج والحسابات والشبكة؛ تجهيز محطات العمل وحسابات المستخدمين والصلاحيات؛ إرشاد المستخدمين عن بُعد وميدانياً؛ وتصعيد الحالات المعقّدة ومتابعتها حتى الحل.",
        },
        {
          role: "دعم فني",
          location: "دمشق، سوريا",
          description:
            "تقديم الدعم الفني لعملاء مزوّد خدمة الإنترنت وتشخيص المشكلات وتقديم الحلول والإرشاد؛ التعاون مع فرق متعددة لتحسين عمليات الدعم؛ تدريب الأعضاء الجدد على بروتوكولات الدعم وأفضل الممارسات.",
        },
        {
          role: "دعم فني",
          location: "دمشق، سوريا",
          description:
            "تقديم المساعدة الفنية للعملاء وحلّ المشكلات بكفاءة؛ إدارة إعدادات الشبكة وتحسين الأداء لاتصال أفضل؛ التعاون مع فرق الهندسة وتحليل ملاحظات العملاء لتحسين تقديم الخدمة.",
        },
      ],
    },
    projects: {
      eyebrow: "أعمال مختارة",
      title: "البنية التحتية و",
      accent: "الأمن في الميدان.",
      description:
        "مشاريع مختارة عبر هندسة الشبكات وتحصين الأمن والتعافي من الكوارث وتكامل الأنظمة.",
      viewAll: "عرض جميع المشاريع",
      items: [
        {
          category: "معمارية الشبكات",
          title: "إعداد شبكة MikroTik",
          description:
            "سكربتات MikroTik RouterOS قابلة لإعادة الاستخدام لتجهيز شبكة مكتب صغير — الإعداد الأساسي للموجِّه وتقسيم VLAN (الموظفون/الخوادم/الضيوف) وDHCP وجدار ناري متتبّع للحالة مع NAT.",
        },
        {
          category: "مراقبة الشبكة",
          title: "مراقب جاهزية الشبكة",
          description:
            "أداة Python خفيفة وبدون تبعيات تفحص الموجِّهات والمبدّلات والخوادم ونقاط الوصول دورياً، وتسجّل كل تغيّر في الحالة، وتعرض جدول حالة مباشراً بالألوان.",
        },
        {
          category: "أنظمة المراقبة",
          title: "مراقب كاميرات CCTV",
          description:
            "أداة Python تراقب جاهزية كاميرات IP وجهاز NVR — فحص ping وفحص منفذ RTSP رقم 554 — وتسجّل الانقطاعات لاكتشاف أي كاميرا متوقفة قبل الحاجة إلى التسجيلات.",
        },
        {
          category: "أنظمة المراقبة",
          title: "مخطِّط تخزين CCTV",
          description:
            "أداة سطر أوامر بلغة Python لحساب سعة تخزين NVR لمشروع مراقبة بناءً على عدد الكاميرات ومعدّل البت وساعات التسجيل ومدة الاحتفاظ — مع اقتراح هامش لنظام RAID قبل التركيب.",
        },
      ],
    },
    stats: {
      labels: ["سنوات الخبرة", "أنظمة تُدار", "مشاريع مُنجزة", "مستخدمون مدعومون"],
    },
    contact: {
      eyebrow: "تواصل معي",
      title: "لنبنِ",
      accent: "شيئاً آمناً.",
      description:
        "لديك بنية تحتية لنشرها، أو شبكة لتصميمها، أو أنظمة لحمايتها؟ أرسل رسالة ولنتحدّث كيف يمكنني المساعدة.",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      messageLabel: "الرسالة",
      namePlaceholder: "اسمك...",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "أخبرني عن مشروعك أو الوظيفة...",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      success: "تم إرسال رسالتك بنجاح! سأعود إليك قريباً.",
      error: "تعذّر إرسال الرسالة. حاول مرة أخرى لاحقاً.",
      infoTitle: "معلومات التواصل",
      info: { email: "البريد الإلكتروني", phone: "الهاتف", location: "الموقع" },
      locationValue: "الميدان، دمشق، سوريا",
      available: "متاح حالياً",
      availableBody:
        "منفتح على الفرص والمشاريع الجديدة — وظائف بدوام كامل، أو أعمال بنية تحتية مستقلة، أو استشارات أمنية. لنتحدّث.",
      resume: "السيرة الذاتية",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      roles: "مسؤول أنظمة · أخصائي تقنية معلومات · أخصائي أمن بيانات",
    },
    allProjects: {
      eyebrow: "المشاريع",
      title: "جميع",
      accent: "المشاريع.",
      description:
        "مجموعة كاملة من أعمال البنية التحتية والأمن والأنظمة — معمارية الشبكات والتعافي من الكوارث والتكاملات وعمليات النشر.",
      back: "العودة إلى الرئيسية",
    },
    toggle: { switchTo: "التبديل إلى الإنجليزية" },
  },
};

// Convenience hook: returns the translation tree for the active language.
export const useT = () => {
  const { lang } = useLang();
  return translations[lang];
};
