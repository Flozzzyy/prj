const Loading = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-500/20 border-t-blue-500"></div>
    <p className="text-sm opacity-50 font-medium">Loading...</p>
  </div>
);
export default Loading;
