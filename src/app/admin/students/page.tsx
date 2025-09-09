'use client';

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const studentsData = [
  { id: 'STU-001', name: 'ليام جونسون', grade: 'الصف 5', enrollmentDate: '2023-01-15', subscription: { status: 'paid', amountDue: 0 } },
  { id: 'STU-002', name: 'أوليفيا سميث', grade: 'الصف 3', enrollmentDate: '2023-02-20', subscription: { status: 'unpaid', amountDue: 500 } },
  { id: 'STU-003', name: 'نوح ويليامز', grade: 'الصف 8', enrollmentDate: '2020-09-01', subscription: { status: 'paid', amountDue: 0 } },
  { id: 'STU-004', name: 'إيما براون', grade: 'الصف 5', enrollmentDate: '2022-08-10', subscription: { status: 'partial', amountDue: 150 } },
  { id: 'STU-005', name: 'جيمس جونز', grade: 'الصف 7', enrollmentDate: '2021-09-05', subscription: { status: 'paid', amountDue: 0 } },
  { id: 'STU-006', name: 'صوفيا ديفيس', grade: 'الصف 6', enrollmentDate: '2022-09-01', subscription: { status: 'paid', amountDue: 0 } },
  { id: 'STU-007', name: 'بنجامين ميلر', grade: 'الصف 4', enrollmentDate: '2023-09-01', subscription: { status: 'unpaid', amountDue: 500 } },
  { id: 'STU-008', name: 'إيزابيلا ويلسون', grade: 'الصف 9', enrollmentDate: '2019-09-01', subscription: { status: 'paid', amountDue: 0 } },
  { id: 'STU-009', name: 'إيثان مور', grade: 'الصف 2', enrollmentDate: '2024-01-20', subscription: { status: 'partial', amountDue: 250 } },
  { id: 'STU-010', name: 'ميا تايلور', grade: 'الصف 7', enrollmentDate: '2021-10-11', subscription: { status: 'unpaid', amountDue: 500 } },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubscriptionBadge = (subscription: { status: 'paid' | 'unpaid' | 'partial'; amountDue: number }) => {
    switch (subscription.status) {
      case 'paid':
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="ml-1 h-4 w-4" />
            مدفوع
          </Badge>
        );
      case 'unpaid':
        return (
          <Badge variant="destructive">
            <XCircle className="ml-1 h-4 w-4" />
            غير مدفوع
          </Badge>
        );
      case 'partial':
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600">
            <AlertCircle className="ml-1 h-4 w-4" />
            متبقي: {subscription.amountDue} د.ل
          </Badge>
        );
      default:
        return <Badge>{subscription.status}</Badge>;
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الطلاب</h1>
          <p className="text-muted-foreground">
            إدارة طلاب مدرستك وعرض معلوماتهم.
          </p>
        </div>
        <Button size="lg">
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة طالب
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>قائمة الطلاب</CardTitle>
              <CardDescription>
                قائمة شاملة بجميع الطلاب المسجلين حاليًا وسابقًا.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن الطلاب..."
                className="w-full rounded-lg bg-input pr-8 sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطالب</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>الصف</TableHead>
                <TableHead className="hidden md:table-cell">تاريخ التسجيل</TableHead>
                <TableHead className="text-left">حالة الاشتراك</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="font-medium text-primary">{student.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{student.name}</div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.enrollmentDate}</TableCell>
                  <TableCell className="text-left">
                    {getSubscriptionBadge(student.subscription)}
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
