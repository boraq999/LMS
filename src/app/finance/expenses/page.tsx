'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  CreditCard,
  Calculator,
  Building,
  Wrench,
  Zap,
  Droplets,
  Wifi,
  Car,
  ShoppingCart,
  Calendar
} from 'lucide-react';

// Mock data for operational expenses
const expenseData = [
  {
    id: 'E001',
    description: 'فاتورة الكهرباء',
    category: 'المرافق',
    subcategory: 'كهرباء',
    amount: 2500,
    vendor: 'شركة الكهرباء الوطنية',
    date: '2024-01-15',
    status: 'مدفوع',
    paymentMethod: 'تحويل بنكي',
    invoiceNumber: 'INV-2024-001',
    approvedBy: 'مدير المالية',
  },
  {
    id: 'E002',
    description: 'صيانة أجهزة الحاسوب',
    category: 'الصيانة',
    subcategory: 'أجهزة حاسوب',
    amount: 1200,
    vendor: 'شركة التقنية المتقدمة',
    date: '2024-01-14',
    status: 'في الانتظار',
    paymentMethod: 'شيك',
    invoiceNumber: 'INV-2024-002',
    approvedBy: 'مدير تقنية المعلومات',
  },
  {
    id: 'E003',
    description: 'شراء مستلزمات مكتبية',
    category: 'المستلزمات',
    subcategory: 'مكتبية',
    amount: 800,
    vendor: 'مكتبة الأمل',
    date: '2024-01-13',
    status: 'مدفوع',
    paymentMethod: 'نقدي',
    invoiceNumber: 'INV-2024-003',
    approvedBy: 'مدير الإدارة',
  },
  {
    id: 'E004',
    description: 'فاتورة المياه',
    category: 'المرافق',
    subcategory: 'مياه',
    amount: 600,
    vendor: 'شركة المياه الوطنية',
    date: '2024-01-12',
    status: 'مدفوع',
    paymentMethod: 'تحويل بنكي',
    invoiceNumber: 'INV-2024-004',
    approvedBy: 'مدير المالية',
  },
  {
    id: 'E005',
    description: 'وقود الحافلات المدرسية',
    category: 'النقل',
    subcategory: 'وقود',
    amount: 1500,
    vendor: 'محطة الوقود المركزية',
    date: '2024-01-11',
    status: 'في الانتظار',
    paymentMethod: 'بطاقة ائتمان',
    invoiceNumber: 'INV-2024-005',
    approvedBy: 'مدير النقل',
  },
];

const categoryOptions = [
  'المرافق', 'الصيانة', 'المستلزمات', 'النقل', 'التقنية', 'الأمن', 'التنظيف', 'التأمين'
];

const subcategoryOptions = {
  'المرافق': ['كهرباء', 'مياه', 'إنترنت', 'هاتف', 'تدفئة', 'تكييف'],
  'الصيانة': ['أجهزة حاسوب', 'معدات', 'مباني', 'مركبات', 'أثاث'],
  'المستلزمات': ['مكتبية', 'تعليمية', 'تنظيف', 'طبية', 'أمنية'],
  'النقل': ['وقود', 'صيانة', 'تأمين', 'ترخيص'],
  'التقنية': ['برمجيات', 'أجهزة', 'شبكات', 'أمان'],
  'الأمن': ['كاميرات', 'أنظمة إنذار', 'حراس', 'معدات'],
  'التنظيف': ['مواد تنظيف', 'معدات', 'خدمات'],
  'التأمين': ['تأمين مباني', 'تأمين مركبات', 'تأمين موظفين']
};

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'paid', label: 'مدفوع' },
  { value: 'pending', label: 'في الانتظار' },
  { value: 'approved', label: 'معتمد' },
  { value: 'rejected', label: 'مرفوض' },
];

const paymentMethodOptions = [
  'تحويل بنكي', 'شيك', 'نقدي', 'بطاقة ائتمان', 'دفع آجل'
];

