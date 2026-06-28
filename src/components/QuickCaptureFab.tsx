"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { UploadModal } from "./UploadModal";
import { motion, AnimatePresence } from "framer-motion";

export function QuickCaptureFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#D4AF37] hover:bg-white text-black rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center transition-colors z-40 group"
      >
        <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      <UploadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
