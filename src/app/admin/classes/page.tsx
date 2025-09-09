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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, User, Calendar, BookOpen, Users } from 'lucide-react';

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

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage your school's classes and their schedules.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Class List</CardTitle>
              <CardDescription>
                Browse classes grouped by grade. Click a class to see details.
              </CardDescription>
            </div>
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
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={Object.keys(groupedClasses)}>
            {Object.entries(groupedClasses).map(([grade, classes]) => (
              <AccordionItem value={grade} key={grade}>
                <AccordionTrigger className="text-lg font-medium text-primary">
                  {grade}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                </AccordionContent>
              </AccordionItem>
            ))}
             {Object.keys(groupedClasses).length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">No Classes Found</h3>
                  <p className="text-muted-foreground">
                    Your search for "{searchTerm}" did not match any classes.
                  </p>
                </div>
              </div>
            )}
          </Accordion>
        </CardContent>
      </Card>

      {selectedClass && (
        <Dialog open={!!selectedClass} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedClass.name}</DialogTitle>
              <DialogDescription>
                Details for {selectedClass.grade}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Teacher</span>
                  <span className="font-medium">{selectedClass.teacher}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                 <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Schedule</span>
                  <span className="font-medium">{selectedClass.schedule}</span>
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
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
