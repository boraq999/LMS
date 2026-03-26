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
  Users,
  GraduationCap,
  FileText,
  CreditCard
} from 'lucide-react';

// Mock data for tuition management
const tuitionData = [
  {
    id: 'T001',
    studentName: 'أحمد محمد علي',
    studentId: 'S2024001',
    grade: 'الصف العاشر',
    tuitionAmount: 2500,
    paidAmount: 2500,
    remainingAmount: 0,
    status: 'مدفوع',
    dueDate: '2024-01-15',
    paymentDate: '2024-01-10',
    discount: 0,
    additionalFees: 0,
  },
  {
    id: 'T002',
    studentName: 'فاطمة أحمد حسن',
    studentId: 'S2024002',
    grade: 'الصف التاسع',
    tuitionAmount: 2500,
    paidAmount: 1500,
    remainingAmount: 1000,
    status: 'متأخر',
    dueDate: '2024-01-15',
    paymentDate: null,
    discount: 200,
    additionalFees: 100,
  },
  {
    id: 'T003',
    studentName: 'محمد علي إبراهيم',
    studentId: 'S2024003',
    grade: 'الصف الحادي عشر',
    tuitionAmount: 3000,
    paidAmount: 0,
    remainingAmount: 3000,
    status: 'غير مدفوع',
    dueDate: '2024-01-15',
    paymentDate: null,
    discount: 0,
    additionalFees: 200,
  },
];

const gradeOptions = [
  'الصف السابع', 'الصف الثامن', 'الصف التاسع', 'الصف العاشر', 'الصف الحادي عشر', 'الصف الثاني عشر'
];

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'paid', label: 'مدفوع' },
  { value: 'overdue', label: 'متأخر' },
  { value: 'unpaid', label: 'غير مدفوع' },
];

export default function TuitionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredData = tuitionData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'paid' && item.status === 'مدفوع') ||
                         (selectedStatus === 'overdue' && item.status === 'متأخر') ||
                         (selectedStatus === 'unpaid' && item.status === 'غير مدفوع');
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />مدفوع</Badge>;
      case 'متأخر':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />متأخر</Badge>;
      case 'غير مدفوع':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />غير مدفوع</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الرسوم الدراسية</h1>
          <p className="text-muted-foreground">إدارة وتتبع الرسوم الدراسية للطلاب</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة رسوم جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إضافة رسوم جديدة</DialogTitle>
                <DialogDescription>
                  إضافة رسوم دراسية جديدة للطالب
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student" className="text-right">الطالب</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الطالب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student1">أحمد محمد علي</SelectItem>
                      <SelectItem value="student2">فاطمة أحمد حسن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">المبلغ</Label>
                  <Input id="amount" type="number" className="col-span-3" placeholder="2500" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">تاريخ الاستحقاق</Label>
                  <Input id="dueDate" type="date" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">إضافة الرسوم</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرسوم</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,000</div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدفوع</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,000</div>
            <p className="text-xs text-muted-foreground">50% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المتأخر</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,000</div>
            <p className="text-xs text-muted-foreground">12.5% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">غير المدفوع</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,000</div>
            <p className="text-xs text-muted-foreground">37.5% من الإجمالي</p>
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
                  placeholder="البحث بالاسم أو رقم الطالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="grade">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الصفوف</SelectItem>
                  {gradeOptions.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
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

      {/* Tuition Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الرسوم الدراسية</CardTitle>
          <CardDescription>
            عرض جميع الرسوم الدراسية مع إمكانية التعديل والإدارة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>اسم الطالب</TableHead>
                <TableHead>رقم الطالب</TableHead>
                <TableHead>الصف</TableHead>
                <TableHead>مبلغ الرسوم</TableHead>
                <TableHead>المدفوع</TableHead>
                <TableHead>المتبقي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((tuition) => (
                <TableRow key={tuition.id}>
                  <TableCell className="font-medium">{tuition.id}</TableCell>
                  <TableCell>{tuition.studentName}</TableCell>
                  <TableCell>{tuition.studentId}</TableCell>
                  <TableCell>{tuition.grade}</TableCell>
                  <TableCell>${tuition.tuitionAmount.toLocaleString()}</TableCell>
                  <TableCell>${tuition.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>${tuition.remainingAmount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(tuition.status)}</TableCell>
                  <TableCell>{tuition.dueDate}</TableCell>
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

      {/* Additional Features */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              الرسوم المتأخرة
            </CardTitle>
            <CardDescription>قائمة الطلاب الذين لديهم رسوم متأخرة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tuitionData.filter(t => t.status === 'متأخر').map(tuition => (
                <div key={tuition.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{tuition.studentName}</p>
                    <p className="text-sm text-muted-foreground">{tuition.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">${tuition.remainingAmount}</p>
                    <p className="text-xs text-muted-foreground">متأخر منذ {tuition.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              الخصومات والمنح
            </CardTitle>
            <CardDescription>إدارة الخصومات والمنح الدراسية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">منحة التفوق</p>
                  <p className="text-sm text-muted-foreground">خصم 20% للطلاب المتفوقين</p>
                </div>
                <Badge className="bg-green-100 text-green-800">$200</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">منحة الأسرة</p>
                  <p className="text-sm text-muted-foreground">خصم للعائلات متعددة الأبناء</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">$150</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
