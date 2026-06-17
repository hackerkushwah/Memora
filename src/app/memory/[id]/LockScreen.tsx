"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ClientMemory } from "@/lib/data";
import { Lock, Unlock, ChevronLeft, ChevronRight, Quote, ArrowLeft, Share2, Trash2, Download, ImagePlus, Mail, KeyRound, Loader2, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { deleteMemory, deleteSinglePhoto, addPhotoToMemory, verifyPassword } from "@/actions/memory-actions";
import { sendRecoveryCode, verifyRecoveryCode } from "@/actions/email-actions";
import { supabaseClient } from "@/lib/supabase-client";

type RecoveryState = "idle" | "confirming" | "sending" | "code-entry" | "verifying" | "unlocking" | "error";

export function LockScreen({ memory, isOwner }: { memory: ClientMemory; isOwner: boolean }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recoveryState, setRecoveryState] = useState<RecoveryState>("idle");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  // Security: 6-digit codes instead of 4 (Fix #8)
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const codeRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();
  const { user } = useSupabaseSession();

  // Security: Server-side password verification (Fix #1, #2)
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredPassword.trim()) return;

    setIsVerifyingPassword(true);
    setError(false);
    setErrorMessage("");

    const result = await verifyPassword(memory.id, enteredPassword);

    setIsVerifyingPassword(false);
    if (result.success) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setErrorMessage(result.error || "Key rejected. Try again.");
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!unlocked || memory.imageUrls.length <= 1) return;
    if (e.key === "ArrowRight") setActiveSlideIdx((prev) => (prev === memory.imageUrls.length - 1 ? 0 : prev + 1));
    else if (e.key === "ArrowLeft") setActiveSlideIdx((prev) => (prev === 0 ? memory.imageUrls.length - 1 : prev - 1));
  }, [unlocked, memory.imageUrls.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Security: No hash parameter — server checks session ownership (Fix #6)
  const handleDeleteStack = async () => {
    if (!confirm("Are you sure you want to completely erase this stack?")) return;
    setIsDeleting(true);
    const res = await deleteMemory(memory.id);
    if (res.success) router.push("/profile");
    else { alert("Error: " + res.error); setIsDeleting(false); }
  };

  const handleRemovePhoto = async () => {
    if (!confirm("Remove this specific photo from the stack?")) return;
    const res = await deleteSinglePhoto(memory.id, memory.imageUrls[activeSlideIdx]);
    if (res.success) { if (res.shouldClose) router.push("/profile"); else window.location.reload(); }
    else alert("Error: " + res.error);
  };

  // Upload to Supabase Storage client-side, then pass URL to server action
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `uploads/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabaseClient.storage
      .from("memories")
      .upload(fileName, file, { contentType: file.type });

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      return;
    }

    const { data: urlData } = supabaseClient.storage
      .from("memories")
      .getPublicUrl(fileName);

    const res = await addPhotoToMemory(memory.id, urlData.publicUrl);
    if (res.success) window.location.reload();
    else alert("Error: " + res.error);
  };

  const handleDownload = async () => {
    try {
      const url = memory.imageUrls[activeSlideIdx];
      const response = await fetch(url);
      const blob = await response.blob();
      const ext = url.split('.').pop()?.split('?')[0] || 'jpg';
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Memora_${memory.title}_${activeSlideIdx + 1}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(memory.imageUrls[activeSlideIdx], '_blank');
    }
  };

  const handleSendCode = async () => {
    setRecoveryState("sending");
    const res = await sendRecoveryCode(memory.id);
    if (res.success) {
      setMaskedEmail(res.maskedEmail || "");
      setRecoveryState("code-entry");
      setCodeDigits(["", "", "", "", "", ""]);
      setTimeout(() => codeRefs[0].current?.focus(), 100);
    } else {
      setRecoveryState("error");
      setRecoveryMessage(res.error || "Failed to send email.");
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);
    if (value && index < 5) codeRefs[index + 1].current?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      codeRefs[index - 1].current?.focus();
    }
  };

  // Security: Auto-unlock after code verification, never reveal password (Fix #3)
  const handleVerifyCode = async () => {
    const code = codeDigits.join("");
    if (code.length !== 6) return;
    setRecoveryState("verifying");
    const res = await verifyRecoveryCode(memory.id, code);
    if (res.success) {
      // Auto-unlock — no password revealed
      setRecoveryState("unlocking");
      setTimeout(() => {
        setUnlocked(true);
        setRecoveryState("idle");
      }, 1200);
    } else {
      setRecoveryState("error");
      setRecoveryMessage(res.error || "Verification failed.");
    }
  };

  // ─── LOCK SCREEN VIEW ───
  if (!unlocked) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="lock"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-10 md:p-12 flex flex-col items-center justify-center text-center shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl mb-2 text-white">Private Stack</h2>
          <p className="text-zinc-500 mb-8 text-sm">
            This experience (&ldquo;{memory.title}&rdquo;) has been locked by {memory.uploadedBy}. Enter the encrypted key to view the narrative.
          </p>

          <form onSubmit={handleUnlock} className="w-full space-y-4">
            <input
              type="password"
              placeholder="Enter Vault Key"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              disabled={isVerifyingPassword}
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-zinc-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-center text-lg tracking-widest disabled:opacity-50`}
            />
            {error && <p className="text-red-400 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              disabled={isVerifyingPassword}
              className="w-full bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#D4AF37] font-semibold py-3.5 rounded-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifyingPassword ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
              ) : (
                <><Unlock className="w-4 h-4" /> Decrypt Stack</>
              )}
            </button>
          </form>

          {/* ── Forgot Password Flow ── */}
          <div className="w-full pt-4 border-t border-zinc-800/50 mt-6">
            <AnimatePresence mode="wait">
              {recoveryState === "idle" && (
                <motion.button key="r-idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="button" onClick={() => setRecoveryState("confirming")} className="w-full flex items-center justify-center gap-2 text-zinc-500 hover:text-[#D4AF37] transition-colors py-2 text-sm">
                  <KeyRound className="w-3.5 h-3.5" /> Forgot Vault Key?
                </motion.button>
              )}

              {recoveryState === "confirming" && (
                <motion.div key="r-confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-white text-sm font-semibold">Email Recovery</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed">We&apos;ll send a 6-digit verification code to the owner&apos;s Google account. Enter the code to unlock this stack.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setRecoveryState("idle")} className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm">Cancel</button>
                    <button type="button" onClick={handleSendCode} className="flex-1 py-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Send Code
                    </button>
                  </div>
                </motion.div>
              )}

              {recoveryState === "sending" && (
                <motion.div key="r-sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 py-4">
                  <Loader2 className="w-5 h-5 text-[#D4AF37] animate-spin" />
                  <span className="text-zinc-400 text-sm">Sending verification code...</span>
                </motion.div>
              )}

              {recoveryState === "code-entry" && (
                <motion.div key="r-code" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <p className="text-zinc-400 text-xs">Code sent to <span className="text-[#D4AF37] font-semibold">{maskedEmail}</span>. Enter the 6-digit code:</p>
                  <div className="flex justify-center gap-2">
                    {codeDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={codeRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeInput(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        className="w-11 h-14 bg-black border-2 border-zinc-700 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-[#D4AF37] transition-colors tracking-widest"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setRecoveryState("idle"); setCodeDigits(["","","","","",""]); }} className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white transition-colors text-sm">Cancel</button>
                    <button type="button" onClick={handleVerifyCode} disabled={codeDigits.join("").length !== 6} className="flex-1 py-2.5 rounded-lg bg-[#D4AF37] text-black font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-500 transition-all flex items-center justify-center gap-2">
                      <Unlock className="w-3.5 h-3.5" /> Verify
                    </button>
                  </div>
                  <button type="button" onClick={handleSendCode} className="text-zinc-500 hover:text-[#D4AF37] text-xs transition-colors">Resend Code</button>
                </motion.div>
              )}

              {recoveryState === "verifying" && (
                <motion.div key="r-verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 py-4">
                  <Loader2 className="w-5 h-5 text-[#D4AF37] animate-spin" />
                  <span className="text-zinc-400 text-sm">Verifying code...</span>
                </motion.div>
              )}

              {/* Security: Auto-unlock success — no password revealed (Fix #3) */}
              {recoveryState === "unlocking" && (
                <motion.div key="r-unlocking" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Unlock className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-sm font-semibold">Code Verified! Unlocking...</span>
                  </div>
                  <Loader2 className="w-5 h-5 text-emerald-400 animate-spin mx-auto" />
                </motion.div>
              )}

              {recoveryState === "error" && (
                <motion.div key="r-error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-red-950/40 border border-red-800/40 rounded-xl p-4 text-center space-y-2">
                  <p className="text-red-300 text-sm font-semibold">Recovery Failed</p>
                  <p className="text-red-400/70 text-xs">{recoveryMessage}</p>
                  <button type="button" onClick={() => setRecoveryState("idle")} className="text-zinc-500 hover:text-white text-xs transition-colors mt-1">Try Again</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Navigation Buttons ── */}
          <div className="w-full pt-4 mt-2 flex flex-col gap-2">
            <div className="flex gap-2">
              <button type="button" onClick={() => router.push("/")} className="flex-1 flex items-center justify-center gap-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all py-2.5 text-sm rounded-lg border border-zinc-800/50">
                <Home className="w-3.5 h-3.5" /> Home
              </button>
              {user && (
                <button type="button" onClick={() => router.push("/profile")} className="flex-1 flex items-center justify-center gap-2 text-zinc-500 hover:text-[#D4AF37] hover:bg-zinc-800/50 transition-all py-2.5 text-sm rounded-lg border border-zinc-800/50">
                  <User className="w-3.5 h-3.5" /> My Profile
                </button>
              )}
            </div>
            <button type="button" onClick={() => router.back()} className="w-full flex items-center justify-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors py-2 text-xs">
              <ArrowLeft className="w-3 h-3" /> Go Back
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ─── UNLOCKED VIEW ───
  return (
    <div className="flex flex-col h-screen w-full bg-[#070211] relative overflow-hidden font-sans text-white">
      {/* Blurred BG */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img key={`bg-${activeSlideIdx}`} src={memory.imageUrls[activeSlideIdx]} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="w-full h-full object-cover blur-3xl" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-black/60 to-black" />
      </div>

      {/* Header */}
      <div className="shrink-0 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center z-20 relative gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 text-white" title="Home">
            <Home className="w-5 h-5" />
          </button>
          {user && (
            <button onClick={() => router.push("/profile")} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 text-white" title="My Profile">
              <User className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => router.back()} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 text-white" title="Go Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-1">
            {memory.category && <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">{memory.category}</span>}
            <h2 className="font-serif text-2xl md:text-4xl text-white mt-1 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">{memory.title}</h2>
            <p className="text-zinc-400 mt-1 text-xs md:text-sm tracking-widest font-light uppercase">Shared by {memory.uploadedBy} • {memory.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handleDownload} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-colors backdrop-blur-md" title="Download Photo">
            <Download className="w-4 h-4" /><span className="hidden md:inline">Download</span>
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Secure link copied!"); }} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-colors backdrop-blur-md">
            <Share2 className="w-4 h-4" /><span className="hidden md:inline">Share</span>
          </button>

          {isOwner && (
            <>
              <div className="w-[1px] h-6 bg-white/20 mx-1 hidden md:block" />
              <label className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-colors backdrop-blur-md cursor-pointer">
                <ImagePlus className="w-4 h-4 text-[#D4AF37]" /><span className="hidden md:inline">Add Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleAddPhoto} />
              </label>
              <button onClick={handleDeleteStack} disabled={isDeleting} className="flex items-center gap-2 bg-red-950/50 hover:bg-red-900 border border-red-900/50 text-red-200 px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-colors backdrop-blur-md">
                <Trash2 className="w-4 h-4" /><span className="hidden md:inline">{isDeleting ? "Erasing..." : "Erase Stack"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Viewer */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`slide-${activeSlideIdx}`} 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} 
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] flex items-center justify-center touch-pan-y"
            drag={memory.imageUrls.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                setActiveSlideIdx((p) => (p === memory.imageUrls.length - 1 ? 0 : p + 1));
              } else if (swipe > 50) {
                setActiveSlideIdx((p) => (p === 0 ? memory.imageUrls.length - 1 : p - 1));
              }
            }}
          >
            <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(60,16,83,0.5)] group">
              <img src={memory.imageUrls[activeSlideIdx]} alt={`${memory.title} - Frame ${activeSlideIdx + 1}`} className="w-full h-full object-contain p-2 md:p-4" />

              {activeSlideIdx === 0 && memory.description && (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.5 }} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 md:p-16 text-center backdrop-blur-sm">
                  <Quote className="w-10 h-10 text-[#D4AF37] opacity-50 mb-6 rotate-180" />
                  <p className="font-serif text-xl md:text-3xl leading-relaxed text-white drop-shadow-lg italic max-w-3xl">&ldquo;{memory.description}&rdquo;</p>
                </motion.div>
              )}

              {memory.imageDescriptions && memory.imageDescriptions[activeSlideIdx] && (
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white/90 font-sans text-sm md:text-lg whitespace-pre-line font-light">{memory.imageDescriptions[activeSlideIdx]}</p>
                </div>
              )}

              {isOwner && memory.imageUrls.length > 0 && (
                <button onClick={handleRemovePhoto} title="Remove this photo" className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-950/80 hover:bg-red-600 text-white border border-red-900/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {memory.imageUrls.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setActiveSlideIdx((p) => (p === 0 ? memory.imageUrls.length - 1 : p - 1)); }} className="absolute left-[-1rem] md:left-[-3rem] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all z-30">
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setActiveSlideIdx((p) => (p === memory.imageUrls.length - 1 ? 0 : p + 1)); }} className="absolute right-[-1rem] md:right-[-3rem] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all z-30">
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {memory.imageUrls.length > 1 && (
        <div className="relative z-20 h-32 md:h-40 w-full bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center px-6 overflow-x-auto gap-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full">
          {memory.imageUrls.map((url, i) => (
            <button key={i} onClick={() => setActiveSlideIdx(i)} className={`relative shrink-0 h-20 md:h-24 aspect-video rounded-lg overflow-hidden transition-all duration-300 ${activeSlideIdx === i ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-black scale-105' : 'opacity-40 hover:opacity-100 hover:scale-105 filter grayscale hover:grayscale-0'}`}>
              <img src={url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
