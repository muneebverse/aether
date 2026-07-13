import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const order_id = searchParams.get('order_id')?.trim().toUpperCase()

  if (!order_id) {
    return NextResponse.json(
      { error: 'Order ID is required.' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('leads')
    .select('status, updated_at, service_interested')
    .eq('order_id', order_id)
    .maybeSingle()

  if (error) {
    console.error('Track lookup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { error: 'No order found with that ID. Please check and try again.' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}