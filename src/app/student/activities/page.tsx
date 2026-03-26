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
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Award,
  Star,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Music,
  Palette,
  Gamepad2,
  Heart,
  Zap
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

const activities = [
  {
    id: 1,
    title: 'مسابقة الرياضيات الوطنية',
    description: 'مسابقة سنوية في الرياضيات لطلاب الصف الخامس',
    type: 'academic',
    category: 'مسابقة',
    date: '2024-09-15',
    time: '09:00 - 12:00',
    location: 'قاعة المؤتمرات الرئيسية',
    capacity: 50,
    registered: 32,
    status: 'upcoming',
    organizer: 'إدارة المدرسة',
    requirements: 'تسجيل مسبق - إحضار أدوات الكتابة',
    prize: 'شهادة تفوق + جائزة مالية 500 د.ل',
    isRegistered: true
  },
  {
    id: 2,
    title: 'ورشة البرمجة للطلاب',
    description: 'ورشة تعليمية في أساسيات البرمجة باستخدام Scratch',
    type: 'workshop',
    category: 'تقنية',
    date: '2024-09-20',
    time: '14:00 - 16:00',
    location: 'معمل الحاسوب',
    capacity: 20,
    registered: 15,
    status: 'upcoming',
    organizer: 'أ. أحمد التكنولوجيا',
    requirements: 'لا توجد متطلبات مسبقة',
    prize: 'شهادة مشاركة',
    isRegistered: false
  },
  {
    id: 3,
    title: 'معرض الفنون الطلابي',
    description: 'عرض الأعمال الفنية واللوحات التي أبدعها الطلاب',
    type: 'exhibition',
    category: 'فني',
    date: '2024-08-25',
    time: '10:00 - 15:00',
    location: 'قاعة الأنشطة',
    capacity: 100,
    registered: 85,
    status: 'upcoming',
    organizer: 'أ. نورة الفنون',
    requirements: 'تسليم الأعمال قبل أسبوع من المعرض',
    prize: 'جوائز لأفضل 3 أعمال',
    isRegistered: true
  },
  {
    id: 4,
    title: 'رحلة علمية للمتحف الوطني',
    description: 'رحلة تعليمية لاستكشاف التراث والتاريخ الليبي',
    type: 'field_trip',
    category: 'تعليمي',
    date: '2024-09-05',
    time: '08:00 - 14:00',
    location: 'المتحف الوطني - طرابلس',
    capacity: 40,
    registered: 38,
    status: 'upcoming',
    organizer: 'أ. أحمد التاريخ',
    requirements: 'موافقة ولي الأمر - إحضار وجبة غداء',
    prize: 'شهادة مشاركة في الرحلة',
    isRegistered: false
  },
  {
    id: 5,
    title: 'بطولة كرة القدم المدرسية',
    description: 'بطولة كرة قدم بين فصول الصف الخامس',
    type: 'sports',
    category: 'رياضي',
    date: '2024-09-10',
    time: '15:00 - 17:00',
    location: 'ملعب المدرسة',
    capacity: 24,
    registered: 24,
    status: 'upcoming',
    organizer: 'أ. علي الرياضة',
    requirements: 'الزي الرياضي - لياقة بدنية جيدة',
    prize: 'كأس البطولة + ميداليات ذهبية',
    isRegistered: true
  }
];

const completedActivities = [
  {
    id: 6,
    title: 'أسبوع العلوم والتكنولوجيا',
    description: 'فعاليات وأنشطة علمية متنوعة',
    type: 'academic',
    category: 'علمي',
    date: '2024-07-15',
    status: 'completed',
    organizer: 'أ. فاطمة العلوم',
    achievement: 'شهادة مشاركة ممتازة',
    points: 50
  },
  {
    id: 7,
    title: 'مسابقة الشعر والأدب',
    description: 'مسابقة في كتابة الشعر والأدب العربي',
    type: 'literary',
    category: 'أدبي',
    date: '2024-07-08',
    status: 'completed',
    organizer: 'أ. سارة اللغة العربية',
    achievement: 'المركز الثاني',
    points: 75
  }
];

