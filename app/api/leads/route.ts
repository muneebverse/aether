// app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';
import { generateOrderId } from '@/lib/order-id';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

export async function POST(request: Request) {
  console.log('🔵 POST /api/leads called');
  
  try {
    const formData = await request.formData();
    console.log('✅ FormData parsed');

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const whatsapp = formData.get('whatsapp')?.toString().trim();
    const service_interested = formData.get('service_interested')?.toString().trim();
    const instructions = formData.get('instructions')?.toString().trim() || null;
    const desired_date = formData.get('desired_date')?.toString() || null;
    const files = formData.getAll('files').filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    console.log('📦 Form data:', { name, email, whatsapp, service_interested, desired_date, filesCount: files.length });

    if (!name || !email || !whatsapp || !service_interested) {
      console.log('❌ Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Name, email, WhatsApp number, and service are required.' },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      console.log('❌ Too many files:', files.length);
      return NextResponse.json(
        { error: `Please attach at most ${MAX_FILES} files.` },
        { status: 400 }
      );
    }

    for (const f of files) {
      if (f.size > MAX_FILE_SIZE) {
        console.log('❌ File too large:', f.name, f.size);
        return NextResponse.json(
          { error: `"${f.name}" exceeds the 10MB limit.` },
          { status: 400 }
        );
      }
    }

    const is_urgent = desired_date
      ? (new Date(desired_date).getTime() - Date.now()) / 86400000 <= 5
      : false;

    console.log('🔌 Creating Supabase admin client');
    const supabase = createAdminClient();
    console.log('✅ Supabase client created');

    let lead = null;
    let lastError = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      const order_id = generateOrderId();
      console.log(`📝 Attempt ${attempt + 1}: Inserting order_id=${order_id}`);
      
      const { data, error } = await supabase
        .from('leads')
        .insert({ order_id, name, email, whatsapp, service_interested, instructions, desired_date, is_urgent })
        .select()
        .single();

      if (error) {
        console.error(`❌ Insert error on attempt ${attempt + 1}:`, error);
        if (error.code !== '23505') { 
          lastError = error; 
          break; 
        }
      } else {
        console.log('✅ Lead inserted:', data);
        lead = data;
        break;
      }

      lastError = error;
    }

    if (!lead) {
      console.error('❌ Failed to create lead after 5 attempts:', lastError);
      return NextResponse.json(
        { error: `Database error: ${lastError?.message || 'Unknown error'}` }, 
        { status: 500 }
      );
    }

    // Upload attachments now that we have the order_id to namespace by
    const file_urls: string[] = [];
    for (const file of files) {
      const path = `${lead.order_id}/${Date.now()}-${file.name}`;
      console.log(`📤 Uploading file: ${path}`);
      
      const { error: uploadError } = await supabase.storage
        .from('lead-attachments')
        .upload(path, file, { contentType: file.type });

      if (uploadError) {
        console.error('⚠️ File upload failed:', uploadError);
        continue; // one bad file shouldn't sink the whole submission
      }
      console.log('✅ File uploaded:', path);
      file_urls.push(path);
    }

    if (file_urls.length > 0) {
      console.log('📝 Updating lead with file_urls:', file_urls);
      await supabase.from('leads').update({ file_urls }).eq('id', lead.id);
    }

    console.log('📧 Sending notification email...');
    try {
      await sendLeadNotification({ ...lead, file_urls });
      console.log('✅ Notification sent');
    } catch (err) {
      console.error('⚠️ Notification failed (non-blocking):', err);
    }

    console.log('✅ SUCCESS - Returning order_id:', lead.order_id);
    return NextResponse.json({ order_id: lead.order_id });

  } catch (err) {
    console.error('💥 Unexpected error in POST /api/leads:', err);
    return NextResponse.json({ error: 'Server error. Check logs.' }, { status: 500 });
  }
}

async function sendLeadNotification(lead: {
  order_id: string; name: string; email: string; whatsapp: string;
  service_interested: string; instructions: string | null;
  desired_date: string | null; is_urgent: boolean; file_urls: string[];
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email notification.');
    return;
  }

  console.log('📨 Calling Resend API...');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AETHER <notifications@aethers.studio>',
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: `${lead.is_urgent ? '⚡ URGENT — ' : ''}New lead: ${lead.name} (${lead.order_id})`,
      html: `
        <h2>New request received</h2>
        <p><strong>Order ID:</strong> ${lead.order_id}</p>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
        <p><strong>Service:</strong> ${lead.service_interested}</p>
        <p><strong>Desired date:</strong> ${lead.desired_date || '—'}${lead.is_urgent ? ' (RUSH)' : ''}</p>
        <p><strong>Instructions:</strong> ${lead.instructions || '—'}</p>
        <p><strong>Files attached:</strong> ${lead.file_urls.length}</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error('⚠️ Resend API returned:', response.status, await response.text());
  } else {
    console.log('✅ Resend API success');
  }
}
