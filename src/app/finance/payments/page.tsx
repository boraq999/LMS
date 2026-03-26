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
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Send,
  Calendar,
  User,
  Building,
  Receipt,
  Banknote,
  Wallet,
  Smartphone
} from 'lucide-react';

// Mock data for payment management
const paymentData = [
  {
    id: 'PAY-2024-001',
    paymentNumber: 'PAY-2024-001',
    invoiceNumber: 'INV-2024-001',
    payerName: 'أحمد محمد علي',
    payerType: 'طالب',
    payerId: 'S2024001',
    amount: 2750,
    paymentMethod: 'تحويل بنكي',
    paymentDate: '2024-01-20',
    status: 'مكتمل',
    referenceNumber: 'TXN-123456789',
    bankName: 'البنك الأهلي السعودي',
    description: 'دفع رسوم دراسية - الفصل الدراسي الثاني',
    processedBy: 'مدير المالية',
    processedDate: '2024-01-20',
  },
  {
    id: 'PAY-2024-002',
    paymentNumber: 'PAY-2024-002',
    invoiceNumber: 'INV-2024-002',
    payerName: 'فاطمة أحمد حسن',
    payerType: 'طالب',
    payerId: 'S2024002',
    amount: 2750,
    paymentMethod: 'شيك',
    paymentDate: '2024-01-18',
    status: 'في الانتظار',
    referenceNumber: 'CHK-987654321',
    bankName: 'البنك السعودي للاستثمار',
    description: 'دفع رسوم دراسية - الفصل الدراسي الثاني',
    processedBy: null,
    processedDate: null,
  },
  {
    id: 'PAY-2024-003',
    paymentNumber: 'PAY-2024-003',
    invoiceNumber: 'INV-2024-003',
    payerName: 'شركة التقنية المتقدمة',
    payerType: 'مورد',
    payerId: 'V2024001',
    amount: 1320,
    paymentMethod: 'بطاقة ائتمان',
    paymentDate: '2024-01-15',
    status: 'مكتمل',
    referenceNumber: 'CC-456789123',
    bankName: 'البنك الأهلي التجاري',
    description: 'دفع فاتورة صيانة أجهزة الحاسوب',
    processedBy: 'مدير المالية',
    processedDate: '2024-01-15',
  },
  {
    id: 'PAY-2024-004',
    paymentNumber: 'PAY-2024-004',
    invoiceNumber: 'INV-2024-004',
    payerName: 'محمد علي المعلم',
    payerType: 'موظف',
    payerId: 'E2024001',
    amount: 4000,
    paymentMethod: 'تحويل بنكي',
    paymentDate: '2024-01-15',
    status: 'مكتمل',
    referenceNumber: 'TXN-789123456',
    bankName: 'البنك الأهلي السعودي',
    description: 'دفع راتب شهر يناير',
    processedBy: 'مدير المالية',
    processedDate: '2024-01-15',
  },
  {
    id: 'PAY-2024-005',
    paymentNumber: 'PAY-2024-005',
    invoiceNumber: 'INV-2024-005',
    payerName: 'سارة أحمد المعلمة',
    payerType: 'موظف',
    payerId: 'E2024002',
    amount: 4250,
    paymentMethod: 'نقدي',
    paymentDate: '2024-01-15',
    status: 'مكتمل',
    referenceNumber: 'CASH-001',
    bankName: 'نقدي',
    description: 'دفع راتب شهر يناير',
    processedBy: 'مدير المالية',
    processedDate: '2024-01-15',
  },
];

const paymentMethods = [
  'تحويل بنكي', 'شيك', 'نقدي', 'بطاقة ائتمان', 'دفع آجل', 'محفظة إلكترونية'
];

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'completed', label: 'مكتمل' },
  { value: 'pending', label: 'في الانتظار' },
  { value: 'failed', label: 'فشل' },
  { value: 'cancelled', label: 'ملغي' },
  { value: 'refunded', label: 'مسترد' },
];

