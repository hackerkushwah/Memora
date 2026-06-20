"use client";

import { CursorGlow } from "@/components/CursorGlow";
import { submitContactForm } from "@/actions/contact-actions";
import { useState, useTransition } from "react";
import { Mail, MessageSquare, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      setStatus("idle");
      const result = await submitContactForm(formData);
      
      if (result?.error) {
        setStatus("error");
        setErrorMessage(result.error);
      } else if (result?.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
            Get in <span className="font-cursive text-white/80 font-light">Touch</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have questions about your vault, need technical support, or want to share feedback? We&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <div className="glassmorphism p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <h2 className="text-2xl font-medium text-white mb-6">Send a Message</h2>
            
            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start space-x-3 text-green-400">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Thank you for your message. We&apos;ll get back to you within 24 hours.</p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start space-x-3 text-red-400">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/70">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/70">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white/70">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>

          {/* Info & FAQ */}
          <div className="space-y-12">
            
            <div className="space-y-8">
              <h2 className="text-2xl font-medium text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email Us</h3>
                    <p className="text-white/60 text-sm mt-1">hello@memora.app</p>
                    <p className="text-white/40 text-xs mt-1">We typically reply within 24 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Community</h3>
                    <p className="text-white/60 text-sm mt-1">Join our Discord server</p>
                    <p className="text-white/40 text-xs mt-1">Connect with other memory preservers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-white flex items-center space-x-2">
                <HelpCircle className="w-6 h-6 text-white/50" />
                <span>Frequently Asked Questions</span>
              </h2>
              
              <div className="space-y-4">
                <div className="glassmorphism p-5 rounded-xl">
                  <h3 className="text-white font-medium mb-2">Is my data secure?</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Absolutely. We use industry-standard encryption for all uploads. Only you have access to your vault.</p>
                </div>
                
                <div className="glassmorphism p-5 rounded-xl">
                  <h3 className="text-white font-medium mb-2">Can I export my memories?</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Yes, you can request a full takeout of your data at any time from your account settings.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
