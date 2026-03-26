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
  UserCheck,
  FileText,
  CreditCard,
  Calculator,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react';

// Mock data for salary management
const salaryData = [
  {
    id: 'S001',
    employeeName: 'أحمد محمد المعلم',
    employeeId: 'E2024001',
    position: 'معلم رياضيات',
    department: 'القسم العلمي',
    basicSalary: 4000,
    allowances: 500,
    deductions: 200,
    overtime: 300,
    netSalary: 4600,
    status: 'مدفوع',
    paymentDate: '2024-01-15',
    attendanceDays: 22,
    totalDays: 22,
  },
  {
    id: 'S002',
    employeeName: 'فاطمة أحمد المعلمة',
    employeeId: 'E2024002',
    position: 'معلمة لغة عربية',
    department: 'القسم الأدبي',
    basicSalary: 3800,
    allowances: 400,
    deductions: 150,
    overtime: 200,
    netSalary: 4250,
    status: 'مدفوع',
    paymentDate: '2024-01-15',
    attendanceDays: 21,
    totalDays: 22,
  },
  {
    id: 'S003',
    employeeName: 'محمد علي الموظف',
    employeeId: 'E2024003',
    position: 'موظف إداري',
    department: 'الإدارة',
    basicSalary: 3000,
    allowances: 200,
    deductions: 100,
    overtime: 0,
    netSalary: 3100,
    status: 'في الانتظار',
    paymentDate: null,
    attendanceDays: 20,
    totalDays: 22,
  },
];

const positionOptions = [
  'معلم رياضيات', 'معلم علوم', 'معلم لغة عربية', 'معلم إنجليزية', 
  'موظف إداري', 'موظف محاسبة', 'موظف صيانة', 'سائق'
];

const departmentOptions = [
  'القسم العلمي', 'القسم الأدبي', 'الإدارة', 'المحاسبة', 'الصيانة', 'النقل'
];

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'paid', label: 'مدفوع' },
  { value: 'pending', label: 'في الانتظار' },
  { value: 'processing', label: 'قيد المعالجة' },
];

