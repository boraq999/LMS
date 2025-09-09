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
import { PlusCircle, Search, BookCopy } from 'lucide-react';

const subjectsData = [
  { code: 'MATH101', name: 'الرياضيات', teacher: 'أ. محمد عبدالله', classes: 5, department: 'العلوم' },
  { code: 'SCI101', name: 'العلوم', teacher: 'أ. فاطمة علي', classes: 4, department: 'العلوم' },
  { code: 'HIST201', name: 'التاريخ', teacher: 'أ. أحمد خالد', classes: 3, department: 'العلوم الاجتماعية' },
  { code: 'ENG202', name: 'اللغة الإنجليزية', teacher: 'أ. سارة حسين', classes: 6, department: 'اللغات' },
  { code: 'ART100', name: 'الفنون', teacher: 'أ. نورة سالم', classes: 2, department: 'الفنون' },
  { code: 'PE101', name: 'التربية البدنية', teacher: 'أ. علي حسن', classes: 8, department: 'الرياضة' },
  { code: 'CS301', name: 'علوم الحاسب', teacher: 'د. هند إبراهيم', classes: 3, department: 'التكنولوجيا' },
  { code: 'ARAB101', name: 'اللغة العربية', teacher: 'أ. خالد القحطاني', classes: 7, department: 'اللغات' },
  { code: 'GEO201', name: 'الجغرافيا', teacher: 'أ. أحمد خالد', classes: 2, department: 'العلوم الاجتماعية' },
];

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = subjectsData.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">المواد الدراسية</h1>
          <p className="text-muted-foreground">
            إدارة المواد الدراسية في مدرستك.
          </p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة مادة
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>قائمة المواد</CardTitle>
              <CardDescription>
                قائمة بجميع المواد التي يتم تدريسها في المؤسسة.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن المواد..."
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
                <TableHead>رمز المادة</TableHead>
                <TableHead>اسم المادة</TableHead>
                <TableHead className="hidden sm:table-cell">المعلم</TableHead>
                <TableHead className="hidden md:table-cell">القسم</TableHead>
                <TableHead className="text-left">عدد الفصول</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.code}>
                  <TableCell>
                    <div className="font-medium text-primary">{subject.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <BookCopy className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{subject.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{subject.teacher}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{subject.department}</Badge>
                  </TableCell>
                  <TableCell className="text-left">{subject.classes}</TableCell>
                </TableRow>
              ))}
               {filteredSubjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    لا توجد مواد تطابق بحثك.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
