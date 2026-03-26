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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  BarChart3,
  Target,
  Star,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';

const gradesData = {
  'الرياضيات': {
    teacher: 'أ. محمد عبدالله',
    finalGrade: 92,
    previousGrade: 89,
    trend: 'up',
    assessments: [
      { type: 'واجب', name: 'الجبر الخطي', grade: 95, date: '2024-01-15', maxGrade: 100 },
      { type: 'اختبار قصير', name: 'التفاضل', grade: 88, date: '2024-01-22', maxGrade: 100 },
      { type: 'مشروع', name: 'نمذجة البيانات', grade: 90, date: '2024-02-01', maxGrade: 100 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 91, date: '2024-02-15', maxGrade: 100 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 94, date: '2024-03-01', maxGrade: 100 },
    ]
  },
  'العلوم': {
    teacher: 'أ. فاطمة علي',
    finalGrade: 88,
    previousGrade: 92,
    trend: 'down',
    assessments: [
      { type: 'واجب', name: 'تقرير معمل', grade: 90, date: '2024-01-18', maxGrade: 100 },
      { type: 'اختبار قصير', name: 'الخلية النباتية', grade: 85, date: '2024-01-25', maxGrade: 100 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 86, date: '2024-02-10', maxGrade: 100 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 90, date: '2024-02-28', maxGrade: 100 },
    ]
  },
  'التاريخ': {
    teacher: 'أ. أحمد خالد',
    finalGrade: 95,
    previousGrade: 93,
    trend: 'up',
    assessments: [
      { type: 'واجب', name: 'بحث عن الثورة', grade: 98, date: '2024-01-20', maxGrade: 100 },
      { type: 'اختبار قصير', name: 'الحرب العالمية', grade: 92, date: '2024-01-28', maxGrade: 100 },
      { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 94, date: '2024-02-12', maxGrade: 100 },
      { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 96, date: '2024-03-05', maxGrade: 100 },
    ]
  },
  'اللغة الإنجليزية': {
    teacher: 'أ. سارة حسين',
    finalGrade: 85,
    previousGrade: 87,
    trend: 'down',
    assessments: [
        { type: 'واجب', name: 'مقال وصفي', grade: 88, date: '2024-01-16', maxGrade: 100 },
        { type: 'اختبار قصير', name: 'قواعد', grade: 82, date: '2024-01-24', maxGrade: 100 },
        { type: 'مشروع', name: 'عرض تقديمي', grade: 84, date: '2024-02-05', maxGrade: 100 },
        { type: 'امتحان نصفي', name: 'الامتحان النصفي', grade: 85, date: '2024-02-18', maxGrade: 100 },
        { type: 'امتحان نهائي', name: 'الامتحان النهائي', grade: 87, date: '2024-03-03', maxGrade: 100 },
    ]
  },
};

const getGradeBadge = (grade: number) => {
  if (grade >= 90) return <Badge className="bg-green-500 hover:bg-green-600 text-white">{grade}</Badge>;
  if (grade >= 80) return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{grade}</Badge>;
  if (grade >= 70) return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">{grade}</Badge>;
  if (grade >= 50) return <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">{grade}</Badge>;
  return <Badge variant="destructive">{grade}</Badge>;
};

const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'text-green-600';
  if (grade >= 80) return 'text-blue-600';
  if (grade >= 70) return 'text-yellow-600';
  if (grade >= 50) return 'text-orange-600';
  return 'text-red-600';
};

const getGradeLevel = (grade: number) => {
  if (grade >= 90) return 'ممتاز';
  if (grade >= 80) return 'جيد جداً';
  if (grade >= 70) return 'جيد';
  if (grade >= 50) return 'مقبول';
  return 'ضعيف';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ar-SA');
};


