'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip } from 'recharts';
import { Users, UserCheck, Activity, DollarSign, Calendar, Bell, UserPlus } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

const revenueData = [
    { month: "يناير", revenue: 12000 },
    { month: "فبراير", revenue: 18000 },
    { month: "مارس", revenue: 15000 },
    { month: "أبريل", revenue: 22000 },
    { month: "مايو", revenue: 25000 },
    { month: "يونيو", revenue: 30000 },
];

const financialOverviewData = [
  { name: 'يناير', income: 4000, expenses: 2400 },
  { name: 'فبراير', income: 3000, expenses: 1398 },
  { name: 'مارس', income: 2000, expenses: 9800 },
  { name: 'أبريل', income: 2780, expenses: 3908 },
  { name: 'مايو', income: 1890, expenses: 4800 },
  { name: 'يونيو', income: 2390, expenses: 3800 },
];

const upcomingEvents = [
    { day: "الإثنين", events: [{type: 'event'}, {type: 'holiday'}] },
    { day: "الثلاثاء", events: [] },
    { day: "الأربعاء", events: [{type: 'event'}] },
    { day: "الخميس", events: [] },
    { day: "الجمعة", events: [{type: 'exam'}] },
    { day: "السبت", events: [] },
    { day: "الأحد", events: [] },
]

const notifications = [
    { icon: UserPlus, text: "تم تسجيل طالب جديد في الصف الخامس.", time: "منذ دقيقتين"},
    { icon: Activity, text: "طلب إجازة من (ج. سميث) يتطلب الموافقة.", time: "منذ ساعة"},
    { icon: DollarSign, text: "تم دفع الفاتورة رقم #1234.", time: "منذ 4 ساعات"},
]

const chartConfig = {
  revenue: {
    label: 'الإيرادات',
    color: 'hsl(var(--super-admin-primary))',
  },
  income: {
    label: 'الدخل',
    color: 'hsl(var(--super-admin-primary))',
  },
  expenses: {
    label: 'المصروفات',
    color: 'hsl(var(--super-admin-accent))',
  }
};


export default function SuperAdminDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الطلاب</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">أعضاء هيئة التدريس</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
          </CardContent>
        </Card>
        <Card className="col-span-2 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">إيرادات هذا الشهر</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <div className="text-2xl font-bold mb-2">+$150 ألف</div>
                <ChartContainer config={chartConfig} className="h-10 w-full">
                    <AreaChart
                        data={revenueData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                indicator='dot'
                                hideLabel
                                formatter={(value, name) => (
                                    <div className="flex flex-col">
                                        <span className='text-muted-foreground'>{name}</span>
                                        <span className='font-bold'>${Number(value).toLocaleString()}</span>
                                    </div>
                                )}/>}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">نظرة عامة على المالية</CardTitle>
            <CardDescription>الدخل مقابل المصروفات</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={financialOverviewData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={6}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.1)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke='hsl(var(--muted-foreground))'/>
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke='hsl(var(--muted-foreground))' />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">الحضور في الوقت الفعلي</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[250px] gap-4">
            <div className="relative h-32 w-32">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border) / 0.2)" strokeWidth="10"/>
                    <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="hsl(var(--super-admin-primary))" 
                        strokeWidth="10" 
                        strokeDasharray="282.6" 
                        strokeDashoffset={282.6 * (1 - 0.92)}
                        strokeLinecap='round'
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-bold">92%</span>
                     <span className="text-sm text-muted-foreground">حاضر</span>
                </div>
            </div>
            <div className="flex justify-around w-full text-sm">
                <div className="text-center"><span className="text-muted-foreground">الإجمالي</span> <br/> 1250</div>
                <div className="text-center"><span className="text-muted-foreground">حاضر</span> <br/> 1150</div>
                <div className="text-center"><span className="text-muted-foreground">غائب</span> <br/> 100</div>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 lg:grid-cols-5">
         <Card className="lg:col-span-3 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">الأحداث القادمة</CardTitle>
            <CardDescription>عرض تقويم أحداث المدرسة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
                {['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'].map(d => <div key={d}>{d}</div>)}
             </div>
              <div className="grid grid-cols-7 gap-2">
                  {upcomingEvents.map((dayData, i) => (
                      <div key={i} className="h-16 rounded-md bg-background/50 border border-border/50 p-1.5 space-y-1">
                          {dayData.events.map((event, j) => (
                              <div key={j} className={`h-2 w-full rounded-full ${
                                  event.type === 'event' ? 'bg-super-admin-primary' :
                                  event.type === 'holiday' ? 'bg-super-admin-accent' :
                                  'bg-yellow-500'
                              }`}></div>
                          ))}
                      </div>
                  ))}
              </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 border-border/50 bg-card/80 backdrop-blur-sm">
           <CardHeader>
            <CardTitle className="text-foreground">مركز الإشعارات</CardTitle>
            <CardDescription>تنبيهات وإجراءات النظام الأخيرة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notif, index) => (
                 <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <notif.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm">{notif.text}</p>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
