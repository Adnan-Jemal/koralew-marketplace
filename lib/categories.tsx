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
  displayName:string;
  icon: React.ReactElement<LucideIcon>;
};
export const categories: categoryType[] = [
  {
    name: "Electronics",
    displayName: "Electronics",
    link: "electronics",
    icon: <MonitorSmartphone />,
  },
  {
    name: "Fashion",
    displayName: "Fashion Finds",
    link: "fashion",
    icon: <Shirt />,
  },
  {
    name: "Home",
    displayName: "Home Goods",
    link: "home",
    icon: <HomeIcon />,
  },
  {
    name: "Automotive",
    displayName: "Auto Parts",
    link: "automotive",
    icon: <CarFront />,
  },
  {
    name: "Health",
    displayName: "Wellness",
    link: "health",
    icon: <HeartPulse />,
  },
  {
    name: "Beauty",
    displayName: "Beauty Essentials",
    link: "beauty",
    icon: <Sparkles />,
  },
  {
    name: "Real Estate",
    displayName: "Real Estate",
    link: "real-estate",
    icon: <Building />,
  },
  {
    name: "Art",
    displayName: "Local Art",
    link: "art",
    icon: <Palette />,
  },
  {
    name: "Sports",
    displayName: "Sports Gear",
    link: "sports",
    icon: <Dumbbell />,
  },
  {
    name: "Kids",
    displayName: "Kids' Items",
    link: "kids",
    icon: <Baby />,
  },
  {
    name: "Entertainment",
    displayName: "Entertainment",
    link: "entertainment",
    icon: <Film />,
  },
  {
    name: "Hobbies",
    displayName: "Hobby Supplies",
    link: "hobbies",
    icon: <Gamepad />,
  },
  {
    name: "Pets",
    displayName: "Pet Supplies",
    link: "pets",
    icon: <PawPrint />,
  },
  {
    name: "Industrial",
    displayName: "Industrial Tools",
    link: "industrial",
    icon: <Factory />,
  },
  {
    name: "Services",
    displayName: "Local Services",
    link: "services",
    icon: <Briefcase />,
  },
  {
    name: "Others",
    displayName: "Much More",
    link: "others",
    icon: <MoreHorizontal />,
  },
];
export const categoryNames = categories.map((c) => c.name);
export const categoryLinks = categories.map((c) => c.link);
export const categoryDisplayNames= categories.map((c)=>c.displayName)