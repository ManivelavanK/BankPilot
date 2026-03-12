export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-in">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl skeleton"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full skeleton"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded skeleton mb-2"></div>
            <div className="w-32 h-4 bg-gray-200 rounded skeleton"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="w-48 h-6 bg-gray-200 rounded skeleton mb-4"></div>
          <div className="w-full h-64 bg-gray-200 rounded skeleton"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="w-32 h-6 bg-gray-200 rounded skeleton mb-4"></div>
          <div className="w-full h-64 bg-gray-200 rounded-full skeleton"></div>
        </div>
      </div>
    </div>
  );
}
