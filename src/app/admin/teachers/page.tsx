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
  { id: 'TCH-001', name: 'أ. محمد عبدالله', subject: 'الرياضيات', email: 'john.doe@example.com', phone: '123-456-7890', status: 'نشط' },
  { id: 'TCH-002', name: 'أ. فاطمة علي', subject: 'العلوم', email: 'jane.smith@example.com', phone: '123-456-7891', status: 'نشط' },
  { id: 'TCH-003', name: 'أ. أحمد خالد', subject: 'التاريخ', email: 'robert.brown@example.com', phone: '123-456-7892', status: 'نشط' },
  { id: 'TCH-004', name: 'أ. سارة حسين', subject: 'الإنجليزية', email: 'emily.white@example.com', phone: '123-456-7893', status: 'في إجازة' },
  { id: 'TCH-005', name: 'أ. نورة سالم', subject: 'الفنون', email: 'clara.oswald@example.com', phone: '123-456-7894', status: 'نشط' },
  { id: 'TCH-006', name: 'أ. علي حسن', subject: 'التربية البدنية', email: 'mike.ross@example.com', phone: '123-456-7895', status: 'نشط' },
  { id: 'TCH-007', name: 'د. هند إبراهيم', subject: 'علوم الحاسب', email: 'amy.pond@example.com', phone: '123-456-7896', status: 'نشط' },
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
          <h1 className="text-3xl font-bold tracking-tight">المعلمون</h1>
          <p className="text-muted-foreground">
            إدارة طاقم التدريس في مدرستك.
          </p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة معلم
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>قائمة المعلمين</CardTitle>
              <CardDescription>
                قائمة بجميع المعلمين في المؤسسة.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن المعلمين..."
                className="w-full rounded-lg bg-input pr-8 sm:w-[250px]"
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
                <TableHead>الاسم</TableHead>
                <TableHead className="hidden sm:table-cell">المادة</TableHead>
                <TableHead className="hidden md:table-cell">التواصل</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
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
                            <span>{teacher.email}</span>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                         <div className="flex items-center gap-2">
                            <span>{teacher.phone}</span>
                            <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <Badge variant={teacher.status === 'نشط' ? 'default' : 'outline'}>
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
