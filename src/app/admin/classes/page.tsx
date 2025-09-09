'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, User, Calendar } from 'lucide-react';

const classesData = [
  { id: 'CLS-001', name: 'Mathematics', grade: 'Grade 5', teacher: 'Mr. John Doe', students: 28, schedule: 'Mon, Wed, Fri 10:00' },
  { id: 'CLS-002', name: 'Science', grade: 'Grade 5', teacher: 'Ms. Jane Smith', students: 25, schedule: 'Tue, Thu 11:00' },
  { id: 'CLS-003', name: 'History', grade: 'Grade 8', teacher: 'Mr. Robert Brown', students: 30, schedule: 'Mon, Wed 09:00' },
  { id: 'CLS-004', name: 'English Literature', grade: 'Grade 7', teacher: 'Ms. Emily White', students: 22, schedule: 'Tue, Thu, Fri 13:00' },
  { id: 'CLS-005', name: 'Art', grade: 'Grade 3', teacher: 'Ms. Clara Oswald', students: 20, schedule: 'Mon 14:00' },
  { id: 'CLS-006', name: 'Physical Education', grade: 'Grade 6', teacher: 'Mr. Mike Ross', students: 35, schedule: 'Fri 08:00' },
  { id: 'CLS-007', name: 'Computer Science', grade: 'Grade 9', teacher: 'Dr. Amy Pond', students: 24, schedule: 'Wed 15:00' },
];

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classesData.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                A list of all active classes for the current academic year.
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead className="hidden sm:table-cell">Grade</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead className="hidden md:table-cell text-center">Students</TableHead>
                <TableHead className="hidden lg:table-cell">Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>
                    <div className="font-medium text-primary">{cls.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{cls.grade}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.teacher}</span>
                      </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <Badge variant="secondary">{cls.students}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.schedule}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
