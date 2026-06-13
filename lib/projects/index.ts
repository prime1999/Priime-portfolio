import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

import { Blocks, MonitorSmartphone } from "lucide-react";
import { AudioLift, SendMail, TimeLy } from "./WebTwo";
import { Cinder, CreloLoan, CreloPay } from "./WebThree";

export type ProjectItem = {
  title: string;
  about: string;
  image: StaticImageData;
  url: string;
};

export type ProjectFolder = {
  id: string;
  label: string;
  icon: LucideIcon;
  items: ProjectItem[];
};

export const projectFolders: ProjectFolder[] = [
  {
    id: "web3",
    label: "Web 3",
    icon: Blocks,
    items: [
      { title: "Crelo Pay", ...CreloPay },
      { title: "Crelo Loan", ...CreloLoan },
      { title: "Cinder", ...Cinder },
    ],
  },
  {
    id: "web2",
    label: "Web 2",
    icon: MonitorSmartphone,
    items: [
      { title: "Send Mail", ...SendMail },
      { title: "Audio Lift", ...AudioLift },
      { title: "Time Ly", ...TimeLy },
    ],
  },
];
