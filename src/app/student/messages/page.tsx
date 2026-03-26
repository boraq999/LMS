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
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Inbox, 
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Paperclip,
  Search,
  Filter,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Mail
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

const messages = [
  {
    id: 1,
    sender: 'أ. محمد عبدالله',
    senderRole: 'معلم الرياضيات',
    subject: 'تذكير بامتحان الرياضيات',
    content: 'مرحباً، أريد أن أذكركم بامتحان الرياضيات النصفي المقرر يوم الأربعاء القادم. يرجى المراجعة جيداً للفصول 3 و 4 و 5. أي أسئلة؟',
    date: '2024-08-12',
    time: '10:30',
    isRead: false,
    isImportant: true,
    type: 'exam_reminder',
    attachments: ['نموذج_امتحان_تجريبي.pdf']
  },
  {
    id: 2,
    sender: 'إدارة المدرسة',
    senderRole: 'الإدارة',
    subject: 'إعلان عن رحلة ميدانية',
    content: 'نعلمكم بأن المدرسة ستنظم رحلة ميدانية إلى المتحف الوطني يوم الجمعة القادم. الرحلة مجانية لجميع الطلاب. يرجى إحضار وجبة غداء خفيفة.',
    date: '2024-08-11',
    time: '14:15',
    isRead: true,
    isImportant: true,
    type: 'announcement',
    attachments: []
  },
  {
    id: 3,
    sender: 'أ. فاطمة علي',
    senderRole: 'معلمة العلوم',
    subject: 'نتائج مشروع العلوم',
    content: 'ممتاز! مشروعك في العلوم كان رائعاً. حصلت على 95/100. كان العرض التقديمي واضحاً والمحتوى شاملاً. استمر في هذا المستوى المتميز.',
    date: '2024-08-10',
    time: '16:45',
    isRead: true,
    isImportant: false,
    type: 'grade_feedback',
    attachments: ['تقرير_المشروع.pdf']
  },
  {
    id: 4,
    sender: 'أ. أحمد خالد',
    senderRole: 'معلم التاريخ',
    subject: 'طلب مقابلة',
    content: 'أود مقابلة والديك لمناقشة أدائك الأكاديمي في مادة التاريخ. يرجى إبلاغهم بضرورة الحضور يوم الثلاثاء القادم في تمام الساعة 2:00 ظهراً.',
    date: '2024-08-09',
    time: '11:20',
    isRead: false,
    isImportant: true,
    type: 'meeting_request',
    attachments: []
  },
  {
    id: 5,
    sender: 'أ. سارة حسين',
    senderRole: 'معلمة اللغة الإنجليزية',
    subject: 'واجب اللغة الإنجليزية',
    content: 'تذكر أن واجب اللغة الإنجليزية مستحق يوم الخميس القادم. يرجى كتابة مقال من 200 كلمة عن أهمية التعليم في المجتمع.',
    date: '2024-08-08',
    time: '09:15',
    isRead: true,
    isImportant: false,
    type: 'assignment',
    attachments: ['تعليمات_الواجب.docx']
  }
];

const messageTypes = {
  'exam_reminder': { label: 'تذكير امتحان', color: 'bg-red-500', icon: AlertCircle },
  'announcement': { label: 'إعلان', color: 'bg-blue-500', icon: Bell },
  'grade_feedback': { label: 'تقييم', color: 'bg-green-500', icon: CheckCircle },
  'meeting_request': { label: 'طلب مقابلة', color: 'bg-yellow-500', icon: User },
  'assignment': { label: 'واجب', color: 'bg-purple-500', icon: MessageSquare }
};

const getMessageTypeBadge = (type: string) => {
  const typeInfo = messageTypes[type as keyof typeof messageTypes];
  if (!typeInfo) return null;
  
  const Icon = typeInfo.icon;
  return (
    <Badge className={`${typeInfo.color} hover:${typeInfo.color}`}>
      <Icon className="ml-1 h-3 w-3" />
      {typeInfo.label}
    </Badge>
  );
};

const getInitials = (name: string) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2);
};

export default function StudentMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [newMessage, setNewMessage] = useState('');

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const importantCount = messages.filter(msg => msg.isImportant).length;

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">الرسائل والتواصل</h1>
          <p className="text-muted-foreground">
            تواصل مع المعلمين والإدارة واطلع على الرسائل المهمة.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Send className="ml-1 h-4 w-4" />
            رسالة جديدة
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الرسائل غير المقروءة</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">رسائل تحتاج مراجعة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الرسائل المهمة</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{importantCount}</div>
            <p className="text-xs text-muted-foreground">رسائل عالية الأولوية</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرسائل</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">رسائل هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الردود المطلوبة</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">رسائل تحتاج رد</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* قائمة الرسائل */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">صندوق الوارد</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الرسائل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 border-r-4 ${
                    selectedMessage.id === message.id 
                      ? 'bg-primary/5 border-primary' 
                      : 'border-transparent'
                  } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`text-sm font-medium truncate ${!message.isRead ? 'font-bold' : ''}`}>
                          {message.sender}
                        </h4>
                        {message.isImportant && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                        {!message.isRead && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{message.senderRole}</p>
                      <p className={`text-sm truncate ${!message.isRead ? 'font-semibold' : ''}`}>
                        {message.subject}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {message.date} - {message.time}
                        </span>
                        {getMessageTypeBadge(message.type)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* عرض الرسالة */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">{getInitials(selectedMessage.sender)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMessage.sender}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMessage.senderRole}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Reply className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Forward className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {selectedMessage.date} - {selectedMessage.time}
                  </span>
                  {getMessageTypeBadge(selectedMessage.type)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
            </div>

            {/* المرفقات */}
            {selectedMessage.attachments.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">المرفقات:</h4>
                <div className="space-y-2">
                  {selectedMessage.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الرد */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">الرد:</h4>
              <div className="space-y-3">
                <Textarea
                  placeholder="اكتب ردك هنا..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4 ml-1" />
                    إرفاق ملف
                  </Button>
                  <Button>
                    <Send className="h-4 w-4 ml-1" />
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
