const UsageEstimator = () => {
  return (
    <section className="bg-[linear-gradient(135deg,rgba(91,156,213,0.06)_0%,rgba(217,70,239,0.06)_100%)] px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 sm:gap-8">
          <div className="h-px flex-1 bg-[#DDE3F5]" />
          <h2 className="shrink-0 text-center text-xl font-bold text-[#0E1224] sm:text-3xl">
            Estimate your usage
          </h2>
          <div className="h-px flex-1 bg-[#DDE3F5]" />
        </div>

        <div className="mx-auto mt-9 grid max-w-[860px] gap-12 md:grid-cols-2 md:gap-10">
          <div>
            <div className="flex items-center justify-between text-sm font-bold text-[#0E1224]">
              <span>Monthly Calls</span>
            </div>
            <div className="relative mt-5 h-2 rounded-full bg-[#BFBFBF]">
               <div className="relative h-full w-[54%] rounded-full bg-[#5B7FF0]">
                <span className="absolute -top-10 right-0 translate-x-1/2 rounded-md bg-[#5B7FF0] px-2 py-1 text-xs font-bold text-white after:absolute after:-bottom-2 after:left-0 after:border-l-[10px] after:border-t-[10px] after:border-l-transparent after:border-t-[#5B7FF0] sm:-top-11 sm:px-3 sm:py-1.5 sm:text-base">
                  5000
                </span>
                <span className="absolute right-[-6px] top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full border border-[#5B7FF0] bg-white shadow-[0_0_0_3px_rgba(217,77,206,0.12)]" />
              </div>
            </div>
            <p className="mt-8 text-sm font-bold text-[#5B7FF0]">
              Recommended Plan : Growth
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-bold text-[#0E1224]">
              <span>Monthly Actions</span>
            </div>
            <div className="relative mt-5 h-2 rounded-full bg-[#BFBFBF]">
              <div className="relative h-full w-[54%] rounded-full bg-[#D94DCE]">
                <span className="absolute -top-10 right-0 translate-x-1/2 rounded-md bg-[#D94DCE] px-2 py-1 text-xs font-bold text-white after:absolute after:-bottom-2 after:left-0 after:border-l-[10px] after:border-t-[10px] after:border-l-transparent after:border-t-[#D94DCE] sm:-top-11 sm:px-3 sm:py-1.5 sm:text-base">
                  5000
                </span>
                <span className="absolute right-[-6px] top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full border border-[#D94DCE] bg-white shadow-[0_0_0_3px_rgba(217,77,206,0.12)]" />
              </div>
            </div>
            <p className="mt-8 text-sm font-bold text-[#D94DCE]">
              Estimated Add - Ons: +2000 mins, +5000 actions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageEstimator;