export default function StudentGradesPage() {
    const [selectedSubject, setSelectedSubject] = useState(Object.keys(gradesData)[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    
    const subjectData = gradesData[selectedSubject as keyof typeof gradesData];
    
    // Calculate statistics
    const stats = useMemo(() => {
        const allGrades = Object.values(gradesData).flatMap(subject => 
            subject.assessments.map(assessment => assessment.grade)
        );
        const average = allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length;
        const highest = Math.max(...allGrades);
        const lowest = Math.min(...allGrades);
        const excellent = allGrades.filter(grade => grade >= 90).length;
        
        return { average: Math.round(average), highest, lowest, excellent };
    }, []);

    // Filter assessments
    const filteredAssessments = useMemo(() => {
        if (!subjectData) return [];
        
        return subjectData.assessments.filter(assessment => {
            const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                assessment.type.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'all' || assessment.type === filterType;
            return matchesSearch && matchesFilter;
        });
    }, [subjectData, searchTerm, filterType]);

    // Get unique assessment types
    const assessmentTypes = useMemo(() => {
        if (!subjectData) return [];
        return [...new Set(subjectData.assessments.map(a => a.type))];
    }, [subjectData]);

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            الدرجات الأكاديمية
          </h1>
          <p className="text-muted-foreground">
            تتبع تقدمك الأكاديمي وعرض تفاصيل درجاتك بطرق تفاعلية متنوعة
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="اختر المادة" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(gradesData).map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المعدل العام</p>
                <p className="text-2xl font-bold text-green-600">{stats.average}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">أعلى درجة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.highest}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">درجات ممتاز</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.excellent}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">عدد المواد</p>
                <p className="text-2xl font-bold text-purple-600">{Object.keys(gradesData).length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Details */}
      {subjectData && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
            <TabsTrigger value="progress">التقدم</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {selectedSubject}
                  </CardTitle>
                  <CardDescription>
                    المعلم: {subjectData.teacher}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">الدرجة النهائية</span>
                    <div className="flex items-center gap-2">
                      {subjectData.trend === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`text-2xl font-bold ${getGradeColor(subjectData.finalGrade)}`}>
                        {subjectData.finalGrade}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>مستوى الأداء</span>
                      <span className={getGradeColor(subjectData.finalGrade)}>
                        {getGradeLevel(subjectData.finalGrade)}
                      </span>
                    </div>
                    <Progress value={subjectData.finalGrade} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التغيير من الفصل السابق</span>
                    <span className={subjectData.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {subjectData.trend === 'up' ? '+' : ''}{subjectData.finalGrade - subjectData.previousGrade}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Grades */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    آخر التقييمات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subjectData.assessments.slice(-3).map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{assessment.name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(assessment.date)}</p>
                        </div>
                        {getGradeBadge(assessment.grade)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في التقييمات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="نوع التقييم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      {assessmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Grades Table */}
            <Card>
              <CardHeader>
                <CardTitle>جميع التقييمات</CardTitle>
                <CardDescription>
                  عرض تفصيلي لجميع التقييمات والدرجات في {selectedSubject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>اسم التقييم</TableHead>
                      <TableHead className="text-center">الدرجة</TableHead>
                      <TableHead className="text-center">النسبة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.map((assessment, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(assessment.date)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assessment.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{assessment.name}</TableCell>
                        <TableCell className="text-center">
                          {getGradeBadge(assessment.grade)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="w-20 mx-auto">
                            <Progress value={assessment.grade} className="h-2" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>اتجاه الدرجات</CardTitle>
                  <CardDescription>تطور درجاتك عبر الوقت</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.assessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm font-medium">{assessment.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={assessment.grade} className="w-20 h-2" />
                          <span className={`text-sm font-medium ${getGradeColor(assessment.grade)}`}>
                            {assessment.grade}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>تحليل الأداء</CardTitle>
                  <CardDescription>إحصائيات مفصلة عن أدائك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(subjectData.assessments.reduce((sum, a) => sum + a.grade, 0) / subjectData.assessments.length)}%
                      </p>
                      <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {subjectData.assessments.length}
                      </p>
                      <p className="text-sm text-muted-foreground">عدد التقييمات</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">توزيع الدرجات:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>ممتاز (90+)</span>
                        <span>{subjectData.assessments.filter(a => a.grade >= 90).length}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>جيد جداً (80-89)</span>
                        <span>{subjectData.assessments.filter(a => a.grade >= 80 && a.grade < 90).length}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>جيد (70-79)</span>
                        <span>{subjectData.assessments.filter(a => a.grade >= 70 && a.grade < 80).length}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>أقل من 70</span>
                        <span>{subjectData.assessments.filter(a => a.grade < 70).length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {!subjectData && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="rounded-full border border-dashed p-6">
            <Info className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">الرجاء اختيار مادة</h3>
            <p className="text-muted-foreground max-w-sm">
              اختر مادة من القائمة أعلاه لعرض تفاصيل الدرجات والإحصائيات.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
