'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    if (!subject) return <span className="text-muted-foreground">-</span>;
    const commonProps = "w-fit justify-center text-xs py-1 px-3";

    if (subject === 'استراحة') {
        return <Badge variant="secondary" className={`${commonProps}`}>{subject}</Badge>;
    }
    
    if (subject.includes('5-أ')) return <Badge variant="default" className={`${commonProps} bg-blue-500/80 hover:bg-blue-500`}>{subject}</Badge>;
    if (subject.includes('5-ب')) return <Badge variant="default" className={`${commonProps} bg-sky-500/80 hover:bg-sky-500`}>{subject}</Badge>;
    if (subject.includes('6-أ')) return <Badge variant="default" className={`${commonProps} bg-green-500/80 hover:bg-green-500`}>{subject}</Badge>;
    if (subject.includes('6-ب')) return <Badge variant="default" className={`${commonProps} bg-emerald-500/80 hover:bg-emerald-500`}>{subject}</Badge>;
    
    return <Badge variant="outline" className={commonProps}>{subject}</Badge>;
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
            <div>
              <Accordion type="single" collapsible defaultValue="الأحد" className="w-full">
                {scheduleData.days.map(day => (
                  <AccordionItem value={day} key={day}>
                    <AccordionTrigger className="text-xl font-bold text-primary hover:no-underline">
                      {day}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pr-2">
                        {scheduleData.periods.map((period, periodIndex) => {
                          const subject = scheduleData.teacherSchedule[day as keyof typeof scheduleData.teacherSchedule]?.[periodIndex];
                          return (
                            <li key={period.name} className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                              <div className="flex flex-col text-right">
                                <span className="font-semibold text-base">{period.name}</span>
                                <span className="text-sm text-muted-foreground">{period.time}</span>
                              </div>
                              {getSubjectBadge(subject)}
                            </li>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
