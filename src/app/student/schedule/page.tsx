
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
  schedule: {
    'الأحد': ['رياضيات', 'علوم', 'انجليزي', 'تاريخ', 'استراحة', 'فنون', 'رياضة'],
    'الإثنين': ['علوم', 'رياضيات', 'تاريخ', 'انجليزي', 'استراحة', 'جغرافيا', 'موسيقى'],
    'الثلاثاء': ['انجليزي', 'تاريخ', 'رياضيات', 'علوم', 'استراحة', 'رياضة', 'فنون'],
    'الأربعاء': ['تاريخ', 'انجليزي', 'علوم', 'رياضيات', 'استراحة', 'موسيقى', 'جغرافيا'],
    'الخميس': ['رياضة', 'فنون', 'جغرافيا', 'موسيقى', 'استراحة', 'رياضيات', 'علوم'],
  }
};


const getSubjectBadge = (subject: string) => {
  const commonProps = "w-full text-center justify-center text-xs py-1 px-2";
  switch (subject) {
    case 'رياضيات': return <Badge variant="default" className={`${commonProps} bg-blue-500/80 hover:bg-blue-500`}>{subject}</Badge>;
    case 'علوم': return <Badge variant="default" className={`${commonProps} bg-green-500/80 hover:bg-green-500`}>{subject}</Badge>;
    case 'انجليزي': return <Badge variant="default" className={`${commonProps} bg-red-500/80 hover:bg-red-500`}>{subject}</Badge>;
    case 'تاريخ': return <Badge variant="default" className={`${commonProps} bg-yellow-500/80 hover:bg-yellow-500 text-black`}>{subject}</Badge>;
    case 'فنون': return <Badge variant="default" className={`${commonProps} bg-purple-500/80 hover:bg-purple-500`}>{subject}</Badge>;
    case 'رياضة': return <Badge variant="default" className={`${commonProps} bg-orange-500/80 hover:bg-orange-500`}>{subject}</Badge>;
    case 'موسيقى': return <Badge variant="default" className={`${commonProps} bg-pink-500/80 hover:bg-pink-500`}>{subject}</Badge>;
    case 'جغرافيا': return <Badge variant="default" className={`${commonProps} bg-teal-500/80 hover:bg-teal-500`}>{subject}</Badge>;
    case 'استراحة': return <Badge variant="secondary" className={`${commonProps}`}>{subject}</Badge>;
    default: return <Badge variant="outline" className={commonProps}>{subject}</Badge>;
  }
};


export default function StudentSchedulePage() {

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الجدول الدراسي</h1>
        <p className="text-muted-foreground">
          عرض جدولك الأسبوعي للحصص والمواد الدراسية.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            الجدول الأسبوعي
          </CardTitle>
          <CardDescription>جدول الحصص للفصل الدراسي الحالي.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-hidden rounded-lg border">
                <Table className="[&_td]:p-2 [&_th]:p-2 text-right">
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-24 text-center font-bold">الحصة</TableHead>
                            {scheduleData.days.map(day => <TableHead className="text-center font-bold" key={day}>{day}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scheduleData.periods.map((period, periodIndex) => (
                            <TableRow key={period.name}>
                                <TableCell className="text-center font-medium">
                                    <div className="flex flex-col">
                                        <span>{period.name}</span>
                                        <span className="text-xs font-normal text-muted-foreground">{period.time}</span>
                                    </div>
                                </TableCell>
                                {scheduleData.days.map(day => (
                                    <TableCell key={day} className="text-center">
                                        {getSubjectBadge(scheduleData.schedule[day as keyof typeof scheduleData.schedule]?.[periodIndex])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
