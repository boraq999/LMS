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
import { Input } from '@/components/ui/input';
import { 
  Library, 
  BookOpen, 
  Download, 
  Eye,
  Search,
  Filter,
  FileText,
  Video,
  Image,
  Music,
  Archive,
  Star,
  Clock,
  User,
  Calendar,
  Tag
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

const digitalResources = [
  {
    id: 1,
    title: 'كتاب الرياضيات للصف الخامس',
    author: 'وزارة التربية والتعليم',
    type: 'book',
    subject: 'الرياضيات',
    grade: 'الصف الخامس',
    description: 'كتاب شامل لمادة الرياضيات للفصل الدراسي الأول',
    size: '15.2 MB',
    downloads: 1250,
    rating: 4.8,
    uploadDate: '2024-08-01',
    thumbnail: '/api/placeholder/150/200'
  },
  {
    id: 2,
    title: 'فيديو تعليمي: الخلية النباتية',
    author: 'أ. فاطمة علي',
    type: 'video',
    subject: 'العلوم',
    grade: 'الصف الخامس',
    description: 'شرح تفصيلي لمكونات الخلية النباتية مع الرسوم التوضيحية',
    size: '45.8 MB',
    downloads: 890,
    rating: 4.9,
    uploadDate: '2024-08-05',
    thumbnail: '/api/placeholder/150/100'
  },
  {
    id: 3,
    title: 'ملخص دروس التاريخ',
    author: 'أ. أحمد خالد',
    type: 'document',
    subject: 'التاريخ',
    grade: 'الصف الخامس',
    description: 'ملخص شامل لجميع دروس التاريخ للفصل الدراسي الأول',
    size: '8.5 MB',
    downloads: 2100,
    rating: 4.7,
    uploadDate: '2024-07-28',
    thumbnail: '/api/placeholder/150/200'
  },
  {
    id: 4,
    title: 'تمارين اللغة الإنجليزية',
    author: 'أ. سارة حسين',
    type: 'document',
    subject: 'اللغة الإنجليزية',
    grade: 'الصف الخامس',
    description: 'مجموعة شاملة من التمارين والممارسات',
    size: '12.3 MB',
    downloads: 1650,
    rating: 4.6,
    uploadDate: '2024-08-03',
    thumbnail: '/api/placeholder/150/200'
  },
  {
    id: 5,
    title: 'صور تعليمية: أعضاء جسم الإنسان',
    author: 'أ. فاطمة علي',
    type: 'image',
    subject: 'العلوم',
    grade: 'الصف الخامس',
    description: 'مجموعة من الصور التوضيحية لأعضاء جسم الإنسان',
    size: '25.6 MB',
    downloads: 980,
    rating: 4.8,
    uploadDate: '2024-08-08',
    thumbnail: '/api/placeholder/150/200'
  },
  {
    id: 6,
    title: 'نموذج امتحان الرياضيات',
    author: 'أ. محمد عبدالله',
    type: 'document',
    subject: 'الرياضيات',
    grade: 'الصف الخامس',
    description: 'نموذج امتحان تجريبي مع الحلول',
    size: '6.7 MB',
    downloads: 3200,
    rating: 4.9,
    uploadDate: '2024-08-10',
    thumbnail: '/api/placeholder/150/200'
  }
];

const categories = [
  { id: 'all', label: 'الكل', count: digitalResources.length },
  { id: 'books', label: 'الكتب', count: digitalResources.filter(r => r.type === 'book').length },
  { id: 'videos', label: 'الفيديوهات', count: digitalResources.filter(r => r.type === 'video').length },
  { id: 'documents', label: 'الوثائق', count: digitalResources.filter(r => r.type === 'document').length },
  { id: 'images', label: 'الصور', count: digitalResources.filter(r => r.type === 'image').length }
];

const subjects = ['الكل', 'الرياضيات', 'العلوم', 'التاريخ', 'اللغة الإنجليزية', 'الفنون'];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'book':
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case 'video':
      return <Video className="h-5 w-5 text-red-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-green-500" />;
    case 'image':
      return <Image className="h-5 w-5 text-purple-500" />;
    case 'audio':
      return <Music className="h-5 w-5 text-orange-500" />;
    default:
      return <Archive className="h-5 w-5 text-gray-500" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'book':
      return 'كتاب';
    case 'video':
      return 'فيديو';
    case 'document':
      return 'وثيقة';
    case 'image':
      return 'صورة';
    case 'audio':
      return 'صوتي';
    default:
      return 'ملف';
  }
};

const getSubjectColor = (subject: string) => {
  switch (subject) {
    case 'الرياضيات':
      return 'bg-blue-100 text-blue-800';
    case 'العلوم':
      return 'bg-green-100 text-green-800';
    case 'التاريخ':
      return 'bg-yellow-100 text-yellow-800';
    case 'اللغة الإنجليزية':
      return 'bg-red-100 text-red-800';
    case 'الفنون':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function StudentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('الكل');
  const [selectedTab, setSelectedTab] = useState('resources');

  const filteredResources = digitalResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
    const matchesSubject = selectedSubject === 'الكل' || resource.subject === selectedSubject;
    
    return matchesSearch && matchesCategory && matchesSubject;
  });

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">المكتبة الرقمية</h1>
        <p className="text-muted-foreground">
          استكشف الموارد التعليمية الرقمية والكتب والمراجع المتاحة.
        </p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموارد</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{digitalResources.length}</div>
            <p className="text-xs text-muted-foreground">مورد تعليمي متاح</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الكتب</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{digitalResources.filter(r => r.type === 'book').length}</div>
            <p className="text-xs text-muted-foreground">كتاب رقمي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفيديوهات</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{digitalResources.filter(r => r.type === 'video').length}</div>
            <p className="text-xs text-muted-foreground">فيديو تعليمي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الوثائق</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{digitalResources.filter(r => r.type === 'document').length}</div>
            <p className="text-xs text-muted-foreground">وثيقة تعليمية</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات المكتبة */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources">الموارد</TabsTrigger>
          <TabsTrigger value="favorites">المفضلة</TabsTrigger>
          <TabsTrigger value="downloads">التحميلات</TabsTrigger>
        </TabsList>

        {/* الموارد */}
        <TabsContent value="resources" className="space-y-4">
          {/* فلاتر البحث */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                البحث والفلترة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في الموارد..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المادة" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* قائمة الموارد */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(resource.type)}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">
                    بواسطة {resource.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    <Badge className={`text-xs ${getSubjectColor(resource.subject)}`}>
                      {resource.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {resource.grade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{resource.size}</span>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 ml-1" />
                      معاينة
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 ml-1" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Library className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد موارد</h3>
                <p className="text-muted-foreground text-center">
                  لم يتم العثور على موارد تطابق معايير البحث الخاصة بك.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* المفضلة */}
        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Star className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد موارد مفضلة</h3>
              <p className="text-muted-foreground text-center">
                أضف موارد إلى قائمة المفضلة بالضغط على أيقونة النجمة.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحميلات */}
        <TabsContent value="downloads" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Download className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد تحميلات</h3>
              <p className="text-muted-foreground text-center">
                ستظهر هنا الموارد التي قمت بتحميلها.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
