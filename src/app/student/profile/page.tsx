'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, HeartPulse } from 'lucide-react';
import Image from 'next/image';

export default function StudentProfilePage() {
  const { user } = useAuth();

  const studentData = {
    id: 'STU-001',
    name: user?.username || 'طالب',
    grade: 'الصف الخامس',
    email: `${user?.username || 'student'}@example.com`,
    phone: '123-456-7890',
    address: '123 الشارع الرئيسي، طرابلس، ليبيا',
    parentName: 'أحمد',
    parentPhone: '091-234-5678',
    healthInfo: {
        bloodType: 'A+',
        allergies: 'لا يوجد',
        chronicDiseases: 'لا يوجد',
        healthStatus: 'جيدة'
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الملف الشخصي</h1>
        <p className="text-muted-foreground">
          إدارة معلوماتك الشخصية وتفاصيل حسابك.
        </p>
      </div>

       <Card className="relative overflow-hidden">
        <Image
          src="https://picsum.photos/seed/profile-bg/1200/300"
          alt="Profile background"
          data-ai-hint="header background"
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="relative">
            <CardHeader>
            <CardTitle>الصورة الشخصية</CardTitle>
            <CardDescription>
                يمكنك تحديث صورتك الشخصية هنا.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
                <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage
                    src={`https://picsum.photos/seed/${user?.username}/100/100`}
                    alt={user?.username}
                    data-ai-hint="profile picture"
                />
                <AvatarFallback>
                    {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                <Button asChild>
                    <label htmlFor="picture-upload" className="cursor-pointer">
                        <Upload className="ml-2 h-4 w-4" />
                        تغيير الصورة
                    </label>
                </Button>
                <input id="picture-upload" type="file" className="hidden" />
                <p className="text-xs text-muted-foreground">
                    JPG أو PNG أو GIF، بحد أقصى 5 ميجابايت.
                </p>
                </div>
            </div>
            </CardContent>
        </div>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
            <CardDescription>
                يمكن تعديل معلوماتك الشخصية الأساسية.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input id="fullName" defaultValue={studentData.name} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="grade">الصف الدراسي</Label>
                    <Input id="grade" defaultValue={studentData.grade} disabled />
                </div>
            </div>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" defaultValue={studentData.email} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" type="tel" defaultValue={studentData.phone} />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Input id="address" defaultValue={studentData.address} />
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>حفظ التغييرات</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary"/>
                المعلومات الصحية
            </CardTitle>
            <CardDescription>
                تفاصيل صحية هامة عن الطالب. هذه المعلومات سرية.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="bloodType">فصيلة الدم</Label>
                    <Input id="bloodType" defaultValue={studentData.healthInfo.bloodType} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="healthStatus">الحالة الصحية</Label>
                    <Input id="healthStatus" defaultValue={studentData.healthInfo.healthStatus} />
                </div>
            </div>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="allergies">الحساسية</Label>
                    <Textarea id="allergies" placeholder="اذكر أي حساسية يعاني منها الطالب..." defaultValue={studentData.healthInfo.allergies} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="chronicDiseases">الأمراض المزمنة</Label>
                    <Textarea id="chronicDiseases" placeholder="اذكر أي أمراض مزمنة..." defaultValue={studentData.healthInfo.chronicDiseases} />
                </div>
            </div>
        </CardContent>
         <CardFooter className="border-t px-6 py-4">
            <Button>حفظ المعلومات الصحية</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>معلومات ولي الأمر</CardTitle>
            <CardDescription>
                تفاصيل الاتصال بولي أمرك.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="parentName">اسم ولي الأمر</Label>
                    <Input id="parentName" defaultValue={studentData.parentName} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="parentPhone">رقم هاتف ولي الأمر</Label>
                    <Input id="parentPhone" type="tel" defaultValue={studentData.parentPhone} />
                </div>
            </div>
        </CardContent>
         <CardFooter className="border-t px-6 py-4">
            <Button>حفظ التغييرات</Button>
        </CardFooter>
      </Card>

    </main>
  );
}
