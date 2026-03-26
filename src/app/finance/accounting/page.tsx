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
  Smartphone,
  BookOpen,
  Scale,
  Target
} from 'lucide-react';

// Mock data for accounting
const journalEntries = [
  {
    id: 'JE-001',
    date: '2024-01-15',
    description: 'تسجيل رسوم دراسية',
    debitAccount: 'النقدية',
    creditAccount: 'الإيرادات',
    amount: 2500,
    reference: 'INV-2024-001',
    status: 'معتمد',
  },
  {
    id: 'JE-002',
    date: '2024-01-15',
    description: 'دفع راتب موظف',
    debitAccount: 'رواتب الموظفين',
    creditAccount: 'النقدية',
    amount: 4000,
    reference: 'PAY-2024-001',
    status: 'معتمد',
  },
  {
    id: 'JE-003',
    date: '2024-01-14',
    description: 'شراء مستلزمات مكتبية',
    debitAccount: 'المستلزمات',
    creditAccount: 'النقدية',
    amount: 800,
    reference: 'EXP-2024-001',
    status: 'في الانتظار',
  },
];

const chartOfAccounts = [
  { code: '1000', name: 'الأصول', type: 'أصل', balance: 150000, subAccounts: [
    { code: '1100', name: 'النقدية', balance: 50000 },
    { code: '1200', name: 'البنوك', balance: 100000 },
  ]},
  { code: '2000', name: 'الخصوم', type: 'خصم', balance: 75000, subAccounts: [
    { code: '2100', name: 'الموردين', balance: 25000 },
    { code: '2200', name: 'القروض', balance: 50000 },
  ]},
  { code: '3000', name: 'حقوق الملكية', type: 'ملكية', balance: 100000, subAccounts: [
    { code: '3100', name: 'رأس المال', balance: 100000 },
  ]},
  { code: '4000', name: 'الإيرادات', type: 'إيراد', balance: 200000, subAccounts: [
    { code: '4100', name: 'الرسوم الدراسية', balance: 180000 },
    { code: '4200', name: 'إيرادات أخرى', balance: 20000 },
  ]},
  { code: '5000', name: 'المصروفات', type: 'مصروف', balance: 120000, subAccounts: [
    { code: '5100', name: 'رواتب الموظفين', balance: 80000 },
    { code: '5200', name: 'المرافق', balance: 15000 },
    { code: '5300', name: 'المستلزمات', balance: 10000 },
    { code: '5400', name: 'مصروفات أخرى', balance: 15000 },
  ]},
];

const trialBalance = [
  { account: 'النقدية', debit: 50000, credit: 0 },
  { account: 'البنوك', debit: 100000, credit: 0 },
  { account: 'الموردين', debit: 0, credit: 25000 },
  { account: 'القروض', debit: 0, credit: 50000 },
  { account: 'رأس المال', debit: 0, credit: 100000 },
  { account: 'الرسوم الدراسية', debit: 0, credit: 180000 },
  { account: 'إيرادات أخرى', debit: 0, credit: 20000 },
  { account: 'رواتب الموظفين', debit: 80000, credit: 0 },
  { account: 'المرافق', debit: 15000, credit: 0 },
  { account: 'المستلزمات', debit: 10000, credit: 0 },
  { account: 'مصروفات أخرى', debit: 15000, credit: 0 },
];

