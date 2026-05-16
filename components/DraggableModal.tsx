"use client";

// react-imports
import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
// icons-imports
import { Folder, X } from "lucide-react";
// gsap-imports
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
// Import utility function for conditional class names
import { cn } from "@/lib/utils";
// types-imports
import { ExplorerView } from "@/lib/types";

// custom-types
export type DraggableModalProps = {
  trigger?: ReactElement<{
    onClick?: React.MouseEventHandler<HTMLElement>;
  }> | null;
  title?: string;
  sidebarTitle?: string;
  views: ExplorerView[];
  initialViewId?: string;
  className?: string;
  closeOnBackdrop?: boolean;
  onClose?: () => void;
  autoOpen?: boolean;
};

const DraggableModal = ({
  trigger,
  title = "",
  sidebarTitle = "Priime Portfolio",
  views,
  initialViewId,
  className = "",
  closeOnBackdrop = true,
  onClose,
  autoOpen = false,
}: DraggableModalProps) => {
  // state-variables
  const [open, setOpen] = useState(autoOpen);
  const [activeViewId, setActiveViewId] = useState(
    initialViewId ?? views[0]?.id ?? "",
  );
  // refs for modal and draggable effect
  const modalRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // current active view based on activeViewId
  const activeView =
    views.find((view) => view.id === activeViewId) ?? views[0] ?? null;

  // Register Draggable plugin on component mount
  useEffect(() => {
    gsap.registerPlugin(Draggable);
  }, []);

  useEffect(() => {
    // check if the modal is open or the refs are not set, if so, exit early
    if (!open || !modalRef.current || !headerRef.current) return;
    // but if they are, then create a draggable instance for the modal using the header as the trigger
    const draggable = Draggable.create(modalRef.current, {
      type: "x,y",
      trigger: headerRef.current,
      edgeResistance: 0.65,
      bounds: document.body,
      inertia: true,
    });
    // clear the draggable instance on component unmount or when the modal is closed
    return () => {
      draggable[0]?.kill();
    };
  }, [open]);
  // If the code is running on the server, return null to avoid errors related to document or window
  if (typeof window === "undefined") return null;
  // function to open the modal and set the active view if initialViewId is provided
  const openModal = () => setOpen(true);
  // function to close the modal
  const closeModal = () => {
    setOpen(false);
    onClose?.();
  };
  // If a trigger element is provided, clone it and add an onClick handler to open the modal and set the active view if initialViewId is provided
  const triggerEl = trigger
    ? React.cloneElement(trigger, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          if (initialViewId) {
            setActiveViewId(initialViewId);
          }
          openModal();
        },
      })
    : null;

  return (
    <>
      {triggerEl}

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onMouseDown={() => closeOnBackdrop && closeModal()}
            />

            <div
              ref={modalRef}
              className={`relative font-poppins w-11/12 md:w-8/12 lg:w-1/2 mx-auto max-h-[90vh] overflow-hidden border border-slate-200/10 bg-black/40 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${className}`}
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(-50%,-50%)`,
              }}
            >
              <div
                ref={headerRef}
                className="drag-handle flex items-center justify-between gap-3 border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-4 py-3 cursor-grab select-none"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-lg border border-blue-300/20 bg-blue-400/10">
                    <div className="size-3 rounded-full bg-blue-300/80" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-white">
                      {title}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={closeModal}
                  className="grid place-items-center rounded p-1 text-slate-200 hover:bg-white/5"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="grid h-[min(82vh,760px)] grid-cols-[220px_minmax(0,1fr)] overflow-hidden">
                <aside className="border-r border-white/10 bg-black/10 backdrop-blur-xl p-3">
                  <div>
                    <div className="mb-2 flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <Folder
                        fill="blue"
                        className="size-3.5 text-cyan-300/80"
                      />
                      {sidebarTitle}
                    </div>
                    <div className="space-y-1">
                      {views.map((view) => {
                        const isActive = view.id === activeView?.id;

                        return (
                          <button
                            key={view.id}
                            type="button"
                            onClick={() => setActiveViewId(view.id)}
                            className={cn(
                              "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition cursor-pointer",
                              isActive
                                ? "bg-gray-800/90 text-white"
                                : "text-slate-300 hover:bg-white/5 hover:text-white",
                            )}
                          >
                            <span className="shrink-0 text-xs">
                              {view.icon ?? (
                                <Folder fill="blue" className="size-4" />
                              )}
                            </span>
                            <span className="font-medium">{view.label}</span>
                            {isActive ? (
                              <span className="ml-auto size-1.5 rounded-full bg-blue-500" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    {activeView?.sidebarContent ? (
                      <div className="mt-3 border-t border-white/10 pt-3">
                        {activeView.sidebarContent}
                      </div>
                    ) : null}
                  </div>
                </aside>

                <section className="scrollbar-hidden min-w-0 overflow-auto bg-[#0e1728]/20 backdrop-blur-2xl">
                  {activeView?.content}
                </section>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default DraggableModal;
