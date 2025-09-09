'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CalendarCheck, TrendingUp, UserCheck, BarChart2 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const attendanceData = [
  { name: 'Jan', attendance: 92 },
  { name: 'Feb', attendance: 95 },
  { name: 'Mar', attendance: 93 },
  { name: 'Apr', attendance: 96 },
  { name: 'May', attendance: 94 },
  { name: 'Jun', attendance: 97 },
];

const enrollmentsData = [
    { month: 'Jan', new: 24, total: 240 },
    { month: 'Feb', new: 18, total: 258 },
    { month: 'Mar', new: 32, total: 290 },
    { month: 'Apr', new: 27, total: 317 },
    { month: 'May', new: 42, total: 359 },
    { month: 'Jun', new: 35, total: 394 },
];

const recentActivities = [
  { name: 'Liam Johnson', class: 'Grade 5', activity: 'Submitted "Science Fair" project', date: '2 hours ago', status: 'Completed' },
  { name: 'Olivia Smith', class: 'Grade 3', activity: 'New enrollment', date: '1 day ago', status: 'New' },
  { name: 'Noah Williams', class: 'Grade 8', activity: 'Absent for "Mathematics"', date: '1 day ago', status: 'Absent' },
  { name: 'Emma Brown', class: 'Grade 5', activity: 'Fee payment overdue', date: '2 days ago', status: 'Overdue' },
  { name: 'James Jones', class: 'Grade 7', activity: 'Submitted "History Essay"', date: '3 days ago', status: 'Completed' },
];

const chartConfig = {
  attendance: {
    label: 'Attendance (%)',
    color: 'hsl(var(--accent))',
  },
  new: {
    label: 'New Enrollments',
    color: 'hsl(var(--primary))',
  },
};

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}! Here's a summary of your school's activities.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">+1 since last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">3 new sections added</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5"/>
              New Enrollments
            </CardTitle>
            <CardDescription>Monthly new student enrollments.</CardDescription>
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
              Monthly Attendance
            </CardTitle>
            <CardDescription>Average student attendance rate per month.</CardDescription>
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
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>A log of recent student and administrative activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Class</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
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
                      activity.status === 'Completed' ? 'default' :
                      activity.status === 'New' ? 'secondary' :
                      activity.status === 'Absent' ? 'outline' :
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
