'use client';

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
import { 
  Calendar, 
  Clock, 
  FileText, 
  Download,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  BookOpen,
  Users
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useState } from 'react';

const upcomingExams = [
  {
    id: 1,
    subject: 'الرياضيات',
    teacher: 'أ. محمد عبدالله',
    type: 'امتحان نصفي',
    date: '2024-08-20',
    time: '09:00 - 11:00',
    location: 'قاعة 101',
    duration: 'ساعتان',
    status: 'upcoming',
    description: 'امتحان نصفي في الجبر والهندسة'
  },
  {
    id: 2,
    subject: 'العلوم',
    teacher: 'أ. فاطمة علي',
    type: 'اختبار قصير',
    date: '2024-08-22',
    time: '10:00 - 10:30',
    location: 'قاعة 102',
    duration: 'نصف ساعة',
    status: 'upcoming',
    description: 'اختبار في الخلية النباتية'
  },
  {
    id: 3,
    subject: 'التاريخ',
    teacher: 'أ. أحمد خالد',
    type: 'امتحان نهائي',
    date: '2024-08-25',
    time: '08:00 - 10:00',
    location: 'قاعة 103',
    duration: 'ساعتان',
    status: 'upcoming',
    description: 'امتحان نهائي في التاريخ الحديث'
  }
];

const completedExams = [
  {
    id: 4,
    subject: 'اللغة الإنجليزية',
    teacher: 'أ. سارة حسين',
    type: 'امتحان نصفي',
    date: '2024-08-10',
    score: 87,
    maxScore: 100,
    status: 'completed',
    grade: 'B+',
    feedback: 'أداء جيد، لكن يحتاج تحسين في القواعد'
  },
  {
    id: 5,
    subject: 'الفنون',
    teacher: 'أ. نورة سالم',
    type: 'مشروع عملي',
    date: '2024-08-08',
    score: 95,
    maxScore: 100,
    status: 'completed',
    grade: 'A',
    feedback: 'مشروع ممتاز، إبداع رائع'
  },
  {
    id: 6,
    subject: 'الرياضيات',
    teacher: 'أ. محمد عبدالله',
    type: 'اختبار قصير',
    date: '2024-08-05',
    score: 92,
    maxScore: 100,
    status: 'completed',
    grade: 'A-',
    feedback: 'أداء ممتاز، استمر في هذا المستوى'
  }
];

const examResults = [
  {
    subject: 'الرياضيات',
    exams: [
      { type: 'اختبار قصير', score: 92, date: '2024-08-05' },
      { type: 'امتحان نصفي', score: 88, date: '2024-07-15' },
      { type: 'واجب', score: 95, date: '2024-07-20' }
    ],
    average: 91.7
  },
  {
    subject: 'العلوم',
    exams: [
      { type: 'اختبار قصير', score: 85, date: '2024-08-01' },
      { type: 'مشروع', score: 90, date: '2024-07-25' },
      { type: 'واجب', score: 88, date: '2024-07-30' }
    ],
    average: 87.7
  },
  {
    subject: 'التاريخ',
    exams: [
      { type: 'مقالة', score: 94, date: '2024-08-02' },
      { type: 'امتحان نصفي', score: 96, date: '2024-07-18' },
      { type: 'عرض تقديمي', score: 92, date: '2024-07-22' }
    ],
    average: 94.0
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="outline"><Clock className="ml-1 h-3 w-3" />قادم</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />مكتمل</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A':
    case 'A+':
      return 'text-green-600';
    case 'A-':
    case 'B+':
      return 'text-blue-600';
    case 'B':
    case 'B-':
      return 'text-yellow-600';
    case 'C':
    case 'C+':
    case 'C-':
      return 'text-orange-600';
    default:
      return 'text-red-600';
  }
};

export default function StudentExamsPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الامتحانات والنتائج</h1>
        <p className="text-muted-foreground">
          عرض الامتحانات القادمة والنتائج السابقة مع التحليلات التفصيلية.
        </p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الامتحانات القادمة</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">امتحانات هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الدرجات</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.1%</div>
            <p className="text-xs text-muted-foreground">تحسن بنسبة 2.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أعلى درجة</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">في مادة الفنون</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الامتحانات المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedExams.length}</div>
            <p className="text-xs text-muted-foreground">هذا الفصل</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات الامتحانات */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">القادمة ({upcomingExams.length})</TabsTrigger>
          <TabsTrigger value="completed">النتائج ({completedExams.length})</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* الامتحانات القادمة */}
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                الامتحانات القادمة
              </CardTitle>
              <CardDescription>
                جدولة الامتحانات القادمة مع التفاصيل الكاملة.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">{exam.subject}</h3>
                            <Badge variant="outline">{exam.type}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{exam.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(exam.date).toLocaleDateString('ar-SA')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{exam.teacher}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{exam.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(exam.status)}
                          <Button variant="outline" size="sm">
                            <Download className="ml-1 h-4 w-4" />
                            تحميل النموذج
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* نتائج الامتحانات */}
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                نتائج الامتحانات
              </CardTitle>
              <CardDescription>
                عرض نتائج الامتحانات المكتملة مع التقييمات.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">المادة</TableHead>
                    <TableHead className="text-center">نوع الامتحان</TableHead>
                    <TableHead className="text-center">التاريخ</TableHead>
                    <TableHead className="text-center">الدرجة</TableHead>
                    <TableHead className="text-center">التقدير</TableHead>
                    <TableHead className="text-center">التقييم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="text-center font-medium">{exam.subject}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{exam.type}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(exam.date).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold">{exam.score}/{exam.maxScore}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-bold ${getGradeColor(exam.grade)}`}>
                          {exam.grade}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {exam.score >= 90 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="text-sm">{exam.feedback}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  متوسط الدرجات حسب المادة
                </CardTitle>
                <CardDescription>
                  تحليل الأداء في كل مادة دراسية.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examResults.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.subject}</span>
                        <span className="font-bold text-lg">{subject.average}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${subject.average}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {subject.exams.length} امتحان
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  تطور الأداء
                </CardTitle>
                <CardDescription>
                  تتبع تحسن الأداء عبر الوقت.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">تحسن الأداء</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      تحسن متوسط درجاتك بنسبة 2.3% هذا الفصل مقارنة بالفصل الماضي.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">أقوى مادة</span>
                      <span className="text-blue-600 font-bold">التاريخ (94%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">أضعف مادة</span>
                      <span className="text-yellow-600 font-bold">العلوم (87.7%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">الهدف القادم</span>
                      <span className="text-green-600 font-bold">تحسين العلوم</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
