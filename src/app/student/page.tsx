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
import { BookOpen, Clock, CalendarCheck, FileText, Percent, Info, Bell, TrendingUp, Users, Award, MessageSquare, Library, BarChart3 } from 'lucide-react';

const currentCourses = [
  { name: 'الرياضيات', teacher: 'أ. محمد عبدالله', grade: '94%', attendance: '100%' },
  { name: 'العلوم', teacher: 'أ. فاطمة علي', grade: '91%', attendance: '98%' },
  { name: 'التاريخ', teacher: 'أ. أحمد خالد', grade: '96%', attendance: '100%' },
  { name: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين', grade: '89%', attendance: '95%' },
  { name: 'الفنون', teacher: 'أ. نورة سالم', grade: '97%', attendance: '100%' },
  { name: 'التربية البدنية', teacher: 'أ. علي حسن', grade: '98%', attendance: '100%' },
];

const upcomingAssignments = [
  { name: 'مقالة التاريخ', course: 'التاريخ', dueDate: '2024-08-15', status: 'قادم' },
  { name: 'واجب الرياضيات', course: 'الرياضيات', dueDate: '2024-08-18', status: 'قادم' },
  { name: 'مشروع العلوم', course: 'العلوم', dueDate: '2024-08-22', status: 'قادم' },
  { name: 'عرض تقديمي بالإنجليزية', course: 'اللغة الإنجليزية', dueDate: '2024-08-20', status: 'قادم' },
  { name: 'لوحة فنية', course: 'الفنون', dueDate: '2024-08-25', status: 'قادم' },
];

const recentAnnouncements = [
    { title: 'تذكير بالامتحان النصفي', date: 'منذ يوم واحد', content: 'لا تنسوا الامتحان النصفي لمادة الرياضيات يوم الأربعاء القادم.'},
    { title: 'تغيير في الجدول الدراسي', date: 'منذ يومين', content: 'تم تبديل حصة الفنون بحصة التربية البدنية ليوم الخميس.'},
    { title: 'رحلة ميدانية قادمة', date: 'منذ 4 أيام', content: 'سيتم تنظيم رحلة إلى المتحف الوطني الأسبوع المقبل، سجل الآن!'},
    { title: 'ورشة عمل جديدة', date: 'منذ أسبوع', content: 'ورشة عمل حول البرمجة والذكاء الاصطناعي للطلاب المتفوقين.'},
    { title: 'تحديث النظام', date: 'منذ أسبوعين', content: 'تم تحديث نظام إدارة المدارس بميزات جديدة للطلاب.'},
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
        <p className="text-muted-foreground">
          أهلاً بعودتك، {user?.username}! إليك ملخص لأنشطتك الدراسية.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المواد الحالية</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">مواد مسجلة للفصل الحالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">حضور ممتاز هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعدل التراكمي</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">تحسن بنسبة 2.1% عن الفصل الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الواجبات القادمة</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">واجبات مستحقة هذا الأسبوع</p>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات إضافية */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الرسائل الجديدة</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">رسائل غير مقروءة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الامتحانات القادمة</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">امتحانات هذا الأسبوع</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأنشطة المشاركة</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">أنشطة مسجلة هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإنجازات</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">شهادات وجوائز حصلت عليها</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>المواد الدراسية الحالية</CardTitle>
            <CardDescription>نظرة عامة على أدائك في المواد المسجلة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المادة</TableHead>
                  <TableHead>المعلم</TableHead>
                  <TableHead>الدرجة الحالية</TableHead>
                  <TableHead className="text-left">الحضور</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell>
                      <Badge variant={parseInt(course.grade) >= 90 ? 'default' : 'secondary'}>{course.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-left">{course.attendance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle>الإعلانات الأخيرة</CardTitle>
            <CardDescription>آخر الأخبار والتحديثات من المدرسة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((ann, index) => (
                 <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Info className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{ann.title}</p>
                        <p className="text-sm text-muted-foreground">{ann.content}</p>
                        <p className="text-xs text-muted-foreground/80">{ann.date}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>الواجبات والتكاليف القادمة</CardTitle>
          <CardDescription>قائمة بالواجبات التي يجب تسليمها قريبًا.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الواجب</TableHead>
                <TableHead>المادة</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAssignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{assignment.name}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell className="text-left">
                    <Badge variant="outline" className="flex w-fit items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {assignment.status}
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
