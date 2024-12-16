import {
    HomeIcon,
    MoreHorizontal,
    Music4,
    Briefcase,
    Drill,
    HeartPulse,
    LucideBookOpenText,
    CarFront,
    Dumbbell,
    Baby,
    Shirt,
    MonitorSmartphone,
    LucideIcon,
  } from "lucide-react";

export type categoryType = {
    name:string,
    link:string,
    icon:React.ReactElement<LucideIcon>
  }
  export const categories :categoryType[] = [
   
    {
      name: "Electronics",
      link: "electronics",
      icon: <MonitorSmartphone />,
    },
    {
      name: "Fashion",
      link: "fashion",
      icon: <Shirt/>,
    },
    {
      name: "Vehicles",
      link: "vehicles",
      icon: <CarFront />,
    },
    {
      name: "Sports",
      link: "sports",
      icon: <Dumbbell />,
    },
    {
      name: "Baby",
      link: "baby",
      icon: <Baby />,
    },
    {
      name: "Home",
      link: "home",
      icon: <HomeIcon />,
    },
    {
      name: "Books",
      link: "books",
      icon: <LucideBookOpenText />,
    },
    {
      name: "Health",
      link: "health",
      icon: <HeartPulse />,
    },
    {
      name: "Tools",
      link: "tools",
      icon: <Drill />,
    },
    {
      name: "Office",
      link: "office",
      icon: <Briefcase />,
    },
    {
      name: "Music",
      link: "music",
      icon: <Music4 />,
    },
    {
      name: "Others",
      link: "others",
      icon: <MoreHorizontal />,
    },
  ];