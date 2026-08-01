export const STROKE_WIDTHS: Record<string, string> = {
  thin: "1",
  normal: "1.5",
  thick: "2",
};

export interface Tweaks {
  density: string;
  cardEdge: string;
  sidebarFill: string;
  chipStyle: string;
  statusStyle: string;
  tableStyle: string;
  sidebarActionHeight: string;
  sidebarHover: string;
  avatarShape: string;
  searchShape: string;
  searchBorder: string;
  sidebarPadX: string;
  iconSize: string;
  elementBg: string;
  elementIcon: string;
  iconStroke: string;
}

export const defaultTweaks: Tweaks = {
  density: "default",
  cardEdge: "flat",
  sidebarFill: "canvas",
  chipStyle: "bordered",
  statusStyle: "dot",
  tableStyle: "default",
  sidebarActionHeight: "medium",
  sidebarHover: "low",
  avatarShape: "square",
  searchShape: "pill",
  searchBorder: "none",
  sidebarPadX: "medium",
  iconSize: "md",
  elementBg: "default",
  elementIcon: "default",
  iconStroke: "normal",
};

export interface TweakOption {
  label: string;
  val: string;
}

export interface TweakGroup {
  key: keyof Tweaks;
  label: string;
  options: TweakOption[];
}

export const tweakGroups: TweakGroup[] = [
  {
    key: "sidebarActionHeight",
    label: "Action Height",
    options: [
      { label: "Low", val: "low" },
      { label: "Med", val: "medium" },
      { label: "High", val: "high" },
    ],
  },
  {
    key: "sidebarHover",
    label: "Hover BG",
    options: [
      { label: "Low", val: "low" },
      { label: "Med", val: "medium" },
      { label: "High", val: "high" },
    ],
  },
  {
    key: "avatarShape",
    label: "Avatar Shape",
    options: [
      { label: "Circle", val: "circle" },
      { label: "Square", val: "square" },
    ],
  },
  {
    key: "searchShape",
    label: "Search Shape",
    options: [
      { label: "Pill", val: "pill" },
      { label: "Rect", val: "rect" },
    ],
  },
  {
    key: "searchBorder",
    label: "Search Border",
    options: [
      { label: "Hairline", val: "hairline" },
      { label: "None", val: "none" },
    ],
  },
  {
    key: "sidebarPadX",
    label: "Action Pad X",
    options: [
      { label: "Low", val: "low" },
      { label: "Med", val: "medium" },
      { label: "High", val: "high" },
    ],
  },
];
