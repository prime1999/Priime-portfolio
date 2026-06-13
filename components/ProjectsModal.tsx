"use client";

// react-imports
import { useMemo, useState, type ReactElement } from "react";
// icons-imports
import {
  CircleAlert,
  FileText,
  Folder,
  Mail,
  FolderOpen,
  Info,
} from "lucide-react";
// lib-imports
import { projectFolders } from "@/lib/projects";
// draggable modal components imports
import DraggableModal from "@/components/DraggableModal";
import ProjectDetailModal from "@/components/ProjectDetailModal";
// shadcn-imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// types-imports
import { ExplorerView } from "@/lib/types";
import ContactViewBody from "./ContactViewBody";
import About from "./About";

// custom-types
type ProjectsModalProps = {
  trigger: ReactElement<{
    onClick?: React.MouseEventHandler<HTMLElement>;
  }>;
  initialViewId?: "projects" | "contact" | "resume" | "about";
};

const ProjectsModal = ({
  trigger,
  initialViewId = "projects",
}: ProjectsModalProps) => {
  // state-variables
  const [selectedFolderId, setSelectedFolderId] = useState(
    projectFolders[0]?.id ?? "",
  );
  const [openProjectModals, setOpenProjectModals] = useState<
    { projectTitle: string; projectUrl: string }[]
  >([]);

  // memo to handle the currently selected project folder based on selectedFolderId, this will optimize performance by avoiding unnecessary calculations on re-renders
  const selectedFolder = useMemo(
    () =>
      projectFolders.find((folder) => folder.id === selectedFolderId) ??
      projectFolders[0],
    [selectedFolderId],
  );

  // functions to open project detail modals, they will update the openProjectModals state to keep track of which project modals are currently open
  const openProjectModal = (project: any) => {
    setOpenProjectModals((prev) => [
      ...prev,
      { projectTitle: project.title, projectUrl: project.url },
    ]);
  };
  // functiont to close project detail modals, it will remove the project from the openProjectModals state based on the projectUrl
  const closeProjectModal = (projectUrl: string) => {
    setOpenProjectModals((prev) =>
      prev.filter((p) => p.projectUrl !== projectUrl),
    );
  };
  // function to handle the selection of a project folder, it will update the selectedFolderId state to the id of the selected folder
  const handleFolderSelect = (folderId: string) => {
    const nextFolder =
      projectFolders.find((folder) => folder.id === folderId) ??
      projectFolders[0];

    setSelectedFolderId(nextFolder.id);
  };

  const projectsSidebarContent = (
    <Accordion type="single" collapsible defaultValue="project-folders">
      <AccordionItem value="project-folders" className="border-b-0">
        <AccordionTrigger className="hidden px-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:no-underline md:flex">
          Projects
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="grid grid-cols-2 gap-2 pl-1 md:block md:space-y-1">
            {projectFolders.map((folder) => {
              const isActive = folder.id === selectedFolderId;
              const FolderIcon = folder.icon;

              return (
                <Tooltip key={folder.id}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={folder.label}
                      onClick={() => handleFolderSelect(folder.id)}
                      className={
                        isActive
                          ? "flex w-full items-center gap-2 rounded-lg bg-gray-800/90 px-2 py-2 text-left text-sm text-blue-100 md:px-3"
                          : "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-300 transition cursor-pointer hover:bg-white/5 hover:text-white md:px-3"
                      }
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-blue-300">
                        <FolderIcon className="size-4" />
                      </span>
                      <span className="hidden md:inline">{folder.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{folder.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  const projectViewBody = (
    <div className="flex h-full min-h-[min(82vh,760px)] w-full flex-col text-slate-100">
      <div className="border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-fjalla-one tracking-widest text-white">
              {selectedFolder?.label} Projects
            </h2>
          </div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Explorer view
          </div>
        </div>
      </div>

      <div className="scrollbar-hidden flex-1 overflow-auto p-4">
        <div className="flex">
          {selectedFolder?.items.map((project) => {
            const isOpen = openProjectModals.some(
              (p) => p.projectUrl === project.url,
            );

            return (
              <div
                key={project.title}
                className="w-full flex flex-col items-center gap-3 p-4"
                onDoubleClick={() => openProjectModal(project)}
              >
                <div className="cursor-pointer">
                  {isOpen ? (
                    <FolderOpen
                      fill="white"
                      className="size-10 text-[2px] text-gray-500"
                    />
                  ) : (
                    <Folder fill="white" stroke="none" className="size-10" />
                  )}
                </div>
                <p className="text-center text-xs text-white line-clamp-2 max-w-full">
                  {project.title}
                </p>

                {isOpen && (
                  <DraggableModal
                    key={`detail-${project.url}`}
                    title={project.title}
                    views={[
                      {
                        id: "details",
                        label: "Details",
                        content: <ProjectDetailModal project={project} />,
                      },
                    ]}
                    initialViewId="details"
                    className="bg-[#101726]"
                    closeOnBackdrop={false}
                    onClose={() => closeProjectModal(project.url)}
                    autoOpen={true}
                    trigger={null}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/70 px-4 py-2 text-xs text-slate-400">
        <span>{selectedFolder?.items.length} objects</span>
        <span className="flex items-center gap-2">
          <CircleAlert className="size-3.5 text-blue-300/70" />
          Ready
        </span>
      </div>
    </div>
  );

  const contactViewBody = (
    <div className="flex h-full min-h-[min(82vh,760px)] flex-col p-6 text-slate-100">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-blue-300/80">
          Contact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Reach Me</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300/85">
          Use this section for your contact channels. You can replace this with
          your form or social links panel.
        </p>
      </div>
    </div>
  );

  const resumeViewBody = (
    <div className="flex h-full min-h-[min(82vh,760px)] flex-col p-6 text-slate-100">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-blue-300/80">
          Resume
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Resume Preview
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300/85">
          Add your resume embed or downloadable file action here.
        </p>
      </div>
    </div>
  );

  const views: ExplorerView[] = [
    {
      id: "about",
      label: "About",
      icon: <Info fill="blue" className="size-4 text-slate-300" />,
      content: <About />,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Folder fill="blue" className="size-4 text-blue-300" />,
      content: projectViewBody,
      sidebarContent: projectsSidebarContent,
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail fill="blue" className="size-4 text-slate-300" />,
      content: <ContactViewBody />,
    },
    {
      id: "resume",
      label: "Resume",
      icon: <FileText fill="blue" className="size-4 text-slate-300" />,
      content: resumeViewBody,
    },
  ];

  return (
    <DraggableModal
      trigger={trigger}
      title="Portfolio Explorer"
      sidebarTitle="This Portfolio"
      initialViewId={initialViewId}
      views={views}
    />
  );
};

export default ProjectsModal;
