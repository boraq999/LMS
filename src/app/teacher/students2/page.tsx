'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Edit, Trash2, FileText, CheckSquare, Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const assignmentsData = [
  { id: 'ASG-001', title: 'واجب الجبر', class: 'الصف 5-أ', dueDate: '2024-08-15', submissions: 25, totalStudents: 28, status: 'مفتوح' },
  { id: 'ASG-002', title: 'مشروع الأشكال الهندسية', class: 'الصف 6-أ', dueDate: '2024-08-20', submissions: 28, totalStudents: 30, status: 'مفتوح' },
  { id: 'ASG-003', title: 'تحليل قصيدة', class: 'الصف 5-ب', dueDate: '2024-08-10', submissions: 22, totalStudents: 22, status: 'مغلق' },
  { id: 'ASG-004', title: 'واجب حساب المثلثات', class: 'الصف 6-ب', dueDate: '2024-08-25', submissions: 15, totalStudents: 22, status: 'مفتوح' },
  { id: 'ASG-005', title: 'مقال عن الخلية', class: 'الصف 5-أ', dueDate: '2024-08-12', submissions: 28, totalStudents: 28, status: 'مغلق' },
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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <CardTitle>قائمة الواجبات</CardTitle>
              <CardDescription>
                عرض الواجبات وتتبع تسليمات الطلاب.
              </CardDescription>
            </div>
            <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row md:w-auto">
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="ابحث عن واجب..."
                  className="w-full rounded-lg bg-input pr-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="flex-1 sm:w-[150px]">
                  <SelectValue placeholder="كل الفصول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الفصول</SelectItem>
                  {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex-1 sm:w-[120px]">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="flex flex-col">
                        <CardHeader>
                             <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                    <CardDescription>{assignment.class}</CardDescription>
                                </div>
                                {getStatusBadge(assignment.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" /> تاريخ الاستحقاق</span>
                                <span>{assignment.dueDate}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><CheckSquare className="h-4 w-4" /> التسليمات</span>
                                <span>{assignment.submissions} / {assignment.totalStudents}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2 border-t pt-4 mt-4">
                             <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="ml-2 h-4 w-4" />
                                تعديل
                            </Button>
                             <Button variant="destructive" size="sm" className="flex-1">
                                <Trash2 className="ml-2 h-4 w-4" />
                                حذف
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
             {filteredAssignments.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <div className="rounded-full border border-dashed p-6">
                        <FileText className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold">لم يتم العثور على واجبات</h3>
                        <p className="text-muted-foreground max-w-sm">
                        لم يتم العثور على واجبات تطابق معايير البحث الحالية.
                        </p>
                    </div>
                </div>
              )}
        </CardContent>
      </Card>
    </main>
  );
}
