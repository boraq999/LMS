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
  { id: 'CLS-001', name: 'Mathematics 1-A', grade: 'Grade 1', teacher: 'Mr. John Doe', students: 28, schedule: 'Mon, Wed, Fri 10:00' },
  { id: 'CLS-002', name: 'Science 1-A', grade: 'Grade 1', teacher: 'Ms. Jane Smith', students: 25, schedule: 'Tue, Thu 11:00' },
  { id: 'CLS-003', name: 'History 8-A', grade: 'Grade 8', teacher: 'Mr. Robert Brown', students: 30, schedule: 'Mon, Wed 09:00' },
  { id: 'CLS-004', name: 'English Literature 7-B', grade: 'Grade 7', teacher: 'Ms. Emily White', students: 22, schedule: 'Tue, Thu, Fri 13:00' },
  { id: 'CLS-005', name: 'Art 3-C', grade: 'Grade 3', teacher: 'Ms. Clara Oswald', students: 20, schedule: 'Mon 14:00' },
  { id: 'CLS-006', name: 'Physical Education 6-A', grade: 'Grade 6', teacher: 'Mr. Mike Ross', students: 35, schedule: 'Fri 08:00' },
  { id: 'CLS-007', name: 'Computer Science 9-B', grade: 'Grade 9', teacher: 'Dr. Amy Pond', students: 24, schedule: 'Wed 15:00' },
  { id: 'CLS-008', name: 'Mathematics 5-B', grade: 'Grade 5', teacher: 'Mr. John Doe', students: 29, schedule: 'Tue, Thu 09:00' },
  { id: 'CLS-009', name: 'Science 5-A', grade: 'Grade 5', teacher: 'Ms. Jane Smith', students: 26, schedule: 'Mon, Wed 11:00' },
  { id: 'CLS-010', name: 'Art 2-A', grade: 'Grade 2', teacher: 'Ms. Clara Oswald', students: 21, schedule: 'Thu 14:00' },
  { id: 'CLS-011', name: 'History 4-A', grade: 'Grade 4', teacher: 'Mr. Robert Brown', students: 32, schedule: 'Tue, Fri 10:00' },
];

const scheduleData = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  periods: [
    'Period 1',
    'Period 2',
    'Period 3',
    'Period 4',
    'Period 5',
    'Period 6',
    'Period 7',
  ],
  subjects: [
    'Math', 'Science', 'English', 'History', 'Art', 'P.E.', 'Music', 'Geography', 'Break'
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
    case 'Math': return <Badge variant="default" className={`${commonProps} bg-blue-500/80 hover:bg-blue-500`}>{subject}</Badge>;
    case 'Science': return <Badge variant="default" className={`${commonProps} bg-green-500/80 hover:bg-green-500`}>{subject}</Badge>;
    case 'English': return <Badge variant="default" className={`${commonProps} bg-red-500/80 hover:bg-red-500`}>{subject}</Badge>;
    case 'History': return <Badge variant="default" className={`${commonProps} bg-yellow-500/80 hover:bg-yellow-500 text-black`}>{subject}</Badge>;
    case 'Art': return <Badge variant="default" className={`${commonProps} bg-purple-500/80 hover:bg-purple-500`}>{subject}</Badge>;
    case 'P.E.': return <Badge variant="default" className={`${commonProps} bg-orange-500/80 hover:bg-orange-500`}>{subject}</Badge>;
    case 'Music': return <Badge variant="default" className={`${commonProps} bg-pink-500/80 hover:bg-pink-500`}>{subject}</Badge>;
    case 'Geography': return <Badge variant="default" className={`${commonProps} bg-teal-500/80 hover:bg-teal-500`}>{subject}</Badge>;
    case 'Break': return <Badge variant="secondary" className={`${commonProps}`}>{subject}</Badge>;
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
  
  const groupedClasses = Array.from({ length: 9 }, (_, i) => `Grade ${i + 1}`).reduce((acc, grade) => {
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
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage your school's classes and their schedules.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classes..."
                className="w-full rounded-lg bg-input pl-8 sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
          {Object.entries(groupedClasses).map(([grade, classes]) => (
            <Card key={grade}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{grade}</CardTitle>
                <CardDescription>
                  List of classes for {grade}. Click a class to see details.
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
                        <Badge variant="secondary">{cls.students} Students</Badge>
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
                <h3 className="text-xl font-semibold">No Classes Found</h3>
                <p className="text-muted-foreground max-w-sm">
                  Your search for "{searchTerm}" did not match any classes. Try a different search term or add a new class.
                </p>
              </div>
            </div>
            )}
      </div>

      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Class Details: {selectedClass.name}</DialogTitle>
              <DialogDescription>
                Information and weekly schedule for {selectedClass.grade}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Teacher</span>
                      <span className="font-medium">{selectedClass.teacher}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Enrolled Students</span>
                      <span className="font-medium">{selectedClass.students}</span>
                    </div>
                  </div>
              </div>
              <div className="md:col-span-2">
                 <h4 className="mb-2 font-medium">Weekly Schedule</h4>
                 <div className="overflow-hidden rounded-lg border">
                    <Table className="[&_td]:p-2 [&_th]:p-2">
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-24 text-center font-bold">Period</TableHead>
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
