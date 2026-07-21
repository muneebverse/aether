import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order_id = searchParams.get('order_id')?.trim().toUpperCase();

  if (!order_id) {
    return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('leads')
    .select('status, updated_at, service_interested')
    .eq('order_id', order_id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'No matching order found. Double-check your code.' }, { status: 404 });
  }

  return NextResponse.json(data);
}
