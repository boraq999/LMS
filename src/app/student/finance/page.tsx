'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Calendar,
  FileText,
  Banknote,
  Calculator
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
import { useState } from 'react';

const tuitionFees = [
  {
    id: 1,
    description: 'الرسوم الدراسية - الفصل الأول 2024',
    amount: 1500,
    dueDate: '2024-09-01',
    status: 'paid',
    paymentDate: '2024-08-15',
    method: 'تحويل بنكي'
  },
  {
    id: 2,
    description: 'رسوم الكتب والمواد التعليمية',
    amount: 200,
    dueDate: '2024-09-15',
    status: 'paid',
    paymentDate: '2024-08-20',
    method: 'نقدي'
  },
  {
    id: 3,
    description: 'الرسوم الدراسية - الفصل الثاني 2024',
    amount: 1500,
    dueDate: '2024-12-01',
    status: 'pending',
    paymentDate: null,
    method: null
  },
  {
    id: 4,
    description: 'رسوم الأنشطة اللامنهجية',
    amount: 100,
    dueDate: '2024-10-01',
    status: 'pending',
    paymentDate: null,
    method: null
  }
];

const paymentHistory = [
  {
    id: 1,
    date: '2024-08-20',
    description: 'رسوم الكتب والمواد التعليمية',
    amount: 200,
    method: 'نقدي',
    reference: 'PAY-001',
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-08-15',
    description: 'الرسوم الدراسية - الفصل الأول 2024',
    amount: 1500,
    method: 'تحويل بنكي',
    reference: 'TRF-002',
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-07-30',
    description: 'رسوم التسجيل',
    amount: 50,
    method: 'نقدي',
    reference: 'PAY-003',
    status: 'completed'
  }
];

const financialSummary = {
  totalPaid: 1750,
  totalPending: 1600,
  totalFees: 3350,
  nextDueDate: '2024-10-01',
  nextAmount: 100
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />مدفوع</Badge>;
    case 'pending':
      return <Badge variant="destructive"><AlertCircle className="ml-1 h-3 w-3" />مستحق</Badge>;
    case 'overdue':
      return <Badge className="bg-red-600 hover:bg-red-700"><Clock className="ml-1 h-3 w-3" />متأخر</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="ml-1 h-3 w-3" />مكتمل</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'تحويل بنكي':
      return <Banknote className="h-4 w-4 text-blue-500" />;
    case 'نقدي':
      return <DollarSign className="h-4 w-4 text-green-500" />;
    case 'بطاقة ائتمان':
      return <CreditCard className="h-4 w-4 text-purple-500" />;
    default:
      return <Calculator className="h-4 w-4 text-gray-500" />;
  }
};

export default function StudentFinancePage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">الشؤون المالية</h1>
        <p className="text-muted-foreground">
          عرض الرسوم الدراسية وسجل المدفوعات والإدارة المالية الشخصية.
        </p>
      </div>

      {/* ملخص مالي سريع */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرسوم</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialSummary.totalFees.toLocaleString()} د.ل</div>
            <p className="text-xs text-muted-foreground">للسنة الأكاديمية الحالية</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المبلغ المدفوع</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{financialSummary.totalPaid.toLocaleString()} د.ل</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((financialSummary.totalPaid / financialSummary.totalFees) * 100)}% من إجمالي الرسوم
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المبلغ المستحق</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{financialSummary.totalPending.toLocaleString()} د.ل</div>
            <p className="text-xs text-muted-foreground">رسوم مستحقة الدفع</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الدفعة القادمة</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialSummary.nextAmount.toLocaleString()} د.ل</div>
            <p className="text-xs text-muted-foreground">
              مستحق في {new Date(financialSummary.nextDueDate).toLocaleDateString('ar-SA')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات المالية */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="fees">الرسوم الدراسية</TabsTrigger>
          <TabsTrigger value="payments">سجل المدفوعات</TabsTrigger>
          <TabsTrigger value="invoices">الفواتير</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  حالة الرسوم
                </CardTitle>
                <CardDescription>
                  نظرة عامة على حالة الرسوم الدراسية.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">مدفوع</span>
                    </div>
                    <span className="font-bold text-green-600">{financialSummary.totalPaid.toLocaleString()} د.ل</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">مستحق</span>
                    </div>
                    <span className="font-bold text-red-600">{financialSummary.totalPending.toLocaleString()} د.ل</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(financialSummary.totalPaid / financialSummary.totalFees) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    تم دفع {Math.round((financialSummary.totalPaid / financialSummary.totalFees) * 100)}% من إجمالي الرسوم
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  المواعيد المهمة
                </CardTitle>
                <CardDescription>
                  تواريخ استحقاق الرسوم القادمة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tuitionFees.filter(fee => fee.status === 'pending').map((fee) => (
                    <div key={fee.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{fee.description}</p>
                        <p className="text-xs text-muted-foreground">
                          مستحق: {new Date(fee.dueDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{fee.amount.toLocaleString()} د.ل</p>
                        <Button size="sm" className="mt-1">
                          دفع الآن
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* الرسوم الدراسية */}
        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                الرسوم الدراسية
              </CardTitle>
              <CardDescription>
                قائمة بجميع الرسوم الدراسية مع حالة الدفع.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">الوصف</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead className="text-center">تاريخ الاستحقاق</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tuitionFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.description}</TableCell>
                      <TableCell className="text-center font-bold">{fee.amount.toLocaleString()} د.ل</TableCell>
                      <TableCell className="text-center">
                        {new Date(fee.dueDate).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell className="text-center flex justify-center">
                        {getStatusBadge(fee.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 ml-1" />
                            عرض
                          </Button>
                          {fee.status === 'pending' && (
                            <Button size="sm">
                              دفع
                            </Button>
                          )}
                          {fee.status === 'paid' && (
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 ml-1" />
                              إيصال
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* سجل المدفوعات */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                سجل المدفوعات
              </CardTitle>
              <CardDescription>
                تاريخ جميع المدفوعات المنجزة.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">التاريخ</TableHead>
                    <TableHead className="text-center">الوصف</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead className="text-center">طريقة الدفع</TableHead>
                    <TableHead className="text-center">رقم المرجع</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-center">
                        {new Date(payment.date).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell className="text-center font-bold">{payment.amount.toLocaleString()} د.ل</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getPaymentMethodIcon(payment.method)}
                          <span>{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm">{payment.reference}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 ml-1" />
                            تفاصيل
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 ml-1" />
                            إيصال
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الفواتير */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                الفواتير والإيصالات
              </CardTitle>
              <CardDescription>
                تحميل الفواتير والإيصالات الرسمية.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{payment.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString('ar-SA')} - {payment.amount.toLocaleString()} د.ل
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        معاينة
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
