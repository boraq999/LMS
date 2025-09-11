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
import { Calendar } from 'lucide-react';

const scheduleData = {
  days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  periods: [
    { time: '08:00 - 08:45', name: 'الحصة 1' },
    { time: '08:50 - 09:35', name: 'الحصة 2' },
    { time: '09:40 - 10:25', name: 'الحصة 3' },
    { time: '10:30 - 11:15', name: 'الحصة 4' },
    { time: '11:20 - 12:05', name: 'استراحة' },
    { time: '12:10 - 12:55', name: 'الحصة 5' },
    { time: '13:00 - 13:45', name: 'الحصة 6' },
  ],
  teacherSchedule: {
    'الأحد': ['رياضيات - 5-أ', null, 'رياضيات - 6-أ', null, 'استراحة', 'رياضيات - 5-ب', null],
    'الإثنين': [null, 'رياضيات - 5-ب', null, 'رياضيات - 6-ب', 'استراحة', null, 'رياضيات - 6-أ'],
    'الثلاثاء': ['رياضيات - 6-ب', null, 'رياضيات - 5-أ', null, 'استراحة', 'رياضيات - 5-ب', null],
    'الأربعاء': ['رياضيات - 5-أ', 'رياضيات - 6-أ', null, 'رياضيات - 5-ب', 'استراحة', null, 'رياضيات - 6-ب'],
    'الخميس': [null, 'رياضيات - 5-ب', 'رياضيات - 6-ب', null, 'استراحة', 'رياضيات - 5-أ', null],
  }
};

const getSubjectBadge = (subject: string | null) => {
    if (!subject) return null;

    if (subject === 'استراحة') {
        return <Badge variant="secondary" className="text-xs">{subject}</Badge>;
    }
    
    if (subject.includes('5-أ')) return <Badge variant="default" className={`bg-blue-500/80 hover:bg-blue-500`}>{subject}</Badge>;
    if (subject.includes('5-ب')) return <Badge variant="default" className={`bg-sky-500/80 hover:bg-sky-500`}>{subject}</Badge>;
    if (subject.includes('6-أ')) return <Badge variant="default" className={`bg-green-500/80 hover:bg-green-500`}>{subject}</Badge>;
    if (subject.includes('6-ب')) return <Badge variant="default" className={`bg-emerald-500/80 hover:bg-emerald-500`}>{subject}</Badge>;
    
    return <Badge variant="outline">{subject}</Badge>;
};


export default function TeacherSchedulePage() {

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الجدول الدراسي</h1>
        <p className="text-muted-foreground">
          عرض جدولك الأسبوعي للحصص والفصول الدراسية.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            جدولي الأسبوعي
          </CardTitle>
          <CardDescription>جدول الحصص المخصص لك للفصل الدراسي الحالي.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px] text-right font-bold">اليوم</TableHead>
                            <TableHead className="text-right font-bold">الحصص المجدولة</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scheduleData.days.map((day) => {
                            const dailyClasses = scheduleData.teacherSchedule[day as keyof typeof scheduleData.teacherSchedule];
                            const scheduledPeriods = dailyClasses.map((subject, index) => {
                                if (subject && subject !== 'استراحة') {
                                    return {
                                        subject,
                                        period: scheduleData.periods[index],
                                    };
                                }
                                return null;
                            }).filter(Boolean);

                            return (
                                <TableRow key={day} className="align-top">
                                    <TableCell className="font-semibold text-primary">{day}</TableCell>
                                    <TableCell className="py-2.5 px-0">
                                        {scheduledPeriods.length > 0 ? (
                                            <div className="flex flex-wrap items-start gap-2">
                                                {scheduledPeriods.map((item) => item && (
                                                    <div key={item.period.name} className="flex flex-col items-center justify-center gap-1 rounded-md border p-2 bg-muted/50 min-w-[140px]">
                                                        <div className="flex flex-col text-center">
                                                            <span className="font-medium text-sm">{item.period.name}</span>
                                                            <span className="text-xs text-muted-foreground">{item.period.time}</span>
                                                        </div>
                                                        {getSubjectBadge(item.subject)}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground px-4">لا توجد حصص مجدولة لهذا اليوم.</p>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