export default function SalaryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredData = salaryData.filter(item => {
    const matchesSearch = item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || item.position === selectedPosition;
    const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'paid' && item.status === 'مدفوع') ||
                         (selectedStatus === 'pending' && item.status === 'في الانتظار') ||
                         (selectedStatus === 'processing' && item.status === 'قيد المعالجة');
    
    return matchesSearch && matchesPosition && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />مدفوع</Badge>;
      case 'في الانتظار':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />في الانتظار</Badge>;
      case 'قيد المعالجة':
        return <Badge className="bg-blue-100 text-blue-800"><AlertCircle className="w-3 h-3 mr-1" />قيد المعالجة</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalSalaries = salaryData.reduce((sum, item) => sum + item.netSalary, 0);
  const paidSalaries = salaryData.filter(item => item.status === 'مدفوع').reduce((sum, item) => sum + item.netSalary, 0);
  const pendingSalaries = salaryData.filter(item => item.status === 'في الانتظار').reduce((sum, item) => sum + item.netSalary, 0);

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-col justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الرواتب والمكافآت</h1>
          <p className="text-muted-foreground">إدارة وحساب رواتب الموظفين والمعلمين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير كشوف الرواتب
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة كشوف الرواتب
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة راتب جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إضافة راتب جديد</DialogTitle>
                <DialogDescription>
                  إضافة راتب جديد للموظف
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">الموظف</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">أحمد محمد المعلم</SelectItem>
                      <SelectItem value="emp2">فاطمة أحمد المعلمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="basicSalary" className="text-right">الراتب الأساسي</Label>
                  <Input id="basicSalary" type="number" className="col-span-3" placeholder="4000" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="allowances" className="text-right">البدلات</Label>
                  <Input id="allowances" type="number" className="col-span-3" placeholder="500" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">إضافة الراتب</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدفوع</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidSalaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((paidSalaries/totalSalaries)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingSalaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((pendingSalaries/totalSalaries)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد الموظفين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salaryData.length}</div>
            <p className="text-xs text-muted-foreground">موظف نشط</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-col gap-4">
            <div className="flex-1">
              <Label htmlFor="search">البحث</Label>
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="البحث بالاسم أو رقم الموظف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>
            <div className='flex flex-1 flex-row gap-4'>
              <div className="sm:w-48 flex-1">
                <Label htmlFor="position">المنصب</Label>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنصب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المناصب</SelectItem>
                    {positionOptions.map(position => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:w-48 flex-1">
                <Label htmlFor="department">القسم</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأقسام</SelectItem>
                    {departmentOptions.map(department => (
                      <SelectItem key={department} value={department}>{department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:w-48 flex-1">
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
          </div>
        </CardContent>
      </Card>

      {/* Salary Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الرواتب</CardTitle>
          <CardDescription>
            عرض جميع الرواتب مع إمكانية التعديل والإدارة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>رقم الموظف</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>القسم</TableHead>
                <TableHead>الراتب الأساسي</TableHead>
                <TableHead>البدلات</TableHead>
                <TableHead>الخصومات</TableHead>
                <TableHead>الساعات الإضافية</TableHead>
                <TableHead>صافي الراتب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell className="font-medium">{salary.id}</TableCell>
                  <TableCell>{salary.employeeName}</TableCell>
                  <TableCell>{salary.employeeId}</TableCell>
                  <TableCell>{salary.position}</TableCell>
                  <TableCell>{salary.department}</TableCell>
                  <TableCell>${salary.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>${salary.allowances.toLocaleString()}</TableCell>
                  <TableCell>${salary.deductions.toLocaleString()}</TableCell>
                  <TableCell>${salary.overtime.toLocaleString()}</TableCell>
                  <TableCell className="font-bold">${salary.netSalary.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(salary.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calculator className="w-3 h-3" />
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
              <Calendar className="w-5 h-5" />
              الحضور والغياب
            </CardTitle>
            <CardDescription>متابعة حضور الموظفين لحساب الرواتب</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salaryData.map(salary => (
                <div key={salary.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{salary.employeeName}</p>
                    <p className="text-sm text-muted-foreground">{salary.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{salary.attendanceDays}/{salary.totalDays}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((salary.attendanceDays/salary.totalDays)*100)}% حضور
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
              <TrendingUp className="w-5 h-5" />
              المكافآت والعلاوات
            </CardTitle>
            <CardDescription>إدارة المكافآت والعلاوات الإضافية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">مكافأة الأداء المتميز</p>
                  <p className="text-sm text-muted-foreground">للمعلمين المتفوقين</p>
                </div>
                <Badge className="bg-green-100 text-green-800">$300</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">علاوة السكن</p>
                  <p className="text-sm text-muted-foreground">للموظفين غير المقيمين</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">$200</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">بدل النقل</p>
                  <p className="text-sm text-muted-foreground">للموظفين البعيدين</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">$150</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deductions and Benefits */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              الخصومات
            </CardTitle>
            <CardDescription>إدارة الخصومات المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">التأمين الصحي</p>
                  <p className="text-sm text-muted-foreground">خصم شهري</p>
                </div>
                <Badge className="bg-red-100 text-red-800">$100</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">الضريبة</p>
                  <p className="text-sm text-muted-foreground">حسب القانون</p>
                </div>
                <Badge className="bg-red-100 text-red-800">$50</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">قرض الموظف</p>
                  <p className="text-sm text-muted-foreground">قسط شهري</p>
                </div>
                <Badge className="bg-red-100 text-red-800">$200</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              التقاعد والاستحقاقات
            </CardTitle>
            <CardDescription>إدارة استقطاعات التقاعد</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">استقطاع التقاعد</p>
                  <p className="text-sm text-muted-foreground">10% من الراتب الأساسي</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">$400</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">صندوق الموظفين</p>
                  <p className="text-sm text-muted-foreground">مساهمة اختيارية</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">$50</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
