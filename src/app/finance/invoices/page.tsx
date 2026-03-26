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
  Building
} from 'lucide-react';

// Mock data for invoice management
const invoiceData = [
  {
    id: 'INV-2024-001',
    invoiceNumber: 'INV-2024-001',
    customerName: 'أحمد محمد علي',
    customerType: 'طالب',
    customerId: 'S2024001',
    amount: 2500,
    tax: 250,
    totalAmount: 2750,
    status: 'مدفوع',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    paymentDate: '2024-01-20',
    description: 'رسوم دراسية - الفصل الدراسي الثاني',
    items: [
      { description: 'الرسوم الدراسية', quantity: 1, price: 2500, total: 2500 }
    ],
    paymentMethod: 'تحويل بنكي',
  },
  {
    id: 'INV-2024-002',
    invoiceNumber: 'INV-2024-002',
    customerName: 'فاطمة أحمد حسن',
    customerType: 'طالب',
    customerId: 'S2024002',
    amount: 2500,
    tax: 250,
    totalAmount: 2750,
    status: 'متأخر',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    paymentDate: null,
    description: 'رسوم دراسية - الفصل الدراسي الثاني',
    items: [
      { description: 'الرسوم الدراسية', quantity: 1, price: 2500, total: 2500 }
    ],
    paymentMethod: null,
  },
  {
    id: 'INV-2024-003',
    invoiceNumber: 'INV-2024-003',
    customerName: 'شركة التقنية المتقدمة',
    customerType: 'مورد',
    customerId: 'V2024001',
    amount: 1200,
    tax: 120,
    totalAmount: 1320,
    status: 'في الانتظار',
    issueDate: '2024-01-14',
    dueDate: '2024-02-14',
    paymentDate: null,
    description: 'صيانة أجهزة الحاسوب',
    items: [
      { description: 'صيانة أجهزة الحاسوب', quantity: 1, price: 1200, total: 1200 }
    ],
    paymentMethod: null,
  },
  {
    id: 'INV-2024-004',
    invoiceNumber: 'INV-2024-004',
    customerName: 'محمد علي المعلم',
    customerType: 'موظف',
    customerId: 'E2024001',
    amount: 4000,
    tax: 0,
    totalAmount: 4000,
    status: 'مسودة',
    issueDate: '2024-01-13',
    dueDate: '2024-02-13',
    paymentDate: null,
    description: 'راتب شهر يناير',
    items: [
      { description: 'الراتب الأساسي', quantity: 1, price: 4000, total: 4000 }
    ],
    paymentMethod: null,
  },
];

const customerTypes = [
  'طالب', 'موظف', 'مورد', 'عميل', 'شريك'
];

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'draft', label: 'مسودة' },
  { value: 'sent', label: 'مرسل' },
  { value: 'paid', label: 'مدفوع' },
  { value: 'overdue', label: 'متأخر' },
  { value: 'cancelled', label: 'ملغي' },
];

