"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { updatePassword } from "@/lib/supabase/auth";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await updatePassword(formData.password);

      if (error) {
        toast.error(error);
        return;
      }

      setSuccess(true);
      toast.success("Password reset successful!");

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2)
      return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 3)
      return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF5E6] p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#B08D3C]/20 p-10 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#5A3A10] mb-4">
            Password Reset Successfully! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been changed. You can now sign in with your new
            password.
          </p>

          <div className="bg-[#FFF8F0] rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">
              Redirecting to login in <strong>3 seconds</strong>...
            </p>
          </div>

          <Link
            href="/auth/login"
            className="
              inline-block px-8 py-3
              bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
              text-white font-semibold rounded-full
              hover:shadow-lg hover:scale-[1.02]
              transition-all duration-300
            "
          >
            Go to Login Now
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF5E6] p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/salon-bg.jpg')] bg-cover bg-center opacity-10 blur-sm" />
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
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B08D3C] to-[#C49D4C] flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#5A3A10] mb-2"
            >
              Reset Password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              Create a new strong password for your account
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">
                      Password Strength
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        passwordStrength.label === "Weak"
                          ? "text-red-600"
                          : passwordStrength.label === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.strength}%` }}
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              )}

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

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className={`
                    w-full pl-12 pr-12 py-3.5
                    bg-white/50 backdrop-blur-sm
                    border-2 rounded-xl
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#B08D3C]/50
                    transition-all duration-300
                    ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#B08D3C]"
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm mt-1 ml-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              type="submit"
              disabled={loading}
              className="
                w-full py-4 rounded-xl mt-6
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
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </motion.button>
          </form>

          {/* Password Requirements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-[#FFF8F0] rounded-xl"
          >
            <p className="text-sm font-semibold text-[#B08D3C] mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-[#B08D3C]">✓</span>
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B08D3C]">✓</span>
                Contains uppercase and lowercase letters
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B08D3C]">✓</span>
                Contains at least one number
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B08D3C]">✓</span>
                Special characters recommended
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-[#B08D3C] hover:text-[#5A3A10] font-medium transition-colors"
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}