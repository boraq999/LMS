'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  UserCheck,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

const attendanceData = {
  'يناير 2024': [
    { date: '2024-01-01', status: 'present', subject: 'الرياضيات', teacher: 'أ. محمد عبدالله' },
    { date: '2024-01-02', status: 'present', subject: 'العلوم', teacher: 'أ. فاطمة علي' },
    { date: '2024-01-03', status: 'present', subject: 'التاريخ', teacher: 'أ. أحمد خالد' },
    { date: '2024-01-04', status: 'late', subject: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين' },
    { date: '2024-01-05', status: 'absent', subject: 'الفنون', teacher: 'أ. نورة سالم' },
    { date: '2024-01-08', status: 'present', subject: 'الرياضيات', teacher: 'أ. محمد عبدالله' },
    { date: '2024-01-09', status: 'present', subject: 'العلوم', teacher: 'أ. فاطمة علي' },
    { date: '2024-01-10', status: 'present', subject: 'التاريخ', teacher: 'أ. أحمد خالد' },
    { date: '2024-01-11', status: 'present', subject: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين' },
    { date: '2024-01-12', status: 'present', subject: 'الفنون', teacher: 'أ. نورة سالم' },
  ],
  'فبراير 2024': [
    { date: '2024-02-01', status: 'present', subject: 'الرياضيات', teacher: 'أ. محمد عبدالله' },
    { date: '2024-02-02', status: 'present', subject: 'العلوم', teacher: 'أ. فاطمة علي' },
    { date: '2024-02-03', status: 'present', subject: 'التاريخ', teacher: 'أ. أحمد خالد' },
    { date: '2024-02-04', status: 'present', subject: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين' },
    { date: '2024-02-05', status: 'present', subject: 'الفنون', teacher: 'أ. نورة سالم' },
    { date: '2024-02-08', status: 'present', subject: 'الرياضيات', teacher: 'أ. محمد عبدالله' },
    { date: '2024-02-09', status: 'present', subject: 'العلوم', teacher: 'أ. فاطمة علي' },
    { date: '2024-02-10', status: 'present', subject: 'التاريخ', teacher: 'أ. أحمد خالد' },
    { date: '2024-02-11', status: 'late', subject: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين' },
    { date: '2024-02-12', status: 'present', subject: 'الفنون', teacher: 'أ. نورة سالم' },
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />حاضر</Badge>;
    case 'late':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black"><Clock className="ml-1 h-3 w-3" />متأخر</Badge>;
    case 'absent':
      return <Badge variant="destructive"><XCircle className="ml-1 h-3 w-3" />غائب</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'late':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'absent':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-500" />;
  }
};

export default function StudentAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(attendanceData)[0]);
  const monthData = attendanceData[selectedMonth as keyof typeof attendanceData];

  // حساب الإحصائيات
  const totalDays = monthData.length;
  const presentDays = monthData.filter(day => day.status === 'present').length;
  const lateDays = monthData.filter(day => day.status === 'late').length;
  const absentDays = monthData.filter(day => day.status === 'absent').length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الحضور والغياب</h1>
          <p className="text-muted-foreground">
            تتبع حضورك وغيابك الشهري مع الإحصائيات التفصيلية.
          </p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="اختر الشهر" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(attendanceData).map(month => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* إحصائيات الحضور */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate >= 95 ? 'حضور ممتاز' : attendanceRate >= 90 ? 'حضور جيد' : 'يحتاج تحسين'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أيام الحضور</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentDays}</div>
            <p className="text-xs text-muted-foreground">من أصل {totalDays} يوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أيام التأخير</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lateDays}</div>
            <p className="text-xs text-muted-foreground">
              {lateDays > 3 ? 'يحتاج انتباه' : 'مقبول'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أيام الغياب</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentDays}</div>
            <p className="text-xs text-muted-foreground">
              {absentDays > 2 ? 'يحتاج تحسين' : 'ممتاز'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* جدول الحضور التفصيلي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            سجل الحضور الشهري - {selectedMonth}
          </CardTitle>
          <CardDescription>
            عرض تفصيلي لحضورك وغيابك مع أسماء المواد والمعلمين.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">المادة</TableHead>
                <TableHead className="text-center">المعلم</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-center">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthData.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center font-medium">
                    {new Date(day.date).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell className="text-center">{day.subject}</TableCell>
                  <TableCell className="text-center">{day.teacher}</TableCell>
                  <TableCell className="text-center flex justify-center">
                    {getStatusBadge(day.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    {day.status === 'absent' && (
                      <Button variant="outline" size="sm">
                        تقديم عذر
                      </Button>
                    )}
                    {day.status === 'late' && (
                      <Button variant="outline" size="sm">
                        تفاصيل التأخير
                      </Button>
                    )}
                    {day.status === 'present' && (
                      <span className="text-green-600 text-sm">ممتاز</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* رسوم بيانية للحضور */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              إحصائيات الحضور
            </CardTitle>
            <CardDescription>
              توزيع أيام الحضور والغياب والتأخير.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>الحضور</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{presentDays}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(presentDays/totalDays)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>التأخير</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{lateDays}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(lateDays/totalDays)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>الغياب</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{absentDays}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(absentDays/totalDays)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              نصائح للحضور المثالي
            </CardTitle>
            <CardDescription>
              نصائح لتحسين معدل الحضور.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {attendanceRate >= 95 ? (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 text-sm">🎉 ممتاز! معدل حضورك عالي جداً. استمر في هذا الأداء المتميز.</p>
              </div>
            ) : attendanceRate >= 90 ? (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">👍 جيد! معدل حضورك جيد، لكن يمكن تحسينه أكثر.</p>
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 text-sm">⚠️ يحتاج تحسين! راجع أسباب الغياب وحاول الحضور بانتظام.</p>
              </div>
            )}
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• استيقظ مبكراً لتجنب التأخير</p>
              <p>• حضّر حقيبتك المدرسية مساءً</p>
              <p>• راجع الجدول الدراسي يومياً</p>
              <p>• تواصل مع المعلمين عند الحاجة</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
