"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, Chrome } from "lucide-react";
import { signIn, signInWithGoogle } from "@/lib/supabase/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await signIn({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Login successful!");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error);
        setGoogleLoading(false);
      }
      // Note: User will be redirected to Google, so we don't stop loading here
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF5E6]">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/salon-bg.webp')] bg-cover bg-center opacity-80 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B08D3C]/20 via-transparent to-[#5A3A10]/20" />
      </div>
      

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-[#B08D3C]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#5A3A10]/10 rounded-full blur-3xl"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6 py-8 "
      >
        {/* Card */}
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#B08D3C]/20 p-8 md:p-10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            {/* <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B08D3C] to-[#C49D4C] flex items-center justify-center">
                <span className="text-3xl"></span>
              </div>
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#5A3A10] mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              Sign in to continue your beauty journey
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`
                    w-full pl-12 pr-4 py-3.5
                    bg-white/50 backdrop-blur-sm
                    border-2 rounded-xl
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#B08D3C]/50
                    transition-all duration-300
                    ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#B08D3C]"
                    }
                  `}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm mt-1 ml-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`
                    w-full pl-12 pr-12 py-3.5
                    bg-white/50 backdrop-blur-sm
                    border-2 rounded-xl
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#B08D3C]/50
                    transition-all duration-300
                    ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#B08D3C]"
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm mt-1 ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-right"
            >
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#B08D3C] hover:text-[#5A3A10] font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* Google Sign In */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="
              w-full py-3.5 rounded-xl
              bg-white border-2 border-gray-200
              text-gray-700 font-semibold
              hover:bg-gray-50 hover:border-gray-300
              hover:shadow-md
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center gap-3
            "
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Chrome className="w-5 h-5 text-[#4285F4]" />
                Continue with Google
              </>
            )}
          </motion.button>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-center space-y-2"
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

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}