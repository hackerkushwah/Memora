"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Lock, Image as ImageIcon, Loader2, LogIn } from "lucide-react";
import { uploadMemories } from "@/actions/memory-actions";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { supabaseClient } from "@/lib/supabase-client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: Props) {
  const { user } = useSupabaseSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  const [formData, setFormData] = useState({
    title: "",
    category: "🎓 College",
    description: "",
    password: "",
  });
  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [imageDescriptions, setImageDescriptions] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (filesSelected.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Upload images directly to Supabase Storage from browser
      const imageUrls: string[] = [];
      
      for (let i = 0; i < filesSelected.length; i++) {
        const file = filesSelected[i];
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `uploads/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabaseClient.storage
          .from("memories")
          .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          alert(`Failed to upload ${file.name}: ${uploadError.message}`);
          setIsUploading(false);
          return;
        }

        // Get the public URL
        const { data: urlData } = supabaseClient.storage
          .from("memories")
          .getPublicUrl(fileName);

        imageUrls.push(urlData.publicUrl);
        setUploadProgress(Math.round(((i + 1) / filesSelected.length) * 80)); // 0-80% for uploads
      }

      // Step 2: Send metadata + URLs to server action
      setUploadProgress(90);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("password", formData.password);
      
      for (const url of imageUrls) {
        data.append("imageUrls", url);
      }

      for (const desc of imageDescriptions) {
        data.append("imageDescriptions", desc);
      }
      
      const result = await uploadMemories(data);
      
      setUploadProgress(100);

      if (result.success) {
        setFormData({ title: "", category: "🎓 College", description: "", password: "" });
        setFilesSelected([]);
        setImageDescriptions([]);
        onClose();
        router.refresh();
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
        >
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative bg-[#050505] rounded-2xl w-full max-w-lg p-8 overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] max-h-[95vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              disabled={isUploading}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl text-white tracking-wide mb-2">Vault a Memory</h2>
              <p className="text-sm text-zinc-500">Record your journey and moments from 2022-26.</p>
            </div>

            {!user ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Lock className="w-12 h-12 text-[#D4AF37] mb-4 opacity-50" />
                <h3 className="text-xl text-white font-serif mb-2">Authentication Required</h3>
                <p className="text-zinc-400 mb-8 max-w-sm text-sm">
                  You must be signed in with your Google account to vault memories and claim ownership of your stack.
                </p>
                <button
                  onClick={handleSignIn}
                  className="bg-[#D4AF37] text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In with Google
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="Memory Stack Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="flex-1 bg-transparent border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm"
                />
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm"
                >
                  <option value="🎓 College">🎓 College</option>
                  <option value="❤️ Us">❤️ Us</option>
                  <option value="📸 Moments">📸 Moments</option>
                  <option value="✈️ Travel">✈️ Travel</option>
                  <option value="🌙 Unforgettable">🌙 Unforgettable</option>
                  <option value="✨ Forever">✨ Forever</option>
                </select>
              </div>

              <div>
                <textarea
                  placeholder="General story for this entire stack..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-transparent border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm min-h-[80px] resize-y"
                ></textarea>
              </div>
              
              {/* File Dropzone */}
              <div className="relative border border-dashed border-zinc-700 bg-zinc-900/30 rounded-xl p-4 text-center hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-black border border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {filesSelected.length > 0 ? (
                      <ImageIcon className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    ) : (
                      <UploadCloud className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    )}
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {filesSelected.length > 0 ? `${filesSelected.length} file(s) selected` : "Click to Browse Photos"}
                  </span>
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      const files = Array.from(e.target.files);
                      setFilesSelected(files);
                      setImageDescriptions(files.map(() => ""));
                    }
                  }}
                  id="file-upload"
                />
              </div>

              {/* Individual Image Description Previews */}
              {filesSelected.length > 0 && (
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {filesSelected.map((file, i) => (
                    <div key={i} className="flex gap-3 bg-black/50 p-3 rounded-lg border border-zinc-800/50 shrink-0">
                      <div className="w-16 h-16 shrink-0 rounded-md bg-zinc-900 overflow-hidden flex items-center justify-center border border-zinc-800">
                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt={`Preview ${i}`} />
                      </div>
                      <textarea
                        placeholder={`Story for photo ${i + 1}...`}
                        value={imageDescriptions[i] || ""}
                        onChange={(e) => {
                          const newDesc = [...imageDescriptions];
                          newDesc[i] = e.target.value;
                          setImageDescriptions(newDesc);
                        }}
                        className="flex-1 bg-transparent border border-zinc-700/50 rounded-md p-2 text-white focus:outline-none focus:border-white transition-colors text-xs resize-none h-16"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="relative">
                <input
                  required
                  type="password"
                  placeholder="Set Access Code (Password)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors text-sm"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-yellow-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-all mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Vaulting... {uploadProgress}%</>
                ) : (
                  "Vault Memory securely"
                )}
              </button>
            </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
