'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { PlusCircle, Search, User, BookOpen, Users } from 'lucide-react';

type Class = {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  students: number;
  schedule: string;
};

const classesData: Class[] = [
  { id: 'CLS-001', name: 'الرياضيات 1-أ', grade: 'الصف 1', teacher: 'أ. محمد عبدالله', students: 28, schedule: 'الإثنين, الأربعاء, الجمعة 10:00' },
  { id: 'CLS-002', name: 'العلوم 1-أ', grade: 'الصف 1', teacher: 'أ. فاطمة علي', students: 25, schedule: 'الثلاثاء, الخميس 11:00' },
  { id: 'CLS-003', name: 'التاريخ 8-أ', grade: 'الصف 8', teacher: 'أ. أحمد خالد', students: 30, schedule: 'الإثنين, الأربعاء 09:00' },
  { id: 'CLS-004', name: 'الأدب الإنجليزي 7-ب', grade: 'الصف 7', teacher: 'أ. سارة حسين', students: 22, schedule: 'الثلاثاء, الخميس, الجمعة 13:00' },
  { id: 'CLS-005', name: 'الفنون 3-ج', grade: 'الصف 3', teacher: 'أ. نورة سالم', students: 20, schedule: 'الإثنين 14:00' },
  { id: 'CLS-006', name: 'التربية البدنية 6-أ', grade: 'الصف 6', teacher: 'أ. علي حسن', students: 35, schedule: 'الجمعة 08:00' },
  { id: 'CLS-007', name: 'علوم الحاسب 9-ب', grade: 'الصف 9', teacher: 'د. هند إبراهيم', students: 24, schedule: 'الأربعاء 15:00' },
  { id: 'CLS-008', name: 'الرياضيات 5-ب', grade: 'الصف 5', teacher: 'أ. محمد عبدالله', students: 29, schedule: 'الثلاثاء, الخميس 09:00' },
  { id: 'CLS-009', name: 'العلوم 5-أ', grade: 'الصف 5', teacher: 'أ. فاطمة علي', students: 26, schedule: 'الإثنين, الأربعاء 11:00' },
  { id: 'CLS-010', name: 'الفنون 2-أ', grade: 'الصف 2', teacher: 'أ. نورة سالم', students: 21, schedule: 'الخميس 14:00' },
  { id: 'CLS-011', name: 'التاريخ 4-أ', grade: 'الصف 4', teacher: 'أ. أحمد خالد', students: 32, schedule: 'الثلاثاء, الجمعة 10:00' },
];

const scheduleData = {
  days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  periods: [
    'الحصة 1',
    'الحصة 2',
    'الحصة 3',
    'الحصة 4',
    'الحصة 5',
    'الحصة 6',
    'الحصة 7',
  ],
  subjects: [
    'رياضيات', 'علوم', 'انجليزي', 'تاريخ', 'فنون', 'رياضة', 'موسيقى', 'جغرافيا', 'استراحة'
  ]
};

const generateDummySchedule = () => {
  const schedule: { [key: string]: string[] } = {};
  scheduleData.days.forEach(day => {
    schedule[day] = Array.from({ length: 7 }, () => 
      scheduleData.subjects[Math.floor(Math.random() * scheduleData.subjects.length)]
    );
  });
  return schedule;
};

const getSubjectBadge = (subject: string) => {
  const commonProps = "w-full text-center justify-center text-xs py-1";
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


export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handleClassClick = (cls: Class) => {
    setSelectedClass(cls);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  const filteredClasses = classesData.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const groupedClasses = Array.from({ length: 9 }, (_, i) => `الصف ${i + 1}`).reduce((acc, grade) => {
    const classesInGrade = filteredClasses.filter(cls => cls.grade === grade);
    if (classesInGrade.length > 0) {
      acc[grade] = classesInGrade;
    }
    return acc;
  }, {} as Record<string, Class[]>);

  const dummySchedule = selectedClass ? generateDummySchedule() : {};

  return (
    <main className="flex flex-1 flex-col space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الفصول الدراسية</h1>
          <p className="text-muted-foreground">
            إدارة الفصول الدراسية وجداولها في مدرستك.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن الفصول..."
                className="w-full rounded-lg bg-input pl-8 sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            إضافة فصل
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
          {Object.entries(groupedClasses).map(([grade, classes]) => (
            <Card key={grade}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{grade}</CardTitle>
                <CardDescription>
                  قائمة الفصول لـ {grade}. انقر على فصل لرؤية التفاصيل.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {classes.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => handleClassClick(cls)}
                      className="rounded-lg border bg-card p-4 text-left shadow-sm transition-all hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{cls.name}</p>
                        <Badge variant="secondary">{cls.students} طالب</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
            {Object.keys(groupedClasses).length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="rounded-full border border-dashed p-6">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">لم يتم العثور على فصول</h3>
                <p className="text-muted-foreground max-w-sm">
                  بحثك عن "{searchTerm}" لم يطابق أي فصول. جرب مصطلح بحث مختلف أو أضف فصلاً جديدًا.
                </p>
              </div>
            </div>
            )}
      </div>

      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الفصل: {selectedClass.name}</DialogTitle>
              <DialogDescription>
                معلومات وجدول أسبوعي لـ {selectedClass.grade}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">المعلم</span>
                      <span className="font-medium">{selectedClass.teacher}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">الطلاب المسجلون</span>
                      <span className="font-medium">{selectedClass.students}</span>
                    </div>
                  </div>
              </div>
              <div className="md:col-span-2">
                 <h4 className="mb-2 font-medium">الجدول الأسبوعي</h4>
                 <div className="overflow-hidden rounded-lg border">
                    <Table className="[&_td]:p-2 [&_th]:p-2">
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-24 text-center font-bold">الحصة</TableHead>
                                {scheduleData.days.map(day => <TableHead className="text-center font-bold" key={day}>{day}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scheduleData.periods.map((period, periodIndex) => (
                                <TableRow key={period}>
                                    <TableCell className="text-center font-medium">{period}</TableCell>
                                    {scheduleData.days.map(day => (
                                        <TableCell key={day} className="text-center">
                                            {getSubjectBadge(dummySchedule[day]?.[periodIndex])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}

    