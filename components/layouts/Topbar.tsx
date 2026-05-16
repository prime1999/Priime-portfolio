const Topbar = () => {
  return (
    <header className="">
      <div className="mx-auto flex w-full items-end gap-2 overflow-hidden bg-white/10 px-3 py-3 backdrop-blur-xl shadow-[0_-1px_0_rgba(255,255,255,0.2)_inset]">
        {/* <div className="flex min-w-[14rem] max-w-[18rem] items-center gap-3 rounded-t-[1.1rem] border border-white/15 border-b-transparent bg-white/20 px-4 py-3 text-sm font-medium text-white shadow-[0_-10px_30px_rgba(0,0,0,0.22)]">
          <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
          <span className="truncate">Prime Portfolio</span>
        </div> */}

        <button
          type="button"
          aria-label="New tab placeholder"
          className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full border border-white/10 border-b-transparent bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span className="text-2xl leading-none">+</span>
        </button>

        {/* <div className="ml-auto hidden items-center gap-2 px-2 pb-3 text-[0.68rem] uppercase tracking-[0.32em] text-white/45 sm:flex">
          <span className="h-px w-10 bg-white/15" />
          <span>Tabs</span>
          <span className="h-px w-10 bg-white/15" />
        </div> */}
      </div>
    </header>
  );
};

export default Topbar;
