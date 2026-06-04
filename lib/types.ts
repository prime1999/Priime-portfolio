export type Project = {
  title: string;
  about: string;
  image: any;
  url: string;
};

export type ProjectDetailModalProps = {
  project: Project;
};

export type ExplorerView = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  sidebarContent?: React.ReactNode;
};
