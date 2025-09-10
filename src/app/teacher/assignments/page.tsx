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
import { PlusCircle, Search, Clock, FileCheck2, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const assignmentsData = [
  { id: 'ASG-001', name: 'واجب الجبر', class: 'الصف 5-أ', dueDate: '2024-08-15', status: 'قادم', submissions: 20, totalStudents: 28 },
  { id: 'ASG-002', name: 'مشروع الأشكال الهندسية', class: 'الصف 6-أ', dueDate: '2024-08-20', status: 'قادم', submissions: 15, totalStudents: 30 },
  { id: 'ASG-003', name: 'مقال عن نيوتن', class: 'الصف 5-ب', dueDate: '2024-08-10', status: 'تم التقييم', submissions: 25, totalStudents: 25 },
  { id: 'ASG-004', name: 'مسائل التفاضل', class: 'الصف 6-ب', dueDate: '2024-08-05', status: 'متأخر', submissions: 18, totalStudents: 22 },
  { id: 'ASG-005', name: 'واجب الاحتمالات', class: 'الصف 6-أ', dueDate: '2024-08-25', status: 'قادم', submissions: 0, totalStudents: 30 },
];

export default function TeacherAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssignments = assignmentsData.filter(assignment =>
    assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'قادم':
        return <Badge variant="outline"><Clock className="ml-1 h-3 w-3" />{status}</Badge>;
      case 'تم التقييم':
        return <Badge className="bg-green-500 hover:bg-green-600"><FileCheck2 className="ml-1 h-3 w-3" />{status}</Badge>;
      case 'متأخر':
        return <Badge variant="destructive"><AlertTriangle className="ml-1 h-3 w-3" />{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الواجبات</h1>
          <p className="text-muted-foreground">
            إدارة وإنشاء الواجبات لفصولك.
          </p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إنشاء واجب
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>قائمة الواجبات</CardTitle>
              <CardDescription>
                عرض جميع الواجبات التي تم إنشاؤها لفصولك.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن الواجبات..."
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
                <TableHead>الواجب</TableHead>
                <TableHead className="hidden sm:table-cell">الفصل</TableHead>
                <TableHead className="hidden md:table-cell">تاريخ الاستحقاق</TableHead>
                <TableHead className="hidden md:table-cell text-center">التسليمات</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{assignment.class}</TableCell>
                    <TableCell className="hidden md:table-cell">{assignment.dueDate}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {assignment.submissions}/{assignment.totalStudents}
                    </TableCell>
                    <TableCell className="text-left">{getStatusBadge(assignment.status)}</TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">فتح القائمة</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Edit className="ml-2 h-4 w-4" />
                                    تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="ml-2 h-4 w-4" />
                                    حذف
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    لم يتم العثور على واجبات.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