const achievements = [
  {
    id: 1,
    title: 'بطل الرياضيات',
    description: 'فاز بمسابقة الرياضيات المدرسية',
    date: '2024-08-01',
    icon: Trophy,
    color: 'text-yellow-600',
    points: 100
  },
  {
    id: 2,
    title: 'فنان المستقبل',
    description: 'شارك في معرض الفنون وحصل على إشادة خاصة',
    date: '2024-07-25',
    icon: Palette,
    color: 'text-purple-600',
    points: 75
  },
  {
    id: 3,
    title: 'عاشق القراءة',
    description: 'قرأ 20 كتاباً في الشهر الماضي',
    date: '2024-08-05',
    icon: BookOpen,
    color: 'text-blue-600',
    points: 50
  },
  {
    id: 4,
    title: 'صديق البيئة',
    description: 'قاد حملة تنظيف المدرسة',
    date: '2024-07-20',
    icon: Heart,
    color: 'text-green-600',
    points: 60
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'academic':
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case 'workshop':
      return <Zap className="h-5 w-5 text-purple-500" />;
    case 'exhibition':
      return <Palette className="h-5 w-5 text-pink-500" />;
    case 'field_trip':
      return <MapPin className="h-5 w-5 text-green-500" />;
    case 'sports':
      return <Gamepad2 className="h-5 w-5 text-orange-500" />;
    case 'literary':
      return <BookOpen className="h-5 w-5 text-indigo-500" />;
    default:
      return <Calendar className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="outline"><Clock className="ml-1 h-3 w-3" />قادم</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />مكتمل</Badge>;
    case 'cancelled':
      return <Badge variant="destructive"><XCircle className="ml-1 h-3 w-3" />ملغي</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'مسابقة':
      return 'bg-yellow-100 text-yellow-800';
    case 'تقنية':
      return 'bg-blue-100 text-blue-800';
    case 'فني':
      return 'bg-pink-100 text-pink-800';
    case 'تعليمي':
      return 'bg-green-100 text-green-800';
    case 'رياضي':
      return 'bg-orange-100 text-orange-800';
    case 'علمي':
      return 'bg-purple-100 text-purple-800';
    case 'أدبي':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function StudentActivitiesPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingActivities = activities.filter(activity => activity.status === 'upcoming');
  const registeredActivities = activities.filter(activity => activity.isRegistered);

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الأنشطة والفعاليات</h1>
        <p className="text-muted-foreground">
          استكشف الأنشطة المتاحة وشارك في الفعاليات المدرسية واكتشف إنجازاتك.
        </p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأنشطة المسجلة</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredActivities.length}</div>
            <p className="text-xs text-muted-foreground">نشاط مسجل</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإنجازات</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">إنجاز محقق</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">النقاط المكتسبة</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {achievements.reduce((sum, achievement) => sum + achievement.points, 0)}
            </div>
            <p className="text-xs text-muted-foreground">نقطة إجمالية</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأنشطة المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedActivities.length}</div>
            <p className="text-xs text-muted-foreground">نشاط مكتمل</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات الأنشطة */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">القادمة ({upcomingActivities.length})</TabsTrigger>
          <TabsTrigger value="registered">المسجلة ({registeredActivities.length})</TabsTrigger>
          <TabsTrigger value="completed">المكتملة</TabsTrigger>
          <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
        </TabsList>

        {/* الأنشطة القادمة */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(activity.type)}
                      <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </Badge>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.registered}/{activity.capacity} مسجل</span>
                    </div>
                  </div>
                  
                  {activity.requirements && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">المتطلبات:</h4>
                      <p className="text-xs text-muted-foreground">{activity.requirements}</p>
                    </div>
                  )}
                  
                  {activity.prize && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        الجائزة:
                      </h4>
                      <p className="text-xs text-muted-foreground">{activity.prize}</p>
                    </div>
                  )}
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {activity.isRegistered ? (
                      <Button variant="outline" className="flex-1" disabled>
                        <CheckCircle className="h-4 w-4 ml-1" />
                        مسجل
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        <Users className="h-4 w-4 ml-1" />
                        تسجيل
                      </Button>
                    )}
                    <Button variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الأنشطة المسجلة */}
        <TabsContent value="registered" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {registeredActivities.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(activity.type)}
                      <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </Badge>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="ml-1 h-3 w-3" />
                      مسجل
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 ml-1" />
                      التفاصيل
                    </Button>
                    <Button variant="destructive" size="sm">
                      إلغاء التسجيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الأنشطة المكتملة */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {completedActivities.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(activity.type)}
                      <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </Badge>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="ml-1 h-3 w-3" />
                      مكتمل
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>تاريخ النشاط: {new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>المنظم: {activity.organizer}</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                        <Award className="h-4 w-4 text-green-600" />
                        الإنجاز:
                      </h4>
                      <p className="text-sm text-green-700">{activity.achievement}</p>
                      <p className="text-xs text-green-600 mt-1">+{activity.points} نقطة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الإنجازات */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full bg-gray-100`}>
                        <Icon className={`h-8 w-8 ${achievement.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(achievement.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <Badge className={`${achievement.color.replace('text-', 'bg-').replace('-600', '-100')} ${achievement.color}`}>
                        +{achievement.points} نقطة
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
