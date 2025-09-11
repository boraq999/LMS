'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, FileText, BarChart2, User, Users } from 'lucide-react';
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


export default function TeacherStudents2Page() {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">طلابي 2</h1>
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
      
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStudents.map((student) => (
            <Card key={student.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${student.avatar}/40/40`} alt={student.name} data-ai-hint="student avatar" />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{student.name}</CardTitle>
                                <CardDescription>{student.class}</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">آخر درجة</span>
                        {getGradeBadge(student.lastGrade)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">نسبة الحضور</span>
                        <Badge variant="outline">{student.attendance}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-4 pt-0">
                    <Button variant="ghost" size="icon" title="عرض الملف الشخصي" className="flex-1">
                        <Eye className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="عرض الدرجات" className="flex-1">
                        <BarChart2 className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="عرض الواجبات" className="flex-1">
                        <FileText className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        ))}
       </div>
       {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center md:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="rounded-full border border-dashed p-6">
                <Users className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">لم يتم العثور على طلاب</h3>
                <p className="text-muted-foreground max-w-sm">
                  بحثك عن "{searchTerm}" لم يطابق أي طالب.
                </p>
              </div>
            </div>
        )}
    </main>
  );
}
