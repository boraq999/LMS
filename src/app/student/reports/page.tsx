'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  FileText,
  Calendar,
  BookOpen,
  Award,
  Users,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Star,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

const academicReports = [
  {
    id: 1,
    title: 'تقرير الأداء الأكاديمي الشهري',
    description: 'تقرير شامل عن الأداء في جميع المواد الدراسية',
    type: 'academic',
    period: 'أغسطس 2024',
    generatedDate: '2024-08-15',
    status: 'ready',
    summary: {
      averageGrade: 94.2,
      totalSubjects: 6,
      improvement: '+2.1%',
      attendance: 98,
      completedAssignments: 15,
      upcomingExams: 2
    }
  },
  {
    id: 2,
    title: 'تقرير الحضور والغياب',
    description: 'تحليل مفصل لمعدل الحضور وأنماط الغياب',
    type: 'attendance',
    period: 'أغسطس 2024',
    generatedDate: '2024-08-14',
    status: 'ready',
    summary: {
      attendanceRate: 98,
      totalDays: 22,
      presentDays: 21,
      lateDays: 1,
      absentDays: 0,
      improvement: '+3%'
    }
  },
  {
    id: 3,
    title: 'تقرير الأنشطة والإنجازات',
    description: 'ملخص شامل للأنشطة المشاركة والإنجازات المحققة',
    type: 'activities',
    period: 'الفصل الأول 2024',
    generatedDate: '2024-08-10',
    status: 'ready',
    summary: {
      totalActivities: 12,
      completedActivities: 10,
      achievements: 8,
      totalPoints: 285,
      participationRate: 83
    }
  }
];

const performanceData = {
  subjects: [
    { name: 'الرياضيات', currentGrade: 94, previousGrade: 92, trend: 'up' },
    { name: 'العلوم', currentGrade: 91, previousGrade: 88, trend: 'up' },
    { name: 'التاريخ', currentGrade: 96, previousGrade: 95, trend: 'up' },
    { name: 'اللغة الإنجليزية', currentGrade: 89, previousGrade: 85, trend: 'up' },
    { name: 'الفنون', currentGrade: 97, previousGrade: 95, trend: 'up' },
    { name: 'التربية البدنية', currentGrade: 98, previousGrade: 100, trend: 'down' }
  ],
  monthlyTrend: [
    { month: 'يناير', grade: 88 },
    { month: 'فبراير', grade: 90 },
    { month: 'مارس', grade: 92 },
    { month: 'أبريل', grade: 91 },
    { month: 'مايو', grade: 93 },
    { month: 'يونيو', grade: 94 },
    { month: 'يوليو', grade: 92 },
    { month: 'أغسطس', grade: 94 }
  ]
};

const attendanceTrend = [
  { month: 'يناير', rate: 95 },
  { month: 'فبراير', rate: 97 },
  { month: 'مارس', rate: 96 },
  { month: 'أبريل', rate: 98 },
  { month: 'مايو', rate: 97 },
  { month: 'يونيو', rate: 99 },
  { month: 'يوليو', rate: 98 },
  { month: 'أغسطس', rate: 98 }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ready':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />جاهز</Badge>;
    case 'generating':
      return <Badge variant="outline"><Clock className="ml-1 h-3 w-3" />قيد الإنشاء</Badge>;
    case 'error':
      return <Badge variant="destructive"><AlertCircle className="ml-1 h-3 w-3" />خطأ</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    default:
      return <Target className="h-4 w-4 text-gray-500" />;
  }
};

export default function StudentReportsPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">التقارير والإحصائيات</h1>
          <p className="text-muted-foreground">
            عرض التقارير الشاملة والإحصائيات التفصيلية لأدائك الأكاديمي.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">الفصل الحالي</SelectItem>
              <SelectItem value="previous">الفصل الماضي</SelectItem>
              <SelectItem value="year">السنة الدراسية</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="ml-1 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعدل التراكمي</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              تحسن بنسبة 2.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              تحسن بنسبة 3%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإنجازات</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">إنجاز هذا الفصل</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">النقاط المكتسبة</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <p className="text-xs text-muted-foreground">نقطة إجمالية</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات التقارير */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="academic">الأداء الأكاديمي</TabsTrigger>
          <TabsTrigger value="attendance">الحضور</TabsTrigger>
          <TabsTrigger value="activities">الأنشطة</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  تطور المعدل التراكمي
                </CardTitle>
                <CardDescription>
                  تتبع تحسن الأداء الأكاديمي عبر الأشهر.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.monthlyTrend.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${data.grade}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold w-12 text-right">{data.grade}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  توزيع الدرجات حسب المادة
                </CardTitle>
                <CardDescription>
                  مقارنة الأداء في المواد المختلفة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{subject.name}</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(subject.trend)}
                          <span className="text-sm font-bold">{subject.currentGrade}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${subject.currentGrade}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* الأداء الأكاديمي */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  مقارنة الأداء
                </CardTitle>
                <CardDescription>
                  مقارنة الدرجات الحالية مع الفصل الماضي.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          السابق: {subject.previousGrade}%
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(subject.trend)}
                          <span className="font-bold text-lg">{subject.currentGrade}%</span>
                        </div>
                        <p className="text-sm text-green-600">
                          {subject.currentGrade > subject.previousGrade ? '+' : ''}
                          {subject.currentGrade - subject.previousGrade}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  الأهداف والإنجازات
                </CardTitle>
                <CardDescription>
                  تتبع الأهداف المحققة والمستقبلية.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">هدف محقق</h4>
                    </div>
                    <p className="text-green-700 text-sm">
                      تجاوز المعدل 90% في جميع المواد - تم تحقيقه بنسبة 94.2%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">الهدف القادم</h4>
                    </div>
                    <p className="text-blue-700 text-sm">
                      الوصول لمعدل 95% أو أكثر في الفصل القادم
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">يحتاج تحسين</h4>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      مادة اللغة الإنجليزية تحتاج مزيد من التركيز
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* الحضور */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                تطور معدل الحضور
              </CardTitle>
              <CardDescription>
                تتبع معدل الحضور عبر الأشهر.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceTrend.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full" 
                          style={{ width: `${data.rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{data.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأنشطة */}
        <TabsContent value="activities" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  الإنجازات المحققة
                </CardTitle>
                <CardDescription>
                  ملخص الإنجازات والجوائز المحصلة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">بطل الرياضيات</span>
                    </div>
                    <span className="text-yellow-600 font-bold">+100 نقطة</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">فنان المستقبل</span>
                    </div>
                    <span className="text-purple-600 font-bold">+75 نقطة</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">صديق البيئة</span>
                    </div>
                    <span className="text-green-600 font-bold">+60 نقطة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  أهداف الأنشطة
                </CardTitle>
                <CardDescription>
                  الأهداف المستقبلية في الأنشطة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">الهدف الحالي</h4>
                    <p className="text-blue-700 text-sm">المشاركة في 15 نشاط هذا العام</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">12/15 نشاط (80%)</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">الهدف التالي</h4>
                    <p className="text-green-700 text-sm">الوصول لـ 300 نقطة إجمالية</p>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">285/300 نقطة (95%)</p>
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
