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
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, Calculator, PieChart, BarChart3 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

const revenueData = [
    { month: "يناير", revenue: 45000 },
    { month: "فبراير", revenue: 52000 },
    { month: "مارس", revenue: 48000 },
    { month: "أبريل", revenue: 61000 },
    { month: "مايو", revenue: 58000 },
    { month: "يونيو", revenue: 67000 },
];

const financialOverviewData = [
  { name: 'يناير', income: 45000, expenses: 32000 },
  { name: 'فبراير', income: 52000, expenses: 38000 },
  { name: 'مارس', income: 48000, expenses: 35000 },
  { name: 'أبريل', income: 61000, expenses: 42000 },
  { name: 'مايو', income: 58000, expenses: 40000 },
  { name: 'يونيو', income: 67000, expenses: 45000 },
];

const upcomingPayments = [
    { day: "الإثنين", payments: [{type: 'tuition'}, {type: 'fee'}] },
    { day: "الثلاثاء", payments: [] },
    { day: "الأربعاء", payments: [{type: 'tuition'}] },
    { day: "الخميس", payments: [{type: 'fee'}] },
    { day: "الجمعة", payments: [{type: 'tuition'}, {type: 'fee'}] },
    { day: "السبت", payments: [] },
    { day: "الأحد", payments: [] },
]

const notifications = [
    { icon: DollarSign, text: "تم استلام دفعة رسوم جديدة بقيمة 2,500 ريال.", time: "منذ دقيقتين"},
    { icon: TrendingUp, text: "زيادة في الإيرادات الشهرية بنسبة 15%.", time: "منذ ساعة"},
    { icon: CreditCard, text: "فاتورة رقم #F-2024-001 في انتظار الدفع.", time: "منذ 4 ساعات"},
]

const chartConfig = {
  revenue: {
    label: 'الإيرادات',
    color: 'hsl(var(--finance-primary))',
  },
  income: {
    label: 'الدخل',
    color: 'hsl(var(--finance-primary))',
  },
  expenses: {
    label: 'المصروفات',
    color: 'hsl(var(--finance-accent))',
  }
};

const recentTransactions = [
  { id: 'TXN-001', description: 'رسوم دراسية - أحمد محمد', amount: 2500, type: 'income', date: '2024-01-15' },
  { id: 'TXN-002', description: 'راتب معلم - سارة أحمد', amount: 3500, type: 'expense', date: '2024-01-15' },
  { id: 'TXN-003', description: 'رسوم دراسية - فاطمة علي', amount: 2500, type: 'income', date: '2024-01-14' },
  { id: 'TXN-004', description: 'صيانة أجهزة الحاسوب', amount: 1200, type: 'expense', date: '2024-01-14' },
  { id: 'TXN-005', description: 'رسوم دراسية - محمد حسن', amount: 2500, type: 'income', date: '2024-01-13' },
];

export default function FinanceDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$371 ألف</div>
            <p className="text-xs text-muted-foreground">
              +15% من الشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المصروفات</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-$227 ألف</div>
            <p className="text-xs text-muted-foreground">
              +8% من الشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-2 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">صافي الربح هذا الشهر</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <div className="text-2xl font-bold mb-2">+$144 ألف</div>
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
            <CardTitle className="text-foreground">معدل التحصيل</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[250px] gap-4">
            <div className="relative h-32 w-32">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border) / 0.2)" strokeWidth="10"/>
                    <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="hsl(var(--finance-primary))" 
                        strokeWidth="10" 
                        strokeDasharray="282.6" 
                        strokeDashoffset={282.6 * (1 - 0.87)}
                        strokeLinecap='round'
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-bold">87%</span>
                     <span className="text-sm text-muted-foreground">محصل</span>
                </div>
            </div>
            <div className="flex justify-around w-full text-sm">
                <div className="text-center"><span className="text-muted-foreground">المطلوب</span> <br/> 371K</div>
                <div className="text-center"><span className="text-muted-foreground">محصل</span> <br/> 323K</div>
                <div className="text-center"><span className="text-muted-foreground">متبقي</span> <br/> 48K</div>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 lg:grid-cols-5">
         <Card className="lg:col-span-3 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">المدفوعات المتوقعة</CardTitle>
            <CardDescription>عرض المدفوعات المتوقعة هذا الأسبوع.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
                {['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'].map(d => <div key={d}>{d}</div>)}
             </div>
              <div className="grid grid-cols-7 gap-2">
                  {upcomingPayments.map((dayData, i) => (
                      <div key={i} className="h-16 rounded-md bg-background/50 border border-border/50 p-1.5 space-y-1">
                          {dayData.payments.map((payment, j) => (
                              <div key={j} className={`h-2 w-full rounded-full ${
                                  payment.type === 'tuition' ? 'bg-finance-primary' :
                                  payment.type === 'fee' ? 'bg-finance-accent' :
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
            <CardTitle className="text-foreground">مركز الإشعارات المالية</CardTitle>
            <CardDescription>تنبيهات وإجراءات النظام المالية الأخيرة.</CardDescription>
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

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground">المعاملات الأخيرة</CardTitle>
          <CardDescription>آخر المعاملات المالية المسجلة في النظام.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                      {transaction.type === 'income' ? 'دخل' : 'مصروف'}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </main>
  );
}