const paymentMethodOptions = [
  'تحويل بنكي', 'شيك', 'نقدي', 'بطاقة ائتمان', 'دفع آجل'
];

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomerType, setSelectedCustomerType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredData = invoiceData.filter(item => {
    const matchesSearch = item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'draft' && item.status === 'مسودة') ||
                         (selectedStatus === 'sent' && item.status === 'مرسل') ||
                         (selectedStatus === 'paid' && item.status === 'مدفوع') ||
                         (selectedStatus === 'overdue' && item.status === 'متأخر') ||
                         (selectedStatus === 'cancelled' && item.status === 'ملغي');
    const matchesCustomerType = selectedCustomerType === 'all' || item.customerType === selectedCustomerType;
    
    return matchesSearch && matchesStatus && matchesCustomerType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />مدفوع</Badge>;
      case 'متأخر':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />متأخر</Badge>;
      case 'في الانتظار':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />في الانتظار</Badge>;
      case 'مسودة':
        return <Badge className="bg-gray-100 text-gray-800"><FileText className="w-3 h-3 mr-1" />مسودة</Badge>;
      case 'مرسل':
        return <Badge className="bg-blue-100 text-blue-800"><Send className="w-3 h-3 mr-1" />مرسل</Badge>;
      case 'ملغي':
        return <Badge className="bg-red-100 text-red-800"><Trash2 className="w-3 h-3 mr-1" />ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalInvoices = invoiceData.reduce((sum, item) => sum + item.totalAmount, 0);
  const paidInvoices = invoiceData.filter(item => item.status === 'مدفوع').reduce((sum, item) => sum + item.totalAmount, 0);
  const overdueInvoices = invoiceData.filter(item => item.status === 'متأخر').reduce((sum, item) => sum + item.totalAmount, 0);
  const pendingInvoices = invoiceData.filter(item => item.status === 'في الانتظار').reduce((sum, item) => sum + item.totalAmount, 0);

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الفواتير</h1>
          <p className="text-muted-foreground">إدارة وإصدار الفواتير للعملاء والموردين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير الفواتير
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة الفواتير
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إنشاء فاتورة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>إنشاء فاتورة جديدة</DialogTitle>
                <DialogDescription>
                  إنشاء فاتورة جديدة للعميل أو المورد
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerType">نوع العميل</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="customer">العميل</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer1">أحمد محمد علي</SelectItem>
                        <SelectItem value="customer2">فاطمة أحمد حسن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issueDate">تاريخ الإصدار</Label>
                    <Input id="issueDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">وصف الفاتورة</Label>
                  <Input id="description" placeholder="وصف الفاتورة" />
                </div>
                <div>
                  <Label htmlFor="amount">المبلغ</Label>
                  <Input id="amount" type="number" placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">إنشاء الفاتورة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الفواتير</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدفوع</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((paidInvoices/totalInvoices)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المتأخر</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overdueInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((overdueInvoices/totalInvoices)*100)}% من الإجمالي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((pendingInvoices/totalInvoices)*100)}% من الإجمالي</p>
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
                  placeholder="البحث بالاسم أو رقم الفاتورة أو رقم العميل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="customerType">نوع العميل</Label>
              <Select value={selectedCustomerType} onValueChange={setSelectedCustomerType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العميل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  {customerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
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

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الفواتير</CardTitle>
          <CardDescription>
            عرض جميع الفواتير مع إمكانية التعديل والإدارة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>اسم العميل</TableHead>
                <TableHead>نوع العميل</TableHead>
                <TableHead>رقم العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الضريبة</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإصدار</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.customerType}</Badge>
                  </TableCell>
                  <TableCell>{invoice.customerId}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>${invoice.tax.toLocaleString()}</TableCell>
                  <TableCell className="font-bold">${invoice.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>عرض الفاتورة</DialogTitle>
            <DialogDescription>
              تفاصيل الفاتورة المحددة
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>رقم الفاتورة</Label>
                  <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <Label>تاريخ الإصدار</Label>
                  <p className="font-medium">{selectedInvoice.issueDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>اسم العميل</Label>
                  <p className="font-medium">{selectedInvoice.customerName}</p>
                </div>
                <div>
                  <Label>رقم العميل</Label>
                  <p className="font-medium">{selectedInvoice.customerId}</p>
                </div>
              </div>
              <div>
                <Label>وصف الفاتورة</Label>
                <p className="font-medium">{selectedInvoice.description}</p>
              </div>
              <div>
                <Label>تفاصيل العناصر</Label>
                <div className="border rounded-lg p-4">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">الإجمالي: ${item.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>المبلغ</Label>
                  <p className="font-bold">${selectedInvoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label>الضريبة</Label>
                  <p className="font-bold">${selectedInvoice.tax.toLocaleString()}</p>
                </div>
                <div>
                  <Label>الإجمالي</Label>
                  <p className="font-bold text-lg">${selectedInvoice.totalAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Label>الحالة</Label>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
                <div>
                  <Label>تاريخ الاستحقاق</Label>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              إغلاق
            </Button>
            <Button>
              <Printer className="w-4 h-4 mr-2" />
              طباعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>إجراءات سريعة لإدارة الفواتير</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <FileText className="w-6 h-6" />
              <span>فاتورة طالب</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <User className="w-6 h-6" />
              <span>فاتورة موظف</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Building className="w-6 h-6" />
              <span>فاتورة مورد</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Calendar className="w-6 h-6" />
              <span>فاتورة دورية</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
