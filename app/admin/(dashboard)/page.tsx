import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Inbox, Clock, Loader2, CheckCircle2, Plus } from 'lucide-react';
import MiniAreaChart from '@/components/admin/MiniAreaChart';
import MiniBarChart from '@/components/admin/MiniBarChart';

export const revalidate = 0;

const STATUS_LABEL: Record<string, string> = {
  received: 'Received',
  in_progress: 'In Progress',
  completed: 'Completed',
};

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from('leads')
    .select('id, status, created_at')
    .order('created_at', { ascending: false });

  const allLeads = leads || [];

  const totalLeads = allLeads.length;
  const byStatus = { received: 0, in_progress: 0, completed: 0 } as Record<string, number>;
  for (const l of allLeads) {
    if (l.status in byStatus) byStatus[l.status]++;
  }

  const weekStart = daysAgo(7);
  const prevWeekStart = daysAgo(14);
  const leadsThisWeek = allLeads.filter((l) => new Date(l.created_at) >= weekStart).length;
  const leadsLastWeek = allLeads.filter(
    (l) => new Date(l.created_at) >= prevWeekStart && new Date(l.created_at) < weekStart
  ).length;
  const weekChange = leadsLastWeek === 0
    ? (leadsThisWeek > 0 ? 100 : 0)
    : Math.round(((leadsThisWeek - leadsLastWeek) / leadsLastWeek) * 100);

  // Leads per day, last 14 days — feeds the area chart
  const chartData = Array.from({ length: 14 }, (_, i) => {
    const day = daysAgo(13 - i);
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    const count = allLeads.filter((l) => {
      const created = new Date(l.created_at);
      return created >= day && created < nextDay;
    }).length;
    return {
      label: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: count,
    };
  });

  const statusChartData = [
    { label: 'Received', value: byStatus.received, color: '#00BCD4' },
    { label: 'In Progress', value: byStatus.in_progress, color: '#4DD0E1' },
    { label: 'Completed', value: byStatus.completed, color: '#0097A7' },
  ];

  const recentLeads = allLeads.slice(0, 5);

  const statCards = [
    {
      label: 'Total Leads',
      value: totalLeads,
      icon: Inbox,
      change: weekChange,
      changeLabel: 'vs last 7 days',
    },
    {
      label: 'Received',
      value: byStatus.received,
      icon: Clock,
    },
    {
      label: 'In Progress',
      value: byStatus.in_progress,
      icon: Loader2,
    },
    {
      label: 'Completed',
      value: byStatus.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-display font-bold text-aether-deep-teal">Dashboard</h1>
          <p className="text-sm text-deep-ink text-opacity-60">Leads overview, based on live data</p>
        </div>
        <Link
          href="/admin/leads"
          className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline"
        >
          View all leads →
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-5">
              <div className="w-11 h-11 rounded-lg bg-aether-electric-teal bg-opacity-10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-aether-electric-teal" />
              </div>
              <div className="text-2xl font-bold text-deep-ink">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-deep-ink text-opacity-60">{stat.label}</span>
                {stat.change !== undefined && (
                  <span className={`text-xs font-semibold ${stat.change >= 0 ? 'text-success' : 'text-alert'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-5">
          <h2 className="font-display font-bold text-aether-deep-teal mb-4">Leads, Last 14 Days</h2>
          <MiniAreaChart data={chartData} />
        </div>
        <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-5">
          <h2 className="font-display font-bold text-aether-deep-teal mb-4">Leads by Status</h2>
          <MiniBarChart data={statusChartData} />
        </div>
      </div>

      {/* Recent leads + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-aether-electric-teal border-opacity-10">
            <h2 className="font-display font-bold text-aether-deep-teal">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-aether-electric-teal hover:underline">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-neutral p-5">No leads yet.</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {recentLeads.map((l: any) => (
                  <tr key={l.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0">
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${l.id}`} className="font-medium text-deep-ink hover:text-aether-electric-teal">
                        Lead #{l.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-deep-ink text-opacity-60">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        l.status === 'completed' ? 'bg-green-100 text-green-800'
                        : l.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                        {STATUS_LABEL[l.status] || l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl p-5">
          <h2 className="font-display font-bold text-aether-deep-teal mb-4 flex items-center gap-2">
            <Plus size={18} /> Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: 'New Service', href: '/admin/services/new' },
              { label: 'New Pricing Tier', href: '/admin/pricing/new' },
              { label: 'New Blog Post', href: '/admin/posts/new' },
              { label: 'New Portfolio Project', href: '/admin/portfolio/new' },
              { label: 'New Resource', href: '/admin/resources/new' },
              { label: 'New Restaurant Project', href: '/admin/restaurant-samples/new' },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-deep-ink hover:bg-aether-electric-teal hover:bg-opacity-10 hover:text-aether-electric-teal transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
