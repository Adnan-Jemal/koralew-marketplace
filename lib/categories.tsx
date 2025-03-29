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
  displayName: string;
  icon: React.ReactElement<LucideIcon>;
};
export const categories: categoryType[] = [
  {
    name: "Electronics",
    displayName: "Electronics",
    icon: <MonitorSmartphone />,
  },
  {
    name: "Fashion",
    displayName: "Fashion Finds",
    icon: <Shirt />,
  },
  {
    name: "Home",
    displayName: "Home Goods",
    icon: <HomeIcon />,
  },
  {
    name: "Automotive",
    displayName: "Auto Parts",
    icon: <CarFront />,
  },
  {
    name: "Health",
    displayName: "Wellness",
    icon: <HeartPulse />,
  },
  {
    name: "Beauty",
    displayName: "Beauty Essentials",
    icon: <Sparkles />,
  },
  {
    name: "Real Estate",
    displayName: "Real Estate",
    icon: <Building />,
  },
  {
    name: "Art",
    displayName: "Local Art",
    icon: <Palette />,
  },
  {
    name: "Sports",
    displayName: "Sports Gear",
    icon: <Dumbbell />,
  },
  {
    name: "Kids",
    displayName: "Kids' Items",
    icon: <Baby />,
  },
  {
    name: "Entertainment",
    displayName: "Entertainment",
    icon: <Film />,
  },
  {
    name: "Hobbies",
    displayName: "Hobby Supplies",
    icon: <Gamepad />,
  },
  {
    name: "Pets",
    displayName: "Pet Supplies",
    icon: <PawPrint />,
  },
  {
    name: "Industrial",
    displayName: "Industrial Tools",
    icon: <Factory />,
  },
  {
    name: "Services",
    displayName: "Local Services",
    icon: <Briefcase />,
  },
  {
    name: "Others",
    displayName: "Much More",
    icon: <MoreHorizontal />,
  },
];
export const categoryNames = categories.map((c) => c.name);
// export const categoryLinks = categories.map((c) => c.link);
export const categoryDisplayNames = categories.map((c) => c.displayName);
