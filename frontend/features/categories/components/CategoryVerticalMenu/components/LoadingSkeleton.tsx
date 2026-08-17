export function LoadingSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
