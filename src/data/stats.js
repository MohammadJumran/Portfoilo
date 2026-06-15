import { CalendarClock, ServerCog, FolderCheck, Users } from "lucide-react";

// Structural stat data — value + icon. Labels are translated in
// src/i18n/translations.js (stats.labels, matched by index).
export const stats = [
  { value: 9, suffix: "+", icon: CalendarClock },
  { value: 150, suffix: "+", icon: ServerCog },
  { value: 25, suffix: "+", icon: FolderCheck },
  { value: 400, suffix: "+", icon: Users },
];
