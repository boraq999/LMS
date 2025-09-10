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
import { BookOpen, Users, Bell, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const upcomingClasses = [
  { name: 'الرياضيات - الصف 5-أ', time: '10:00 صباحًا', room: 'غرفة 101' },
  { name: 'الرياضيات - الصف 5-ب', time: '11:00 صباحًا', room: 'غرفة 102' },
  { name: 'الرياضيات - الصف 6-أ', time: '01:00 ظهرًا', room: 'غرفة 101' },
];

const recentSubmissions = [
  { student: 'ليام جونسون', assignment: 'واجب الجبر', class: 'الصف 5-أ', submitted: 'منذ ساعة' },
  { student: 'إيما براون', assignment: 'واجب الجبر', class: 'الصف 5-ب', submitted: 'منذ 3 ساعات' },
  { student: 'صوفيا ديفيس', assignment: 'مشروع الأشكال الهندسية', class: 'الصف 6-أ', submitted: 'منذ يوم' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">لوحة تحكم المعلم</h1>
        <p className="text-muted-foreground">
          أهلاً بعودتك، {user?.username}! إليك نظرة سريعة على يومك.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">فصول اليوم</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">حصص دراسية مجدولة لهذا اليوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلاب</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">طالبًا في جميع فصولك</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إشعارات جديدة</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">إشعارات غير مقروءة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رسائل أولياء الأمور</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">رسائل جديدة تنتظر الرد</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>الحصص القادمة</CardTitle>
            <CardDescription>جدول حصصك الدراسية لهذا اليوم.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الفصل</TableHead>
                  <TableHead>الوقت</TableHead>
                  <TableHead>الغرفة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingClasses.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.room}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>آخر التسليمات</CardTitle>
             <CardDescription>أحدث الواجبات التي سلمها طلابك.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-center">
                  <div className="ml-4 flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{submission.student}</p>
                    <p className="text-sm text-muted-foreground">
                      سلم واجب "{submission.assignment}" - {submission.class}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{submission.submitted}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
