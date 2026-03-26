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
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(null);

  const subjectResources = useMemo(() => {
    return {
      'الرياضيات': {
        homework: [
          { title: 'حل مسائل من 10 إلى 20', dueDate: '2025-09-20', status: 'قيد الإنجاز' },
          { title: 'مراجعة الجبر الفصل 2', dueDate: '2025-09-25', status: 'غير مكتمل' },
        ],
        exams: [
          { title: 'امتحان نهائي 2023', year: 2023, numQuestions: 30 },
          { title: 'امتحان نصف فصل 2024', year: 2024, numQuestions: 20 },
        ],
      },
      'العلوم': {
        homework: [
          { title: 'تقرير عن دورة الماء', dueDate: '2025-09-18', status: 'مكتمل' },
        ],
        exams: [
          { title: 'اختبار الوحدات 2023', year: 2023, numQuestions: 25 },
        ],
      },
      default: {
        homework: [
          { title: 'واجب عام للمادة', dueDate: '2025-09-22', status: 'قيد الإنجاز' },
        ],
        exams: [
          { title: 'أسئلة عامة سابقة', year: 2022, numQuestions: 15 },
        ],
      },
    } as Record<string, { homework: { title: string; dueDate: string; status: string }[]; exams: { title: string; year: number; numQuestions: number }[] }>;
  }, []);

  const selectedSubject = useMemo(() => {
    if (!selectedSubjectName) return null;
    const subject = subjectsData.find((s) => s.name === selectedSubjectName) || null;
    return subject;
  }, [selectedSubjectName]);

  const sortedHomework = useMemo(() => {
    if (!selectedSubjectName) return [] as { title: string; dueDate: string; status: string }[];
    const list = subjectResources[selectedSubjectName]?.homework || subjectResources.default.homework;
    return [...list].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }, [selectedSubjectName, subjectResources]);

  const sortedExams = useMemo(() => {
    if (!selectedSubjectName) return [] as { title: string; year: number; numQuestions: number }[];
    const list = subjectResources[selectedSubjectName]?.exams || subjectResources.default.exams;
    return [...list].sort((a, b) => b.year - a.year);
  }, [selectedSubjectName, subjectResources]);

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
          <Card
            key={index}
            onClick={() => setSelectedSubjectName(subject.name)}
            className={cn(
              'flex flex-col cursor-pointer transition-colors',
              selectedSubjectName === subject.name ? 'ring-2 ring-primary' : ''
            )}
          >
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

      <Dialog open={Boolean(selectedSubject)} onOpenChange={(o) => { if (!o) setSelectedSubjectName(null); }}>
        <DialogContent className="max-w-[min(90%,800px)] rounded-lg">
          {selectedSubject && (
            <div>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedSubject.name}</span>
                  <Badge className={getGradeColor(selectedSubject.grade)}>{selectedSubject.grade}%</Badge>
                </DialogTitle>
                <div className="text-sm text-muted-foreground">بإشراف: {selectedSubject.teacher}</div>
              </DialogHeader>
              <div className="mt-4">
                <Tabs defaultValue="homework" className="w-full">
                  <div className="flex justify-center">
                    <TabsList>
                      <TabsTrigger value="homework">الواجبات</TabsTrigger>
                      <TabsTrigger value="exams">أسئلة الامتحانات السابقة</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="homework">
                    <div className="mt-4 space-y-3">
                      {sortedHomework.map((hw, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-md border p-3">
                          <div>
                            <div className="font-medium">{hw.title}</div>
                            <div className="text-xs text-muted-foreground">تاريخ التسليم: {hw.dueDate}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{hw.status}</Badge>
                            <Button size="sm" variant="outline" onClick={() => console.log('open homework', selectedSubject.name, idx)}>
                              فتح
                            </Button>
                            <Button size="sm" onClick={() => console.log('download homework', selectedSubject.name, idx)}>
                              تحميل
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="exams">
                    <div className="mt-4 space-y-3">
                      {sortedExams.map((ex, idx) => (
                        <div key={idx} className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{ex.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">عدد الأسئلة: {ex.numQuestions}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-muted-foreground">السنة: {ex.year}</div>
                              <Button size="sm" variant="outline" onClick={() => console.log('open exam', selectedSubject.name, idx)}>
                                فتح
                              </Button>
                              <Button size="sm" onClick={() => console.log('download exam', selectedSubject.name, idx)}>
                                تحميل
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
