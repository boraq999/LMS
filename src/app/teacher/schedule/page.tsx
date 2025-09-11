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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';


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
  schedules: {
    'الرياضيات - الصف 5-أ': {
        'الأحد': ['رياضيات', 'استراحة', 'رياضيات', 'استراحة', 'استراحة', 'علوم', 'انجليزي'],
        'الإثنين': ['علوم', 'رياضيات', 'تاريخ', 'انجليزي', 'استراحة', 'جغرافيا', 'موسيقى'],
        'الثلاثاء': ['انجليزي', 'تاريخ', 'رياضيات', 'علوم', 'استراحة', 'رياضة', 'فنون'],
        'الأربعاء': ['تاريخ', 'انجليزي', 'علوم', 'رياضيات', 'استراحة', 'موسيقى', 'جغرافيا'],
        'الخميس': ['رياضة', 'فنون', 'جغرافيا', 'موسيقى', 'استراحة', 'رياضيات', 'علوم'],
    },
    'الرياضيات - الصف 5-ب': {
        'الأحد': ['انجليزي', 'علوم', 'رياضيات', 'رياضيات', 'استراحة', 'فنون', 'رياضة'],
        'الإثنين': ['تاريخ', 'رياضيات', 'علوم', 'انجليزي', 'استراحة', 'جغرافيا', 'موسيقى'],
        'الثلاثاء': ['رياضيات', 'تاريخ', 'انجليزي', 'علوم', 'استراحة', 'رياضة', 'فنون'],
        'الأربعاء': ['علوم', 'انجليزي', 'تاريخ', 'رياضيات', 'استراحة', 'موسيقى', 'جغرافيا'],
        'الخميس': ['فنون', 'رياضة', 'جغرافيا', 'موسيقى', 'استراحة', 'علوم', 'رياضيات'],
    }
  }
};

const getSubjectBadge = (subject: string) => {
  const commonProps = "w-full text-center justify-center text-xs py-1 px-2";
  switch (subject) {
    case 'رياضيات': return <Badge variant="default" className={`${commonProps} bg-blue-500/80 hover:bg-blue-500`}>رياضيات - 5-أ</Badge>;
    case 'علوم': return <Badge variant="default" className={`${commonProps} bg-green-500/80 hover:bg-green-500`}>علوم - 5-أ</Badge>;
    case 'انجليزي': return <Badge variant="default" className={`${commonProps} bg-red-500/80 hover:bg-red-500`}>انجليزي - 5-ب</Badge>;
    case 'تاريخ': return <Badge variant="default" className={`${commonProps} bg-yellow-500/80 hover:bg-yellow-500 text-black`}>تاريخ - 6-أ</Badge>;
    case 'فنون': return <Badge variant="default" className={`${commonProps} bg-purple-500/80 hover:bg-purple-500`}>فنون - 6-ب</Badge>;
    case 'رياضة': return <Badge variant="default" className={`${commonProps} bg-orange-500/80 hover:bg-orange-500`}>رياضة - عام</Badge>;
    case 'استراحة': return <Badge variant="secondary" className={`${commonProps}`}>{subject}</Badge>;
    default: return <Badge variant="outline" className={commonProps}>{subject}</Badge>;
  }
};


export default function TeacherSchedulePage() {
  const [selectedClass, setSelectedClass] = useState(Object.keys(scheduleData.schedules)[0]);
  const currentSchedule = scheduleData.schedules[selectedClass as keyof typeof scheduleData.schedules];

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">الجدول الدراسي</h1>
            <p className="text-muted-foreground">
            عرض جدولك الأسبوعي للحصص والمواد الدراسية.
            </p>
        </div>
         <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="اختر الفصل" />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(scheduleData.schedules).map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            الجدول الأسبوعي لـ {selectedClass}
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
                                        {getSubjectBadge(currentSchedule[day as keyof typeof currentSchedule]?.[periodIndex])}
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
