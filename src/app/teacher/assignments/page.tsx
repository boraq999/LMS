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
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const assignmentsData = [
  { id: 'ASG-001', title: 'واجب الجبر', class: 'الصف 5-أ', dueDate: '2024-08-15', submissions: 25, status: 'مفتوح' },
  { id: 'ASG-002', title: 'مشروع الأشكال الهندسية', class: 'الصف 6-أ', dueDate: '2024-08-20', submissions: 28, status: 'مفتوح' },
  { id: 'ASG-003', title: 'تحليل قصيدة', class: 'الصف 5-ب', dueDate: '2024-08-10', submissions: 22, status: 'مغلق' },
  { id: 'ASG-004', title: 'واجب حساب المثلثات', class: 'الصف 6-ب', dueDate: '2024-08-25', submissions: 15, status: 'مفتوح' },
  { id: 'ASG-005', title: 'مقال عن الخلية', class: 'الصف 5-أ', dueDate: '2024-08-12', submissions: 28, status: 'مغلق' },
];

export default function TeacherAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');


  const filteredAssignments = assignmentsData.filter(assignment =>
    (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     assignment.class.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || assignment.status === statusFilter) &&
    (classFilter === 'all' || assignment.class === classFilter)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مفتوح':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">مفتوح</Badge>;
      case 'مغلق':
        return <Badge variant="secondary">مغلق</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const classes = [...new Set(assignmentsData.map(a => a.class))];

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الواجبات</h1>
          <p className="text-muted-foreground">
            إدارة وإنشاء الواجبات الدراسية لطلابك.
          </p>
        </div>
        <Button size="lg">
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
                عرض الواجبات وتتبع تسليمات الطلاب.
                </CardDescription>
             </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="ابحث عن واجب..."
                    className="w-full rounded-lg bg-input pr-8 sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                 <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="كل الفصول" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الفصول</SelectItem>
                        {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="مفتوح">مفتوح</SelectItem>
                        <SelectItem value="مغلق">مغلق</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان الواجب</TableHead>
                <TableHead className="hidden sm:table-cell">الفصل</TableHead>
                <TableHead className="hidden md:table-cell">تاريخ الاستحقاق</TableHead>
                <TableHead className="text-center">التسليمات</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-center">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium text-primary">{assignment.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">{assignment.class}</TableCell>
                  <TableCell className="hidden md:table-cell">{assignment.dueDate}</TableCell>
                  <TableCell className="text-center">{assignment.submissions}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(assignment.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" title="تعديل">
                        <Edit className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="حذف">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    لا توجد واجبات تطابق بحثك.
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
