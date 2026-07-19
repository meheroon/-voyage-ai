export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-navy-100" />
      <div className="p-5">
        <div className="mb-2 h-5 w-3/4 rounded bg-navy-100" />
        <div className="mb-3 space-y-2">
          <div className="h-3 w-full rounded bg-navy-100" />
          <div className="h-3 w-2/3 rounded bg-navy-100" />
        </div>
        <div className="mb-4 flex gap-3">
          <div className="h-3 w-20 rounded bg-navy-100" />
          <div className="h-3 w-16 rounded bg-navy-100" />
        </div>
        <div className="h-4 w-24 rounded bg-navy-100" />
      </div>
    </div>
  );
}