export default function AccountingManagement() {
  const [selectedTab, setSelectedTab] = useState('journal');
  const [isAddEntryDialogOpen, setIsAddEntryDialogOpen] = useState(false);
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);

  const totalDebits = trialBalance.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = trialBalance.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebits === totalCredits;

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المحاسبة</h1>
          <p className="text-muted-foreground">إدارة الحسابات والسجلات المحاسبية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير البيانات
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة التقارير
          </Button>
          <Button variant="outline" className="gap-2">
            <Calculator className="w-4 h-4" />
            إقفال شهري
          </Button>
        </div>
      </div>

      {/* Accounting Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الأصول</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$150,000</div>
            <p className="text-xs text-muted-foreground">+5% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الخصوم</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75,000</div>
            <p className="text-xs text-muted-foreground">-2% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حقوق الملكية</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100,000</div>
            <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$80,000</div>
            <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Accounting Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journal">دفتر اليومية</TabsTrigger>
          <TabsTrigger value="accounts">دليل الحسابات</TabsTrigger>
          <TabsTrigger value="trial">ميزان المراجعة</TabsTrigger>
          <TabsTrigger value="reports">التقارير المحاسبية</TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>دفتر اليومية</CardTitle>
                <CardDescription>تسجيل المعاملات المالية اليومية</CardDescription>
              </div>
              <Dialog open={isAddEntryDialogOpen} onOpenChange={setIsAddEntryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة قيد جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>إضافة قيد محاسبي جديد</DialogTitle>
                    <DialogDescription>
                      تسجيل معاملة مالية جديدة في دفتر اليومية
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">التاريخ</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="reference">المرجع</Label>
                        <Input id="reference" placeholder="رقم المرجع" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">الوصف</Label>
                      <Input id="description" placeholder="وصف المعاملة" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="debitAccount">الحساب المدين</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الحساب المدين" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">النقدية</SelectItem>
                            <SelectItem value="bank">البنوك</SelectItem>
                            <SelectItem value="expenses">المصروفات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="creditAccount">الحساب الدائن</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الحساب الدائن" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="revenue">الإيرادات</SelectItem>
                            <SelectItem value="liabilities">الخصوم</SelectItem>
                            <SelectItem value="equity">حقوق الملكية</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="amount">المبلغ</Label>
                      <Input id="amount" type="number" placeholder="0" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">إضافة القيد</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم القيد</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>الحساب المدين</TableHead>
                    <TableHead>الحساب الدائن</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.debitAccount}</TableCell>
                      <TableCell>{entry.creditAccount}</TableCell>
                      <TableCell className="font-bold">${entry.amount.toLocaleString()}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell>
                        <Badge className={entry.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
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

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>دليل الحسابات</CardTitle>
                <CardDescription>إدارة الحسابات المحاسبية</CardDescription>
              </div>
              <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة حساب جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>إضافة حساب جديد</DialogTitle>
                    <DialogDescription>
                      إضافة حساب محاسبي جديد إلى دليل الحسابات
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accountCode">رمز الحساب</Label>
                        <Input id="accountCode" placeholder="مثال: 1100" />
                      </div>
                      <div>
                        <Label htmlFor="accountType">نوع الحساب</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الحساب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asset">أصل</SelectItem>
                            <SelectItem value="liability">خصم</SelectItem>
                            <SelectItem value="equity">ملكية</SelectItem>
                            <SelectItem value="revenue">إيراد</SelectItem>
                            <SelectItem value="expense">مصروف</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accountName">اسم الحساب</Label>
                      <Input id="accountName" placeholder="اسم الحساب" />
                    </div>
                    <div>
                      <Label htmlFor="parentAccount">الحساب الأب</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحساب الأب (اختياري)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">الأصول</SelectItem>
                          <SelectItem value="2000">الخصوم</SelectItem>
                          <SelectItem value="3000">حقوق الملكية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">إضافة الحساب</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartOfAccounts.map((account) => (
                  <Card key={account.code}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <CardDescription>رمز: {account.code} | نوع: {account.type}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${account.balance.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {account.subAccounts.map((subAccount) => (
                          <div key={subAccount.code} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <span className="font-medium">{subAccount.name}</span>
                              <span className="text-sm text-muted-foreground ml-2">({subAccount.code})</span>
                            </div>
                            <span className="font-bold">${subAccount.balance.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                ميزان المراجعة
              </CardTitle>
              <CardDescription>عرض أرصدة جميع الحسابات</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الحساب</TableHead>
                    <TableHead className="text-right">المدين</TableHead>
                    <TableHead className="text-right">الدائن</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trialBalance.map((account, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{account.account}</TableCell>
                      <TableCell className="text-right">
                        {account.debit > 0 ? `$${account.debit.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {account.credit > 0 ? `$${account.credit.toLocaleString()}` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold border-t-2">
                    <TableCell>المجموع</TableCell>
                    <TableCell className="text-right">${totalDebits.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${totalCredits.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  {isBalanced ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={isBalanced ? 'text-green-600' : 'text-red-600'}>
                    {isBalanced ? 'الميزان متوازن' : 'الميزان غير متوازن'}
                  </span>
                </div>
                {!isBalanced && (
                  <p className="text-sm text-muted-foreground mt-2">
                    الفرق: ${Math.abs(totalDebits - totalCredits).toLocaleString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  الميزانية العمومية
                </CardTitle>
                <CardDescription>عرض الأصول والخصوم وحقوق الملكية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">الأصول</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>النقدية</span>
                        <span className="font-bold">$50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>البنوك</span>
                        <span className="font-bold">$100,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">إجمالي الأصول</span>
                        <span className="font-bold">$150,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">الخصوم</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>الموردين</span>
                        <span className="font-bold">$25,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>القروض</span>
                        <span className="font-bold">$50,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">إجمالي الخصوم</span>
                        <span className="font-bold">$75,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">حقوق الملكية</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>رأس المال</span>
                        <span className="font-bold">$100,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">إجمالي حقوق الملكية</span>
                        <span className="font-bold">$100,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  قائمة الدخل
                </CardTitle>
                <CardDescription>عرض الإيرادات والمصروفات والأرباح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">الإيرادات</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>الرسوم الدراسية</span>
                        <span className="font-bold">$180,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>إيرادات أخرى</span>
                        <span className="font-bold">$20,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">إجمالي الإيرادات</span>
                        <span className="font-bold">$200,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">المصروفات</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>رواتب الموظفين</span>
                        <span className="font-bold">$80,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المرافق</span>
                        <span className="font-bold">$15,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المستلزمات</span>
                        <span className="font-bold">$10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>مصروفات أخرى</span>
                        <span className="font-bold">$15,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">إجمالي المصروفات</span>
                        <span className="font-bold">$120,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">صافي الربح</span>
                      <span className="font-bold text-lg text-green-600">$80,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
