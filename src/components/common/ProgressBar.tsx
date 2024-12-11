"use client";

import { motion } from "framer-motion";

interface Props {
  capacity?: number;
  participantCount?: number;
}

export default function ProgressBar({ capacity, participantCount }: Props) {
  const progressed = capacity && participantCount ? Math.round((participantCount / capacity) * 100) : undefined;
  return (
    <div className="my-2 h-[6px] w-full rounded-lg bg-gray-300">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progressed}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-[6px] rounded-lg bg-main"
      />
    </div>
  );
}
