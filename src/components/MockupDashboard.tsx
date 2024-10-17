export default function MockupDashboard() {
  return (
    <>
      <div className="flex gap-2">
        {[...new Array(4)].map((_, i) => (
          <div
            key={`first-array-${i}`}
            className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-600 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {[...new Array(2)].map((_, i) => (
          <div
            key={`second-array-${i}`}
            className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-600 animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
}
