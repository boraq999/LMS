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
import { ClipboardList, Clock, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


const homeworkData = [
  { name: 'مقالة التاريخ', course: 'التاريخ', dueDate: '2024-08-15', status: 'قادم' },
  { name: 'واجب الرياضيات', course: 'الرياضيات', dueDate: '2024-08-18', status: 'قادم' },
  { name: 'مشروع العلوم', course: 'العلوم', dueDate: '2024-08-22', status: 'قادم' },
  { name: 'عرض تقديمي', course: 'اللغة الإنجليزية', dueDate: '2024-08-12', status: 'تم التسليم' },
  { name: 'بحث الفنون', course: 'الفنون', dueDate: '2024-08-10', status: 'تم التسليم' },
  { name: 'واجب الجبر', course: 'الرياضيات', dueDate: '2024-08-05', status: 'متأخر' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'قادم':
      return <Badge variant="outline"><Clock className="ml-1 h-3 w-3" />{status}</Badge>;
    case 'تم التسليم':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="ml-1 h-3 w-3" />{status}</Badge>;
    case 'متأخر':
      return <Badge variant="destructive"><AlertTriangle className="ml-1 h-3 w-3" />{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const HomeworkTable = ({ assignments }: { assignments: typeof homeworkData }) => (
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead className="text-center">الواجب</TableHead>
            <TableHead className="text-center">المادة</TableHead>
            <TableHead className="text-center">تاريخ الاستحقاق</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="text-center">الإجراء</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {assignments.map((assignment, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium text-center">{assignment.name}</TableCell>
            <TableCell className="text-center">{assignment.course}</TableCell>
            <TableCell className="text-center">{assignment.dueDate}</TableCell>
            <TableCell className="text-center flex justify-center">{getStatusBadge(assignment.status)}</TableCell>
            <TableCell className="text-center">
                <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">تنزيل</span>
                </Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
);


export default function StudentHomeworkPage() {
    const upcoming = homeworkData.filter(h => h.status === 'قادم');
    const submitted = homeworkData.filter(h => h.status === 'تم التسليم');
    const overdue = homeworkData.filter(h => h.status === 'متأخر');

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الواجبات</h1>
        <p className="text-muted-foreground">
          عرض وإدارة جميع واجباتك وتكاليفك الدراسية.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            قائمة الواجبات
          </CardTitle>
          <CardDescription>
            تصفح واجباتك القادمة، المسلمة، والمتأخرة.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upcoming">قادمة ({upcoming.length})</TabsTrigger>
                    <TabsTrigger value="submitted">مسلمة ({submitted.length})</TabsTrigger>
                    <TabsTrigger value="overdue">متأخرة ({overdue.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <HomeworkTable assignments={upcoming} />
                </TabsContent>
                <TabsContent value="submitted">
                    <HomeworkTable assignments={submitted} />
                </TabsContent>
                <TabsContent value="overdue">
                    <HomeworkTable assignments={overdue} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
