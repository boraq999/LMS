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
import { School } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm border-0 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary p-3 text-primary-foreground">
              <School className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Edumate</CardTitle>
          <CardDescription>
            أهلاً بك! الرجاء إدخال اسم المستخدم للمتابعة.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-right">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                placeholder="مثال: admin"
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
