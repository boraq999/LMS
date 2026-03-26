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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
  PieChart as PieChartIcon,
  Calendar,
  Eye,
  Settings
} from 'lucide-react';

// Mock data for financial reports
const monthlyRevenueData = [
  { month: "يناير", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "فبراير", revenue: 52000, expenses: 38000, profit: 14000 },
  { month: "مارس", revenue: 48000, expenses: 35000, profit: 13000 },
  { month: "أبريل", revenue: 61000, expenses: 42000, profit: 19000 },
  { month: "مايو", revenue: 58000, expenses: 40000, profit: 18000 },
  { month: "يونيو", revenue: 67000, expenses: 45000, profit: 22000 },
];

const expenseBreakdownData = [
  { name: 'الرواتب', value: 45000, color: '#8884d8' },
  { name: 'المرافق', value: 12000, color: '#82ca9d' },
  { name: 'الصيانة', value: 8000, color: '#ffc658' },
  { name: 'المستلزمات', value: 5000, color: '#ff7300' },
  { name: 'النقل', value: 3000, color: '#00ff00' },
  { name: 'أخرى', value: 2000, color: '#ff0000' },
];

const cashFlowData = [
  { month: "يناير", inflow: 45000, outflow: 32000, net: 13000 },
  { month: "فبراير", inflow: 52000, outflow: 38000, net: 14000 },
  { month: "مارس", inflow: 48000, outflow: 35000, net: 13000 },
  { month: "أبريل", inflow: 61000, outflow: 42000, net: 19000 },
  { month: "مايو", inflow: 58000, outflow: 40000, net: 18000 },
  { month: "يونيو", inflow: 67000, outflow: 45000, net: 22000 },
];

const reportTypes = [
  { id: 'revenue', name: 'تقرير الإيرادات والمصروفات', icon: BarChart3, description: 'تقرير شامل للإيرادات والمصروفات الشهرية' },
  { id: 'cashflow', name: 'تقرير التدفق النقدي', icon: TrendingUp, description: 'تتبع التدفق النقدي الداخل والخارج' },
  { id: 'balance', name: 'الميزانية العمومية', icon: Calculator, description: 'عرض الأصول والخصوم وحقوق الملكية' },
  { id: 'profit', name: 'تقرير الأرباح والخسائر', icon: PieChartIcon, description: 'تحليل الأرباح والخسائر التفصيلي' },
  { id: 'tuition', name: 'تقرير الرسوم الدراسية', icon: DollarSign, description: 'تقرير شامل للرسوم الدراسية والمدفوعات' },
  { id: 'salary', name: 'تقرير الرواتب', icon: CreditCard, description: 'تقرير رواتب الموظفين والمعلمين' },
];

const chartConfig = {
  revenue: {
    label: 'الإيرادات',
    color: 'hsl(var(--finance-primary))',
  },
  expenses: {
    label: 'المصروفات',
    color: 'hsl(var(--finance-accent))',
  },
  profit: {
    label: 'الربح',
    color: 'hsl(var(--chart-3))',
  },
  inflow: {
    label: 'التدفق الداخل',
    color: 'hsl(var(--chart-1))',
  },
  outflow: {
    label: 'التدفق الخارج',
    color: 'hsl(var(--chart-2))',
  },
  net: {
    label: 'صافي التدفق',
    color: 'hsl(var(--chart-4))',
  }
};

