type ScheduleChoice = {
  label: string;
  days: number;
};

export const scheduleChoices: ScheduleChoice[] = [
  { label: "Tous les jours", days: 1 },
  { label: "Toute les semaines", days: 7 },
  { label: "Toute les 2 semaines", days: 14 },
  { label: "Tous les mois", days: 30 },
  { label: "Tous les 3 mois", days: 90 },
  { label: "Tous les 6 mois", days: 180 },
  { label: "Tous les ans", days: 365 },
  { label: "Tous les 2 ans", days: 730 },
  { label: "Tous les 5 ans", days: 1825 },
];
