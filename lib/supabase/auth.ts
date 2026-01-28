// import { supabase } from './client';

// export interface SignUpData {
//   email: string;
//   password: string;
//   fullName: string;
//   phone?: string;
// }

// export interface SignInData {
//   email: string;
//   password: string;
// }

// // Sign up with email and password
// export async function signUp({ email, password, fullName, phone }: SignUpData) {
//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${window.location.origin}/auth/callback`,
//         data: {
//           full_name: fullName,
//           phone: phone || null,
//         },
//       },
//     });

//     if (error) throw error;

//     // Create profile entry
//     if (data.user) {
//       const { error: profileError } = await supabase.from('profiles').insert({
//         id: data.user.id,
//         full_name: fullName,
//         email: email,
//         phone: phone || null,
//         role: 'user',
//         is_active: true,
//       });

//       if (profileError) {
//         console.error('Profile creation error:', profileError);
//       }
//     }

//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Sign in with email and password
// export async function signIn({ email, password }: SignInData) {
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Sign in with Google
// export async function signInWithGoogle() {
//   try {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//         queryParams: {
//           access_type: 'offline',
//           prompt: 'consent',
//         },
//       },
//     });

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Sign out
// export async function signOut() {
//   try {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//     return { error: null };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

// // Verify OTP
// export async function verifyOTP(email: string, token: string) {
//   try {
//     const { data, error } = await supabase.auth.verifyOtp({
//       email,
//       token,
//       type: 'email',
//     });

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Resend OTP
// export async function resendOTP(email: string) {
//   try {
//     const { error } = await supabase.auth.resend({
//       type: 'signup',
//       email,
//     });

//     if (error) throw error;
//     return { error: null };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

// // Send password reset email
// export async function sendPasswordResetEmail(email: string) {
//   try {
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: `${window.location.origin}/auth/reset-password`,
//     });

//     if (error) throw error;
//     return { error: null };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

// // Update password
// export async function updatePassword(newPassword: string) {
//   try {
//     const { error } = await supabase.auth.updateUser({
//       password: newPassword,
//     });

//     if (error) throw error;
//     return { error: null };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

// // Get current user
// export async function getCurrentUser() {
//   try {
//     const { data: { user }, error } = await supabase.auth.getUser();
//     if (error) throw error;
//     return { user, error: null };
//   } catch (error: any) {
//     return { user: null, error: error.message };
//   }
// }

// // Get user profile
// export async function getUserProfile(userId: string) {
//   try {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .single();

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }




import { supabase } from './client';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Sign up with email and password
// export async function signUp({ email, password, fullName, phone }: SignUpData) {
//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${window.location.origin}/auth/callback`,
//         data: {
//           full_name: fullName,
//           phone: phone || null,
//         },
//       },
//     });

//     if (error) throw error;

//     // Create profile entry
//     if (data.user) {
//       const { error: profileError } = await supabase.from('profiles').insert({
//         id: data.user.id,
//         full_name: fullName,
//         email: email,
//         phone: phone || null,
//         role: 'user',
//         is_active: true,
//       });

//       if (profileError) {
//         console.error('Profile creation error:', profileError);
//       }
//     }

//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

export async function signUp({ email, password, fullName, phone }: SignUpData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          name: fullName, // Fallback
          phone: phone || null,
        },
      },
    });

    if (error) throw error;

    // Don't manually create profile - let trigger handle it
    // But verify it was created
    if (data.user) {
      // Wait a moment for trigger to execute
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        console.error('Profile verification failed:', profileError);
      } else {
        console.log('Profile created successfully:', profile);
      }
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Sign in with email and password
export async function signIn({ email, password }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Verify OTP
export async function verifyOTP(email: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Resend OTP
export async function resendOTP(email: string) {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Update password
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}