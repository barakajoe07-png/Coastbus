import { Bus, ArrowLeft, Armchair } from 'lucide-react';

interface BookingFormSkeletonProps {
  targetStep: 'search' | 'results' | 'seats' | 'details';
  from?: string;
  to?: string;
  date?: string;
}

export default function BookingFormSkeleton({ targetStep, from = 'Nairobi', to = 'Mombasa', date = '2026-07-05' }: BookingFormSkeletonProps) {
  if (targetStep === 'results') {
    return (
      <div className="animate-pulse space-y-4">
        {/* Dark Header Skeleton */}
        <div className="bg-[#151515] text-white -mx-4 -mt-4 p-4 rounded-t-2xl flex items-center gap-3.5 border-b border-neutral-800 shadow-md">
          <div className="w-8 h-8 rounded-full bg-neutral-800 shrink-0" />
          <div className="bg-neutral-800/80 p-2 rounded-xl w-9 h-9 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 bg-neutral-800 rounded w-1/2" />
            <div className="h-3 bg-neutral-800 rounded w-1/3" />
          </div>
        </div>

        {/* Filter Chips Shimmer */}
        <div className="flex items-center gap-2 overflow-x-hidden pb-2 pt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-24 shrink-0" />
          ))}
        </div>

        {/* Header Status Text Shimmer */}
        <div className="flex justify-between items-center px-1">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>

        {/* Bus Cards List Shimmer */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-white shadow-xs space-y-3 relative">
              {/* Route pill shimmer */}
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
              
              {/* Departure, Destination, Bus Icon layout */}
              <div className="flex items-center justify-between">
                <div className="space-y-1.5 w-1/4">
                  <div className="h-2.5 bg-gray-200 rounded w-12" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="h-1 bg-gray-100 w-full rounded" />
                </div>
                <div className="space-y-1.5 w-1/4 items-end flex flex-col">
                  <div className="h-2.5 bg-gray-200 rounded w-12" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              </div>

              {/* Shimmer metadata */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                <div className="space-y-1 w-1/3">
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="h-2.5 bg-gray-100 rounded w-14" />
                </div>
                <div className="h-8 bg-gray-200 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (targetStep === 'seats') {
    return (
      <div className="animate-pulse space-y-4">
        {/* Dark Header Skeleton */}
        <div className="bg-[#151515] text-white -mx-4 -mt-4 p-4 rounded-t-2xl flex items-center gap-3.5 border-b border-neutral-800 shadow-md">
          <div className="w-8 h-8 rounded-full bg-neutral-800 shrink-0" />
          <div className="bg-neutral-800/80 p-2 rounded-xl w-9 h-9 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 bg-neutral-800 rounded w-2/3" />
            <div className="h-3 bg-neutral-800 rounded w-1/2" />
          </div>
        </div>

        {/* Legend Indicator Shimmer */}
        <div className="flex justify-around bg-slate-50 p-3 rounded-2xl border border-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-gray-200" />
              <div className="h-3 bg-gray-200 rounded w-10" />
            </div>
          ))}
        </div>

        {/* Bus Layout Skeleton Frame */}
        <div className="border border-slate-200 rounded-3xl p-5 bg-slate-50/50 max-w-xs mx-auto space-y-6">
          {/* Driver Cockpit Shimmer */}
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
            <div className="w-7 h-7 bg-slate-200 rounded-full" />
            <div className="w-8 h-8 bg-slate-200 rounded-lg" />
          </div>

          {/* Grid Layout of Seats */}
          <div className="space-y-3.5">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center justify-between gap-4">
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                </div>
                <div className="w-4 h-4 bg-transparent border-r-2 border-dashed border-slate-200" />
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Shimmer Bar */}
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-12 bg-gray-200 rounded-full w-32" />
        </div>
      </div>
    );
  }

  if (targetStep === 'details') {
    return (
      <div className="animate-pulse space-y-4">
        {/* Dark Header Skeleton */}
        <div className="bg-[#151515] text-white -mx-4 -mt-4 p-4 rounded-t-2xl flex items-center gap-3.5 border-b border-neutral-800 shadow-md">
          <div className="w-8 h-8 rounded-full bg-neutral-800 shrink-0" />
          <div className="bg-neutral-800/80 p-2 rounded-xl w-9 h-9 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 bg-neutral-800 rounded w-1/2" />
            <div className="h-3 bg-neutral-800 rounded w-1/3" />
          </div>
        </div>

        {/* Selected Details Header Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex justify-between">
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="space-y-1.5 text-right">
            <div className="h-3 bg-gray-200 rounded w-10" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Input Fields Shimmer */}
        <div className="space-y-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-3.5 space-y-2">
              <div className="h-2.5 bg-gray-200 rounded w-16" />
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0" />
                <div className="h-4 bg-gray-200 rounded w-40" />
              </div>
            </div>
          ))}
          <div className="border border-gray-100 rounded-2xl p-3.5 space-y-2">
            <div className="h-2.5 bg-gray-200 rounded w-24" />
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0" />
              <div className="h-4 bg-gray-200 rounded w-48" />
            </div>
          </div>
        </div>

        {/* Large green action button skeleton */}
        <div className="h-14 bg-gray-200 rounded-full w-full mt-6" />
      </div>
    );
  }

  // fallback/search skeleton
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-100 rounded-2xl p-4 space-y-2 bg-slate-50/20">
            <div className="h-2.5 bg-gray-200 rounded w-14" />
            <div className="h-4 bg-gray-200 rounded w-40" />
          </div>
        ))}
      </div>
      <div className="h-12 bg-gray-200 rounded-full w-full mt-6" />
    </div>
  );
}
