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
import { PlusCircle, Search, Mail, Phone } from 'lucide-react';

const teachersData = [
  { id: 'TCH-001', name: 'Mr. John Doe', subject: 'Mathematics', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active' },
  { id: 'TCH-002', name: 'Ms. Jane Smith', subject: 'Science', email: 'jane.smith@example.com', phone: '123-456-7891', status: 'Active' },
  { id: 'TCH-003', name: 'Mr. Robert Brown', subject: 'History', email: 'robert.brown@example.com', phone: '123-456-7892', status: 'Active' },
  { id: 'TCH-004', name: 'Ms. Emily White', subject: 'English', email: 'emily.white@example.com', phone: '123-456-7893', status: 'On Leave' },
  { id: 'TCH-005', name: 'Ms. Clara Oswald', subject: 'Art', email: 'clara.oswald@example.com', phone: '123-456-7894', status: 'Active' },
  { id: 'TCH-006', name: 'Mr. Mike Ross', subject: 'Physical Education', email: 'mike.ross@example.com', phone: '123-456-7895', status: 'Active' },
  { id: 'TCH-007', name: 'Dr. Amy Pond', subject: 'Computer Science', email: 'amy.pond@example.com', phone: '123-456-7896', status: 'Active' },
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachersData.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">
            Manage your school's teaching staff.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Teacher List</CardTitle>
              <CardDescription>
                A list of all teachers in the institution.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
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
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Subject</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="font-medium text-primary">{teacher.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{teacher.subject}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{teacher.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{teacher.email}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{teacher.phone}</span>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={teacher.status === 'Active' ? 'default' : 'outline'}>
                      {teacher.status}
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