export default function FinancialReports() {
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('monthly');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const getReportData = () => {
    switch (selectedReport) {
      case 'revenue':
        return monthlyRevenueData;
      case 'cashflow':
        return cashFlowData;
      default:
        return monthlyRevenueData;
    }
  };

  const renderChart = () => {
    const data = getReportData();
    
    switch (selectedReport) {
      case 'revenue':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" name="الإيرادات" />
              <Bar dataKey="expenses" fill="var(--color-expenses)" name="المصروفات" />
              <Bar dataKey="profit" fill="var(--color-profit)" name="الربح" />
            </BarChart>
          </ChartContainer>
        );
      case 'cashflow':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="inflow" stackId="1" stroke="var(--color-inflow)" fill="var(--color-inflow)" name="التدفق الداخل" />
              <Area type="monotone" dataKey="outflow" stackId="2" stroke="var(--color-outflow)" fill="var(--color-outflow)" name="التدفق الخارج" />
            </AreaChart>
          </ChartContainer>
        );
      case 'balance':
        return (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Calculator className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">الميزانية العمومية</h3>
              <p className="text-muted-foreground">سيتم إضافة هذا التقرير قريباً</p>
            </div>
          </div>
        );
      case 'profit':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <PieChart>
              <Pie
                data={expenseBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ChartContainer>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التقارير المالية</h1>
          <p className="text-muted-foreground">تقارير مالية شاملة ومفصلة</p>
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
          <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                إنشاء تقرير مخصص
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إنشاء تقرير مخصص</DialogTitle>
                <DialogDescription>
                  إنشاء تقرير مالي مخصص حسب المعايير المطلوبة
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reportType" className="text-right">نوع التقرير</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(report => (
                        <SelectItem key={report.id} value={report.id}>{report.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateRange" className="text-right">الفترة الزمنية</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربعي</SelectItem>
                      <SelectItem value="yearly">سنوي</SelectItem>
                      <SelectItem value="custom">مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">من تاريخ</Label>
                  <Input id="startDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">إلى تاريخ</Label>
                  <Input id="endDate" type="date" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">إنشاء التقرير</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => (
          <Card 
            key={report.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedReport === report.id ? 'ring-2 ring-finance-primary' : ''
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-finance-primary/10">
                  <report.icon className="w-5 h-5 text-finance-primary" />
                </div>
                <CardTitle className="text-lg">{report.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{report.description}</CardDescription>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="w-3 h-3" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="w-3 h-3" />
                  تخصيص
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle>اختيار الفترة الزمنية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant={dateRange === 'monthly' ? 'default' : 'outline'}
              onClick={() => setDateRange('monthly')}
            >
              شهري
            </Button>
            <Button 
              variant={dateRange === 'quarterly' ? 'default' : 'outline'}
              onClick={() => setDateRange('quarterly')}
            >
              ربعي
            </Button>
            <Button 
              variant={dateRange === 'yearly' ? 'default' : 'outline'}
              onClick={() => setDateRange('yearly')}
            >
              سنوي
            </Button>
            <Button 
              variant={dateRange === 'custom' ? 'default' : 'outline'}
              onClick={() => setDateRange('custom')}
            >
              مخصص
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </CardTitle>
          <CardDescription>
            {reportTypes.find(r => r.id === selectedReport)?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$331,000</div>
            <p className="text-xs text-muted-foreground">+12% من العام الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$232,000</div>
            <p className="text-xs text-muted-foreground">+8% من العام الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$99,000</div>
            <p className="text-xs text-muted-foreground">+18% من العام الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
            <p className="text-xs text-muted-foreground">نمو سنوي</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>التفاصيل المالية</CardTitle>
          <CardDescription>عرض تفصيلي للبيانات المالية</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الشهر</TableHead>
                <TableHead>الإيرادات</TableHead>
                <TableHead>المصروفات</TableHead>
                <TableHead>الربح</TableHead>
                <TableHead>معدل الربحية</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyRevenueData.map((data) => (
                <TableRow key={data.month}>
                  <TableCell className="font-medium">{data.month}</TableCell>
                  <TableCell>${data.revenue.toLocaleString()}</TableCell>
                  <TableCell>${data.expenses.toLocaleString()}</TableCell>
                  <TableCell className="font-bold text-green-600">${data.profit.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {Math.round((data.profit / data.revenue) * 100)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>إجراءات سريعة للتقارير المالية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <FileText className="w-6 h-6" />
              <span>تقرير شهري</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Calendar className="w-6 h-6" />
              <span>تقرير ربعي</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <BarChart3 className="w-6 h-6" />
              <span>تقرير سنوي</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Settings className="w-6 h-6" />
              <span>تقرير مخصص</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
