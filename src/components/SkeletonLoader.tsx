import { motion } from 'motion/react';

interface SkeletonLoaderProps {
  tab: string;
  key?: string;
}

export default function SkeletonLoader({ tab }: SkeletonLoaderProps) {
  // Common skeleton wrapper with transition
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  if (tab === 'home') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-5 space-y-6"
      >
        {/* Banner/Title Shimmer */}
        <div className="text-center space-y-2 mt-4">
          <div className="h-6 w-48 bg-slate-200 animate-pulse rounded-md mx-auto" />
          <div className="h-4 w-64 bg-slate-100 animate-pulse rounded-md mx-auto" />
        </div>

        {/* Booking Card Skeleton */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-5">
          {/* Tabs */}
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-4 w-16 bg-slate-200 animate-pulse rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-100 animate-pulse" />
              <div className="h-4 w-16 bg-slate-100 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                <div className="h-3 w-20 bg-slate-200/80 animate-pulse rounded-sm" />
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* Search Button */}
          <div className="h-14 w-full bg-slate-200 animate-pulse rounded-full" />
        </div>

        {/* Amenities Section Skeleton */}
        <div className="space-y-3 pt-2">
          <div className="h-5 w-36 bg-slate-200 animate-pulse rounded-md" />
          <div className="h-4 w-56 bg-slate-100 animate-pulse rounded-md" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/30 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (tab === 'print') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 text-center space-y-6"
      >
        <div className="w-16 h-16 bg-slate-100 animate-pulse rounded-full mx-auto" />
        <div className="space-y-2">
          <div className="h-6 w-36 bg-slate-200 animate-pulse rounded-md mx-auto" />
          <div className="h-4 w-60 bg-slate-100 animate-pulse rounded-md mx-auto" />
        </div>

        <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-2 text-left">
          <div className="h-3 w-32 bg-slate-200 animate-pulse rounded-sm" />
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-5 w-40 bg-slate-200 animate-pulse rounded-md" />
          </div>
        </div>

        <div className="h-14 w-full bg-slate-200 animate-pulse rounded-full" />
      </motion.div>
    );
  }

  if (tab === 'help') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 animate-pulse rounded-full mx-auto" />
          <div className="space-y-2">
            <div className="h-6 w-44 bg-slate-200 animate-pulse rounded-md mx-auto" />
            <div className="h-4 w-52 bg-slate-100 animate-pulse rounded-md mx-auto" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-slate-200 animate-pulse rounded-md" />
                <div className="h-3.5 w-48 bg-slate-100 animate-pulse rounded-md" />
                <div className="h-4 w-32 bg-slate-200/80 animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (tab === 'account') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 animate-pulse rounded-full mx-auto" />
          <div className="space-y-2">
            <div className="h-6 w-36 bg-slate-200 animate-pulse rounded-md mx-auto" />
            <div className="h-4 w-52 bg-slate-100 animate-pulse rounded-md mx-auto" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-2">
              <div className="h-3 w-24 bg-slate-200 animate-pulse rounded-sm" />
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-5 w-40 bg-slate-200 animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="h-14 w-full bg-slate-200 animate-pulse rounded-full" />
          <div className="h-14 w-full bg-slate-100 animate-pulse rounded-full" />
        </div>
      </motion.div>
    );
  }

  return null;
}