export default function OperationalExpenses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredData = expenseData.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'paid' && item.status === 'مدفوع') ||
                         (selectedStatus === 'pending' && item.status === 'في الانتظار') ||
                         (selectedStatus === 'approved' && item.status === 'معتمد') ||
                         (selectedStatus === 'rejected' && item.status === 'مرفوض');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />مدفوع</Badge>;
      case 'في الانتظار':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />في الانتظار</Badge>;
      case 'معتمد':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />معتمد</Badge>;
      case 'مرفوض':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />مرفوض</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'المرافق':
        return <Zap className="w-4 h-4" />;
      case 'الصيانة':
        return <Wrench className="w-4 h-4" />;
      case 'المستلزمات':
        return <ShoppingCart className="w-4 h-4" />;
      case 'النقل':
        return <Car className="w-4 h-4" />;
      case 'التقنية':
        return <Calculator className="w-4 h-4" />;
      case 'الأمن':
        return <Building className="w-4 h-4" />;
      case 'التنظيف':
        return <Droplets className="w-4 h-4" />;
      case 'التأمين':
        return <FileText className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const paidExpenses = expenseData.filter(item => item.status === 'مدفوع').reduce((sum, item) => sum + item.amount, 0);
  const pendingExpenses = expenseData.filter(item => item.status === 'في الانتظار').reduce((sum, item) => sum + item.amount, 0);

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المصروفات التشغيلية</h1>
          <p className="text-muted-foreground">إدارة وتتبع المصروفات التشغيلية اليومية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة التقرير
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة مصروف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إضافة مصروف جديد</DialogTitle>
                <DialogDescription>
                  إضافة مصروف تشغيلي جديد
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">الوصف</Label>
                  <Input id="description" className="col-span-3" placeholder="وصف المصروف" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">الفئة</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">المبلغ</Label>
                  <Input id="amount" type="number" className="col-span-3" placeholder="0" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vendor" className="text-right">المورد</Label>
                  <Input id="vendor" className="col-span-3" placeholder="اسم المورد" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">إضافة المصروف</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدفوع</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((paidExpenses/totalExpenses)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((pendingExpenses/totalExpenses)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المصروفات</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenseData.length}</div>
            <p className="text-xs text-muted-foreground">مصروف هذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">البحث</Label>
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="البحث بالوصف أو المورد أو رقم الفاتورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="category">الفئة</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {categoryOptions.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="status">الحالة</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المصروفات التشغيلية</CardTitle>
          <CardDescription>
            عرض جميع المصروفات التشغيلية مع إمكانية التعديل والإدارة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(expense.category)}
                      {expense.category}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">${expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell>{expense.invoiceNumber}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <CreditCard className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              توزيع المصروفات حسب الفئة
            </CardTitle>
            <CardDescription>عرض المصروفات مقسمة حسب الفئات المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryOptions.map(category => {
                const categoryExpenses = expenseData.filter(item => item.category === category);
                const categoryTotal = categoryExpenses.reduce((sum, item) => sum + item.amount, 0);
                const percentage = Math.round((categoryTotal / totalExpenses) * 100);
                
                return (
                  <div key={category} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${categoryTotal.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{percentage}% من الإجمالي</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              المصروفات الشهرية
            </CardTitle>
            <CardDescription>متابعة المصروفات على مدار الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenseData.slice(0, 5).map(expense => (
                <div key={expense.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${expense.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            الميزانية مقابل المصروفات الفعلية
          </CardTitle>
          <CardDescription>مقارنة الميزانية المخصصة مع المصروفات الفعلية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">الميزانية المخصصة</p>
              <p className="text-2xl font-bold text-blue-600">$15,000</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">المصروفات الفعلية</p>
              <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">المتبقي</p>
              <p className="text-2xl font-bold text-green-600">${(15000 - totalExpenses).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
