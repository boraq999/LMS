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
import { PlusCircle, Search } from 'lucide-react';

const studentsData = [
  { id: 'STU-001', name: 'Liam Johnson', grade: 'Grade 5', status: 'Active', enrollmentDate: '2023-01-15' },
  { id: 'STU-002', name: 'Olivia Smith', grade: 'Grade 3', status: 'Active', enrollmentDate: '2023-02-20' },
  { id: 'STU-003', name: 'Noah Williams', grade: 'Grade 8', status: 'Graduated', enrollmentDate: '2020-09-01' },
  { id: 'STU-004', name: 'Emma Brown', grade: 'Grade 5', status: 'On-hold', enrollmentDate: '2022-08-10' },
  { id: 'STU-005', name: 'James Jones', grade: 'Grade 7', status: 'Active', enrollmentDate: '2021-09-05' },
  { id: 'STU-006', name: 'Sophia Davis', grade: 'Grade 6', status: 'Active', enrollmentDate: '2022-09-01' },
  { id: 'STU-007', name: 'Benjamin Miller', grade: 'Grade 4', status: 'Active', enrollmentDate: '2023-09-01' },
  { id: 'STU-008', name: 'Isabella Wilson', grade: 'Grade 9', status: 'Graduated', enrollmentDate: '2019-09-01' },
  { id: 'STU-009', name: 'Ethan Moore', grade: 'Grade 2', status: 'Active', enrollmentDate: '2024-01-20' },
  { id: 'STU-010', name: 'Mia Taylor', grade: 'Grade 7', status: 'On-hold', enrollmentDate: '2021-10-11' },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your school's students and view their information.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                A comprehensive list of all students currently and previously enrolled.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
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
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="hidden md:table-cell">Enrollment Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="font-medium text-primary">{student.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{student.name}</div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.enrollmentDate}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={
                      student.status === 'Active' ? 'default' :
                      student.status === 'Graduated' ? 'secondary' :
                      'outline'
                    }
                    className={student.status === 'On-hold' ? 'border-destructive text-destructive' : ''}
                    >
                      {student.status}
                    </Badge>
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
