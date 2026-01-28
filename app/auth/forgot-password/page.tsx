"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Loader2, Send, CheckCircle2 } from "lucide-react";
import { sendPasswordResetEmail } from "@/lib/supabase/auth";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await sendPasswordResetEmail(email);

      if (resetError) {
        toast.error(resetError);
        return;
      }

      setEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF5E6] p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#B08D3C]/20 p-10 max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#5A3A10] mb-4 text-center">
            Check Your Email! 📧
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            We've sent a password reset link to{" "}
            <span className="font-semibold text-[#B08D3C]">{email}</span>
          </p>

          <div className="bg-[#FFF8F0] rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong className="text-[#B08D3C]">Next steps:</strong>
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-2 space-y-1">
              <li>Check your email inbox</li>
              <li>Click the reset password link</li>
              <li>Create a new password</li>
              <li>Sign in with your new password</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="
                block w-full py-3 text-center
                bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
                text-white font-semibold rounded-xl
                hover:shadow-lg hover:scale-[1.02]
                transition-all duration-300
              "
            >
              Back to Login
            </Link>

            <button
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
              className="
                block w-full py-3 text-center
                bg-white border-2 border-gray-200
                text-gray-700 font-semibold rounded-xl
                hover:bg-gray-50
                transition-all duration-300
              "
            >
              Send Again
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF5E6] p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/salon-bg.webp')] bg-cover bg-center opacity-50 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B08D3C]/20 via-transparent to-[#5A3A10]/20" />
      </div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-[#B08D3C]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#5A3A10]/10 rounded-full blur-3xl"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#B08D3C]/20 p-8 md:p-10">
          {/* Back Button */}
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#B08D3C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Login</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B08D3C] to-[#C49D4C] flex items-center justify-center">
                <Send className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#5A3A10] mb-2"
            >
              Forgot Password?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              No worries! Enter your email and we'll send you reset instructions
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  className={`
                    w-full pl-12 pr-4 py-3.5
                    bg-white/50 backdrop-blur-sm
                    border-2 rounded-xl
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#B08D3C]/50
                    transition-all duration-300
                    ${
                      error
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#B08D3C]"
                    }
                  `}
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm mt-1 ml-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              className="
                w-full py-4 rounded-xl
                bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
                text-white font-semibold text-lg
                hover:shadow-xl hover:scale-[1.02]
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </motion.button>
          </form>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 p-4 bg-[#FFF8F0] rounded-xl"
          >
            <p className="text-sm text-gray-700">
              <strong className="text-[#B08D3C]">💡 Remember:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
              <li>Check your spam folder</li>
              <li>The link expires in 1 hour</li>
              <li>Use the link only once</li>
            </ul>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#B08D3C] hover:text-[#5A3A10] font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Need help?{" "}
          <Link
            href="/contact"
            className="text-[#B08D3C] hover:text-[#5A3A10] font-medium transition-colors"
          >
            Contact Support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}