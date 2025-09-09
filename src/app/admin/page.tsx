'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CalendarCheck, TrendingUp, UserCheck, BarChart2 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const attendanceData = [
  { name: 'يناير', attendance: 92 },
  { name: 'فبراير', attendance: 95 },
  { name: 'مارس', attendance: 93 },
  { name: 'أبريل', attendance: 96 },
  { name: 'مايو', attendance: 94 },
  { name: 'يونيو', attendance: 97 },
];

const enrollmentsData = [
    { month: 'يناير', new: 24, total: 240 },
    { month: 'فبراير', new: 18, total: 258 },
    { month: 'مارس', new: 32, total: 290 },
    { month: 'أبريل', new: 27, total: 317 },
    { month: 'مايو', new: 42, total: 359 },
    { month: 'يونيو', new: 35, total: 394 },
];

const recentActivities = [
  { name: 'ليام جونسون', class: 'الصف 5', activity: 'قدم مشروع "معرض العلوم"', date: 'منذ ساعتين', status: 'مكتمل' },
  { name: 'أوليفيا سميث', class: 'الصف 3', activity: 'تسجيل جديد', date: 'منذ يوم', status: 'جديد' },
  { name: 'نوح ويليامز', class: 'الصف 8', activity: 'غائب عن حصة "الرياضيات"', date: 'منذ يوم', status: 'غائب' },
  { name: 'إيما براون', class: 'الصف 5', activity: 'رسوم دراسية متأخرة', date: 'منذ يومين', status: 'متأخر' },
  { name: 'جيمس جونز', class: 'الصف 7', activity: 'قدم "مقال التاريخ"', date: 'منذ 3 أيام', status: 'مكتمل' },
];

const chartConfig = {
  attendance: {
    label: 'الحضور (%)',
    color: 'hsl(var(--accent))',
  },
  new: {
    label: 'التسجيلات الجديدة',
    color: 'hsl(var(--primary))',
  },
};

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
        <p className="text-muted-foreground">
          أهلاً بعودتك، {user?.username}! إليك ملخص لأنشطة مدرستك.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلاب</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+2.5% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعلمون</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">+1 منذ الربع الأخير</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفصول</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">تمت إضافة 3 أقسام جديدة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% من الأمس</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5"/>
              التسجيلات الجديدة
            </CardTitle>
            <CardDescription>التسجيلات الشهرية للطلاب الجدد.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={enrollmentsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Line type="monotone" dataKey="new" stroke="var(--color-new)" strokeWidth={3} dot={{ fill: "var(--color-new)", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5"/>
              الحضور الشهري
            </CardTitle>
            <CardDescription>متوسط معدل حضور الطلاب شهريًا.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} domain={[80, 100]} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
          <CardDescription>سجل بالأنشطة الطلابية والإدارية الأخيرة.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead className="hidden sm:table-cell">الفصل</TableHead>
                <TableHead>النشاط</TableHead>
                <TableHead className="hidden md:table-cell">التاريخ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{activity.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{activity.class}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell className="hidden md:table-cell">{activity.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={
                      activity.status === 'مكتمل' ? 'default' :
                      activity.status === 'جديد' ? 'secondary' :
                      activity.status === 'غائب' ? 'outline' :
                      'destructive'
                    }>
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

    