// // app/api/payment/create-order/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import Razorpay from 'razorpay';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// // Initialize Supabase Admin Client (bypasses RLS)
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { amount, currency = 'INR', receipt, notes, orderId } = body;

//     // Validate amount
//     if (!amount || amount <= 0) {
//       return NextResponse.json(
//         { error: 'Invalid amount' },
//         { status: 400 }
//       );
//     }

//     // Create Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency,
//       receipt: receipt || `order_${orderId}`,
//       notes: notes || {},
//     });

//     // Update the order in database with Razorpay order ID
//     if (orderId) {
//       const { error } = await supabaseAdmin
//         .from('orders')
//         .update({
//           razorpay_order_id: razorpayOrder.id,
//         })
//         .eq('id', orderId);

//       if (error) {
//         console.error('Error updating order:', error);
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error: any) {
//     console.error('Error creating Razorpay order:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }



// app/api/payment/create-order/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Supabase Admin Client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper: generate Razorpay-safe receipt (≤ 40 chars)
function generateReceipt(orderId?: string) {
  if (!orderId) {
    return `rcpt_${Date.now()}`;
  }

  // Hash orderId → fixed length
  const hash = crypto
    .createHash('sha256')
    .update(orderId)
    .digest('hex')
    .slice(0, 20);

  return `rcpt_${hash}`; // always < 40 chars
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', notes, orderId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt: generateReceipt(orderId),
      notes: notes || {},
    });

    // Store Razorpay order id in DB
    if (orderId) {
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ razorpay_order_id: razorpayOrder.id })
        .eq('id', orderId);

      if (error) {
        console.error('Supabase update error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error?.error?.description || 'Failed to create order' },
      { status: 500 }
    );
  }
}
