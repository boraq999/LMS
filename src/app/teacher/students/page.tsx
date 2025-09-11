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
import { PlusCircle, Search, Eye, FileText, BarChart2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const studentsData = [
  { id: 'STU-001', name: 'ليام جونسون', avatar: 'liam', class: 'الصف 5-أ', lastGrade: 92, attendance: '98%' },
  { id: 'STU-004', name: 'إيما براون', avatar: 'emma', class: 'الصف 5-ب', lastGrade: 85, attendance: '91%' },
  { id: 'STU-006', name: 'صوفيا ديفيس', avatar: 'sophia', class: 'الصف 6-أ', lastGrade: 95, attendance: '100%' },
  { id: 'STU-009', name: 'إيثان مور', avatar: 'ethan', class: 'الصف 6-ب', lastGrade: 88, attendance: '94%' },
  { id: 'STU-012', name: 'أوليفيا مارتن', avatar: 'olivia', class: 'الصف 5-أ', lastGrade: 89, attendance: '96%' },
  { id: 'STU-015', name: 'لوغان غارسيا', avatar: 'logan', class: 'الصف 6-أ', lastGrade: 91, attendance: '99%' },
  { id: 'STU-018', name: 'كلوي رودريغيز', avatar: 'chloe', class: 'الصف 5-ب', lastGrade: 82, attendance: '88%' },
];


export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return <Badge className="bg-green-500 hover:bg-green-600">{grade}%</Badge>;
    if (grade >= 80) return <Badge className="bg-blue-500 hover:bg-blue-600">{grade}%</Badge>;
    if (grade >= 70) return <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">{grade}%</Badge>;
    return <Badge variant="destructive">{grade}%</Badge>;
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">طلابي</h1>
          <p className="text-muted-foreground">
            إدارة وعرض معلومات الطلاب في فصولك.
          </p>
        </div>
         <div className="relative">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type="search"
            placeholder="ابحث عن طالب..."
            className="w-full rounded-lg bg-input pr-8 sm:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>قائمة الطلاب</CardTitle>
            <CardDescription>
                نظرة شاملة على جميع الطلاب في فصولك الدراسية.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead className="hidden sm:table-cell">الفصل</TableHead>
                <TableHead className="hidden md:table-cell text-center">آخر درجة</TableHead>
                <TableHead className="hidden md:table-cell text-center">نسبة الحضور</TableHead>
                <TableHead className="text-center">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://picsum.photos/seed/${student.avatar}/40/40`} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-sm text-muted-foreground md:hidden">{student.class}</span>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{student.class}</TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {getGradeBadge(student.lastGrade)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <Badge variant="outline">{student.attendance}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" title="عرض الملف الشخصي">
                        <Eye className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="عرض الدرجات">
                        <BarChart2 className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="عرض الواجبات">
                        <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    لا يوجد طلاب يطابقون بحثك.
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
