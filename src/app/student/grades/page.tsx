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
import { Award, BookOpen, TrendingUp, TrendingDown, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

const gradesData = {
  'الرياضيات': {
    teacher: 'أ. محمد عبدالله',
    finalGrade: 92,
    assessments: [
      { type: 'واجب', name: 'الجبر الخطي', grade: 95 },
      { type: 'اختبار قصير', name: 'التفاضل', grade: 88 },
      { type: 'مشروع', name: 'نمذجة البيانات', grade: 90 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 91 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 94 },
    ]
  },
  'العلوم': {
    teacher: 'أ. فاطمة علي',
    finalGrade: 88,
    assessments: [
      { type: 'واجب', name: 'تقرير معمل', grade: 90 },
      { type: 'اختبار قصير', name: 'الخلية النباتية', grade: 85 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 86 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 90 },
    ]
  },
  'التاريخ': {
    teacher: 'أ. أحمد خالد',
    finalGrade: 95,
    assessments: [
      { type: 'واجب', name: 'بحث عن الثورة', grade: 98 },
      { type: 'اختبار قصير', name: 'الحرب العالمية', grade: 92 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 94 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 96 },
    ]
  },
  'اللغة الإنجليزية': {
    teacher: 'أ. سارة حسين',
    finalGrade: 85,
    assessments: [
        { type: 'واجب', name: 'مقال وصفي', grade: 88 },
        { type: 'اختبار قصير', name: 'قواعد', grade: 82 },
        { type: 'مشروع', name: 'عرض تقديمي', grade: 84 },
        { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 85 },
        { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 87 },
    ]
  },
};

const getGradeBadge = (grade: number) => {
  if (grade >= 90) return <Badge className="bg-green-500 hover:bg-green-600">{grade}</Badge>;
  if (grade >= 80) return <Badge className="bg-blue-500 hover:bg-blue-600">{grade}</Badge>;
  if (grade >= 70) return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">{grade}</Badge>;
  if (grade >= 50) return <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">{grade}</Badge>;
  return <Badge variant="destructive">{grade}</Badge>;
};


export default function StudentGradesPage() {
    const [selectedSubject, setSelectedSubject] = useState(Object.keys(gradesData)[0]);
    const subjectData = gradesData[selectedSubject as keyof typeof gradesData];

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الدرجات</h1>
          <p className="text-muted-foreground">
            عرض تفصيلي لدرجاتك وأدائك الأكاديمي.
          </p>
        </div>
         <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="اختر المادة" />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(gradesData).map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

       {subjectData ? (
        <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {selectedSubject}
                </CardTitle>
                <CardDescription className="mt-2">
                    المعلم: {subjectData.teacher}
                </CardDescription>
            </div>
            <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">الدرجة النهائية</p>
                <p className="text-4xl font-bold flex items-center justify-center sm:justify-end gap-2">
                    {subjectData.finalGrade >= 90 ? <TrendingUp className="h-7 w-7 text-green-500" /> : <TrendingDown className="h-7 w-7 text-red-500" />}
                    {subjectData.finalGrade}%
                </p>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[120px]">النوع</TableHead>
                    <TableHead>التقييم</TableHead>
                    <TableHead className="text-left w-[100px]">الدرجة</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {subjectData.assessments.map((assessment, index) => (
                    <TableRow key={index}>
                    <TableCell>
                        <Badge variant="outline">{assessment.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{assessment.name}</TableCell>
                    <TableCell className="text-left">
                        {getGradeBadge(assessment.grade)}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      ) : (
         <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="rounded-full border border-dashed p-6">
                <Info className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">الرجاء اختيار مادة</h3>
                <p className="text-muted-foreground max-w-sm">
                  اختر مادة من القائمة أعلاه لعرض تفاصيل الدرجات.
                </p>
              </div>
            </div>
      )}
    </main>
  );
}
