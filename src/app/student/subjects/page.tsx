'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const subjectsData = [
  { name: 'الرياضيات', teacher: 'أ. محمد عبدالله', grade: 92 },
  { name: 'العلوم', teacher: 'أ. فاطمة علي', grade: 88 },
  { name: 'التاريخ', teacher: 'أ. أحمد خالد', grade: 95 },
  { name: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين', grade: 85 },
  { name: 'الفنون', teacher: 'أ. نورة سالم', grade: 98 },
  { name: 'التربية البدنية', teacher: 'أ. علي حسن', grade: 100 },
];

const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'bg-green-500';
  if (grade >= 80) return 'bg-blue-500';
  if (grade >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function StudentSubjectsPage() {
  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">المواد الدراسية</h1>
        <p className="text-muted-foreground">
          استعراض المواد المسجلة وتتبع تقدمك.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjectsData.map((subject, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <UserCircle className="h-4 w-4" />
                        <span>{subject.teacher}</span>
                    </div>
                  </div>
                </div>
                 <Badge variant={subject.grade > 89 ? "default" : "secondary" } className={`text-lg ${getGradeColor(subject.grade)}`}>{subject.grade}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col-reverse flex-grow">
               <div>
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>التقدم</span>
                    <span>الدرجة الحالية</span>
                </div>
                <Progress value={subject.grade} className={`h-3 ${getGradeColor(subject.grade)}/80`} indicatorClassName={getGradeColor(subject.grade)} />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
