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
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, TrendingDown, CircleDot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const studentsData = [
  { id: 'STU-001', name: 'ليام جونسون', class: 'الصف 5-أ', lastGrade: 95, attendance: '98%', status: 'نشط' },
  { id: 'STU-002', name: 'أوليفيا سميث', class: 'الصف 5-أ', lastGrade: 88, attendance: '92%', status: 'متغيب' },
  { id: 'STU-003', name: 'نوح ويليامز', class: 'الصف 5-ب', lastGrade: 92, attendance: '100%', status: 'نشط' },
  { id: 'STU-004', name: 'إيما براون', class: 'الصف 5-ب', lastGrade: 78, attendance: '85%', status: 'يحتاج متابعة' },
  { id: 'STU-005', name: 'جيمس جونز', class: 'الصف 6-أ', lastGrade: 85, attendance: '95%', status: 'نشط' },
  { id: 'STU-006', name: 'صوفيا ديفيس', class: 'الصف 6-أ', lastGrade: 98, attendance: '99%', status: 'نشط' },
  { id: 'STU-007', name: 'بنجامين ميلر', class: 'الصف 6-ب', lastGrade: 81, attendance: '90%', status: 'نشط' },
  { id: 'STU-008', name: 'إيزابيلا ويلسون', class: 'الصف 6-ب', lastGrade: 75, attendance: '88%', status: 'يحتاج متابعة' },
];

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case 'متغيب':
        return <Badge variant="destructive">{status}</Badge>;
      case 'يحتاج متابعة':
        return <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">طلابي</h1>
          <p className="text-muted-foreground">
            عرض وإدارة قائمة طلابك.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>قائمة الطلاب</CardTitle>
              <CardDescription>
                قائمة بجميع الطلاب في فصولك الدراسية.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث بالاسم أو الفصل..."
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
                <TableHead>الطالب</TableHead>
                <TableHead className="hidden sm:table-cell">الفصل</TableHead>
                <TableHead className="hidden md:table-cell">آخر درجة</TableHead>
                <TableHead className="hidden md:table-cell text-center">الحضور</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://picsum.photos/seed/${student.name}/40/40`} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{student.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{student.class}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        {student.lastGrade >= 80 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {student.lastGrade}%
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-center md:table-cell">{student.attendance}</TableCell>
                    <TableCell className="text-left">{getStatusBadge(student.status)}</TableCell>
                    <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                            عرض التفاصيل
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    لم يتم العثور على طلاب يطابقون بحثك.
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
