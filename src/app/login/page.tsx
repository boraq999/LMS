'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { School, UserCog, GraduationCap, UserCircle, ShieldCheck } from 'lucide-react';

type Role = 'admin' | 'student' | 'teacher' | 'super-admin';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<Role>('admin');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim(), role);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg border-0 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary p-3 text-primary-foreground">
              <School className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Edumate</CardTitle>
          <CardDescription>
            أهلاً بك! الرجاء اختيار دورك وإدخال اسم المستخدم.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-right">
              <Label>اختر دورك</Label>
              <RadioGroup
                defaultValue="admin"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                value={role}
                onValueChange={(value: Role) => setRole(value)}
              >
                <div>
                  <RadioGroupItem value="super-admin" id="super-admin" className="peer sr-only" />
                  <Label
                    htmlFor="super-admin"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <ShieldCheck className="mb-3 h-6 w-6" />
                    Super Admin
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                  <Label
                    htmlFor="admin"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <UserCog className="mb-3 h-6 w-6" />
                    مسؤول
                  </Label>
                </div>
                 <div>
                  <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                  <Label
                    htmlFor="teacher"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <UserCircle className="mb-3 h-6 w-6" />
                    معلم
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="student"
                    id="student"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="student"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <GraduationCap className="mb-3 h-6 w-6" />
                    طالب
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                placeholder={role === 'admin' ? 'مثال: admin' : (role === 'teacher' ? 'مثال: teacher' : (role === 'student' ? 'مثال: student' : 'مثال: superadmin'))}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="bg-input text-right"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
