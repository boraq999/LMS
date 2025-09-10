'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BarChart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const classesData = [
  { id: 'CLS-001', name: 'الرياضيات - الصف 5-أ', grade: 'الصف الخامس', students: 28, averageGrade: '88%' },
  { id: 'CLS-002', name: 'الرياضيات - الصف 5-ب', grade: 'الصف الخامس', students: 25, averageGrade: '85%' },
  { id: 'CLS-003', name: 'الرياضيات - الصف 6-أ', grade: 'الصف السادس', students: 30, averageGrade: '91%' },
  { id: 'CLS-004', name: 'الرياضيات - الصف 6-ب', grade: 'الصف السادس', students: 22, averageGrade: '82%' },
];

export default function TeacherClassesPage() {
  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">فصولي</h1>
        <p className="text-muted-foreground">
          نظرة عامة على الفصول التي تقوم بتدريسها حاليًا.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classesData.map((cls) => (
          <Card key={cls.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{cls.name}</CardTitle>
              <CardDescription>{cls.grade}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>عدد الطلاب</span>
                </div>
                <Badge variant="secondary">{cls.students} طالبًا</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart className="h-4 w-4" />
                  <span>متوسط الدرجات</span>
                </div>
                <Badge variant="default">{cls.averageGrade}</Badge>
              </div>
            </CardContent>
            <div className="p-4 pt-0">
               <Button asChild className="w-full">
                  <Link href={`/teacher/classes/${cls.id}`}>عرض تفاصيل الفصل</Link>
               </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