const payerTypes = [
  'طالب', 'موظف', 'مورد', 'عميل', 'شريك'
];

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [selectedPayerType, setSelectedPayerType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredData = paymentData.filter(item => {
    const matchesSearch = item.payerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'completed' && item.status === 'مكتمل') ||
                         (selectedStatus === 'pending' && item.status === 'في الانتظار') ||
                         (selectedStatus === 'failed' && item.status === 'فشل') ||
                         (selectedStatus === 'cancelled' && item.status === 'ملغي') ||
                         (selectedStatus === 'refunded' && item.status === 'مسترد');
    const matchesPaymentMethod = selectedPaymentMethod === 'all' || item.paymentMethod === selectedPaymentMethod;
    const matchesPayerType = selectedPayerType === 'all' || item.payerType === selectedPayerType;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesPayerType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />مكتمل</Badge>;
      case 'في الانتظار':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />في الانتظار</Badge>;
      case 'فشل':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />فشل</Badge>;
      case 'ملغي':
        return <Badge className="bg-gray-100 text-gray-800"><Trash2 className="w-3 h-3 mr-1" />ملغي</Badge>;
      case 'مسترد':
        return <Badge className="bg-blue-100 text-blue-800"><Receipt className="w-3 h-3 mr-1" />مسترد</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'تحويل بنكي':
        return <Banknote className="w-4 h-4" />;
      case 'شيك':
        return <FileText className="w-4 h-4" />;
      case 'نقدي':
        return <Wallet className="w-4 h-4" />;
      case 'بطاقة ائتمان':
        return <CreditCard className="w-4 h-4" />;
      case 'محفظة إلكترونية':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const totalPayments = paymentData.reduce((sum, item) => sum + item.amount, 0);
  const completedPayments = paymentData.filter(item => item.status === 'مكتمل').reduce((sum, item) => sum + item.amount, 0);
  const pendingPayments = paymentData.filter(item => item.status === 'في الانتظار').reduce((sum, item) => sum + item.amount, 0);

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المدفوعات</h1>
          <p className="text-muted-foreground">تتبع وإدارة جميع المدفوعات والتحويلات المالية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير المدفوعات
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة الإيصالات
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                تسجيل دفعة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>تسجيل دفعة جديدة</DialogTitle>
                <DialogDescription>
                  تسجيل دفعة جديدة للعميل أو المورد
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payerType">نوع الدافع</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الدافع" />
                      </SelectTrigger>
                      <SelectContent>
                        {payerTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payer">الدافع</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدافع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payer1">أحمد محمد علي</SelectItem>
                        <SelectItem value="payer2">فاطمة أحمد حسن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
                    <Input id="invoiceNumber" placeholder="INV-2024-001" />
                  </div>
                  <div>
                    <Label htmlFor="amount">المبلغ</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentDate">تاريخ الدفع</Label>
                    <Input id="paymentDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="referenceNumber">رقم المرجع</Label>
                  <Input id="referenceNumber" placeholder="رقم المرجع أو المعاملة" />
                </div>
                <div>
                  <Label htmlFor="description">وصف الدفعة</Label>
                  <Input id="description" placeholder="وصف الدفعة" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">تسجيل الدفعة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المدفوعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${completedPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((completedPayments/totalPayments)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((pendingPayments/totalPayments)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المدفوعات</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentData.length}</div>
            <p className="text-xs text-muted-foreground">دفعة هذا الشهر</p>
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
                  placeholder="البحث بالاسم أو رقم الدفعة أو رقم الفاتورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="payerType">نوع الدافع</Label>
              <Select value={selectedPayerType} onValueChange={setSelectedPayerType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الدافع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  {payerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="paymentMethod">طريقة الدفع</Label>
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الطرق</SelectItem>
                  {paymentMethods.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
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

      {/* Payment Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المدفوعات</CardTitle>
          <CardDescription>
            عرض جميع المدفوعات مع إمكانية التعديل والإدارة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الدفعة</TableHead>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>اسم الدافع</TableHead>
                <TableHead>نوع الدافع</TableHead>
                <TableHead>رقم الدافع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>تاريخ الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>رقم المرجع</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.paymentNumber}</TableCell>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.payerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.payerType}</Badge>
                  </TableCell>
                  <TableCell>{payment.payerId}</TableCell>
                  <TableCell className="font-bold">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      {payment.paymentMethod}
                    </div>
                  </TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.referenceNumber}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewPayment(payment)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Receipt className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>عرض تفاصيل الدفعة</DialogTitle>
            <DialogDescription>
              تفاصيل الدفعة المحددة
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>رقم الدفعة</Label>
                  <p className="font-medium">{selectedPayment.paymentNumber}</p>
                </div>
                <div>
                  <Label>رقم الفاتورة</Label>
                  <p className="font-medium">{selectedPayment.invoiceNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>اسم الدافع</Label>
                  <p className="font-medium">{selectedPayment.payerName}</p>
                </div>
                <div>
                  <Label>رقم الدافع</Label>
                  <p className="font-medium">{selectedPayment.payerId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>المبلغ</Label>
                  <p className="font-bold text-lg">${selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label>طريقة الدفع</Label>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                    <p className="font-medium">{selectedPayment.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>تاريخ الدفع</Label>
                  <p className="font-medium">{selectedPayment.paymentDate}</p>
                </div>
                <div>
                  <Label>رقم المرجع</Label>
                  <p className="font-medium">{selectedPayment.referenceNumber}</p>
                </div>
              </div>
              <div>
                <Label>وصف الدفعة</Label>
                <p className="font-medium">{selectedPayment.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>البنك</Label>
                  <p className="font-medium">{selectedPayment.bankName}</p>
                </div>
                <div>
                  <Label>الحالة</Label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                </div>
              </div>
              {selectedPayment.processedBy && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>معالج بواسطة</Label>
                    <p className="font-medium">{selectedPayment.processedBy}</p>
                  </div>
                  <div>
                    <Label>تاريخ المعالجة</Label>
                    <p className="font-medium">{selectedPayment.processedDate}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              إغلاق
            </Button>
            <Button>
              <Receipt className="w-4 h-4 mr-2" />
              طباعة الإيصال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              توزيع المدفوعات حسب الطريقة
            </CardTitle>
            <CardDescription>عرض المدفوعات مقسمة حسب طرق الدفع المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map(method => {
                const methodPayments = paymentData.filter(item => item.paymentMethod === method);
                const methodTotal = methodPayments.reduce((sum, item) => sum + item.amount, 0);
                const percentage = Math.round((methodTotal / totalPayments) * 100);
                
                return (
                  <div key={method} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(method)}
                      <span className="font-medium">{method}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${methodTotal.toLocaleString()}</p>
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
              المدفوعات اليومية
            </CardTitle>
            <CardDescription>متابعة المدفوعات على مدار الأسبوع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentData.slice(0, 5).map(payment => (
                <div key={payment.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{payment.payerName}</p>
                    <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{payment.paymentDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>إجراءات سريعة لإدارة المدفوعات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Banknote className="w-6 h-6" />
              <span>تحويل بنكي</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <FileText className="w-6 h-6" />
              <span>دفع بشيك</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Wallet className="w-6 h-6" />
              <span>دفع نقدي</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <CreditCard className="w-6 h-6" />
              <span>بطاقة ائتمان</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
