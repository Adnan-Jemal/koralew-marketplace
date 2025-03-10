import {
  HomeIcon,
  MoreHorizontal,
  Briefcase,
  HeartPulse,
  CarFront,
  Dumbbell,
  Baby,
  Shirt,
  MonitorSmartphone,
  LucideIcon,
  PawPrint,
  Film,
  Building,
  Factory,
  Sparkles,
  Palette,
  Gamepad,
} from "lucide-react";

export type categoryType = {
  name: string;
  link: string;
  icon: React.ReactElement<LucideIcon>;
};
export const categories: categoryType[] = [
  {
    name: "Electronics",
    link: "electronics",
    icon: <MonitorSmartphone />,
  },
  {
    name: "Fashion",
    link: "fashion",
    icon: <Shirt />,
  },
  {
    name: "Home",
    link: "home",
    icon: <HomeIcon />,
  },
  {
    name: "Automotive",
    link: "automotive",
    icon: <CarFront />,
  },
  {
    name: "Health",
    link: "health",
    icon: <HeartPulse />,
  },
  {
    name: "Beauty",
    link: "beauty",
    icon: <Sparkles />,
  },
  {
    name: "Real Estate",
    link: "real-estate",
    icon: <Building />,
  },
  {
    name: "Art",
    link: "art",
    icon: <Palette />,
  },
  {
    name: "Sports",
    link: "sports",
    icon: <Dumbbell />,
  },

  {
    name: "Kids",
    link: "kids",
    icon: <Baby />,
  },
  {
    name: "Entertainment",
    link: "entertainment",
    icon: <Film />,
  },
  {
    name: "Hobbies",
    link: "hobbies",
    icon: <Gamepad />,
  },
  {
    name: "Pets",
    link: "pets",
    icon: <PawPrint />,
  },
  {
    name: "Industrial",
    link: "industrial",
    icon: <Factory />,
  },

  {
    name: "Services",
    link: "services",
    icon: <Briefcase />,
  },
  {
    name: "Others",
    link: "others",
    icon: <MoreHorizontal />,
  },
];
export const categoryNames = categories.map((c) => c.name);
export const categoryLinks = categories.map((c) => c.link);