'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Filter
} from 'lucide-react';

// Mock data for financial analytics
const revenueTrendData = [
  { month: "يناير", revenue: 45000, target: 50000, growth: 12 },
  { month: "فبراير", revenue: 52000, target: 50000, growth: 15 },
  { month: "مارس", revenue: 48000, target: 50000, growth: 8 },
  { month: "أبريل", revenue: 61000, target: 55000, growth: 22 },
  { month: "مايو", revenue: 58000, target: 55000, growth: 18 },
  { month: "يونيو", revenue: 67000, target: 60000, growth: 25 },
];

const expenseBreakdownData = [
  { name: 'الرواتب', value: 45000, percentage: 45, color: '#8884d8' },
  { name: 'المرافق', value: 12000, percentage: 12, color: '#82ca9d' },
  { name: 'الصيانة', value: 8000, percentage: 8, color: '#ffc658' },
  { name: 'المستلزمات', value: 5000, percentage: 5, color: '#ff7300' },
  { name: 'النقل', value: 3000, percentage: 3, color: '#00ff00' },
  { name: 'أخرى', value: 2000, percentage: 2, color: '#ff0000' },
];

const cashFlowData = [
  { month: "يناير", inflow: 45000, outflow: 32000, net: 13000 },
  { month: "فبراير", inflow: 52000, outflow: 38000, net: 14000 },
  { month: "مارس", inflow: 48000, outflow: 35000, net: 13000 },
  { month: "أبريل", inflow: 61000, outflow: 42000, net: 19000 },
  { month: "مايو", inflow: 58000, outflow: 40000, net: 18000 },
  { month: "يونيو", inflow: 67000, outflow: 45000, net: 22000 },
];

const kpiData = [
  { name: 'معدل النمو الشهري', value: '15.2%', trend: 'up', target: '12%', status: 'excellent' },
  { name: 'معدل التحصيل', value: '87%', trend: 'up', target: '85%', status: 'good' },
  { name: 'معدل الربحية', value: '29.8%', trend: 'up', target: '25%', status: 'excellent' },
  { name: 'معدل التدفق النقدي', value: '22.1%', trend: 'up', target: '20%', status: 'good' },
  { name: 'معدل المصروفات', value: '68.2%', trend: 'down', target: '70%', status: 'good' },
  { name: 'معدل النمو السنوي', value: '18.5%', trend: 'up', target: '15%', status: 'excellent' },
];

const chartConfig = {
  revenue: {
    label: 'الإيرادات',
    color: 'hsl(var(--finance-primary))',
  },
  target: {
    label: 'الهدف',
    color: 'hsl(var(--finance-accent))',
  },
  growth: {
    label: 'النمو',
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

export default function FinancialAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getKPIStatus = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />ممتاز</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />جيد</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />تحذير</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />حرج</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التحليلات المالية</h1>
          <p className="text-muted-foreground">تحليل شامل للأداء المالي والمؤشرات الرئيسية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            تحديث البيانات
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير التحليل
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            إعدادات التحليل
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <Card>
        <CardHeader>
          <CardTitle>اختيار الفترة الزمنية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('weekly')}
            >
              أسبوعي
            </Button>
            <Button 
              variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('monthly')}
            >
              شهري
            </Button>
            <Button 
              variant={selectedPeriod === 'quarterly' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('quarterly')}
            >
              ربعي
            </Button>
            <Button 
              variant={selectedPeriod === 'yearly' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('yearly')}
            >
              سنوي
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">الهدف: {kpi.target}</p>
                {getKPIStatus(kpi.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="expenses">المصروفات</TabsTrigger>
          <TabsTrigger value="cashflow">التدفق النقدي</TabsTrigger>
          <TabsTrigger value="profitability">الربحية</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                تحليل الإيرادات
              </CardTitle>
              <CardDescription>مقارنة الإيرادات الفعلية مع الأهداف المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <BarChart data={revenueTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="الإيرادات الفعلية" />
                  <Bar dataKey="target" fill="var(--color-target)" name="الهدف" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>معدل النمو الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <LineChart data={revenueTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="growth" stroke="var(--color-growth)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ملخص الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">إجمالي الإيرادات</span>
                    <span className="font-bold">$331,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">متوسط شهري</span>
                    <span className="font-bold">$55,167</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">أعلى شهر</span>
                    <span className="font-bold">يونيو ($67,000)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">أدنى شهر</span>
                    <span className="font-bold">مارس ($48,000)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                تحليل المصروفات
              </CardTitle>
              <CardDescription>توزيع المصروفات حسب الفئات المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <PieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={120}
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
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>أكبر المصروفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenseBreakdownData.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense.color }}></div>
                        <span className="font-medium">{expense.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${expense.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{expense.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تحليل الكفاءة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">معدل المصروفات</span>
                    <span className="font-bold">68.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">مقارنة بالهدف</span>
                    <Badge className="bg-green-100 text-green-800">أفضل من المتوقع</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">توفير محقق</span>
                    <span className="font-bold text-green-600">$15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">نصيحة</span>
                    <span className="text-xs text-muted-foreground">يمكن زيادة الاستثمار في التطوير</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                تحليل التدفق النقدي
              </CardTitle>
              <CardDescription>متابعة التدفق النقدي الداخل والخارج</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <AreaChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="inflow" stackId="1" stroke="var(--color-inflow)" fill="var(--color-inflow)" name="التدفق الداخل" />
                  <Area type="monotone" dataKey="outflow" stackId="2" stroke="var(--color-outflow)" fill="var(--color-outflow)" name="التدفق الخارج" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ملخص التدفق النقدي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">إجمالي التدفق الداخل</span>
                    <span className="font-bold text-green-600">$331,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">إجمالي التدفق الخارج</span>
                    <span className="font-bold text-red-600">$232,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">صافي التدفق</span>
                    <span className="font-bold text-blue-600">$99,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">معدل النمو</span>
                    <span className="font-bold">22.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التوقعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التدفق المتوقع الشهر القادم</span>
                    <span className="font-bold">$75,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">احتياطي نقدي</span>
                    <span className="font-bold">$150,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">مدة الاحتياطي</span>
                    <span className="font-bold">2.5 شهر</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التوصية</span>
                    <Badge className="bg-green-100 text-green-800">وضع صحي</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                تحليل الربحية
              </CardTitle>
              <CardDescription>مؤشرات الربحية والأداء المالي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">معدل الربح الإجمالي</p>
                  <p className="text-2xl font-bold text-green-600">29.8%</p>
                  <p className="text-xs text-muted-foreground">+2.3% من العام الماضي</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">معدل الربح الصافي</p>
                  <p className="text-2xl font-bold text-blue-600">22.1%</p>
                  <p className="text-xs text-muted-foreground">+1.8% من العام الماضي</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">عائد الاستثمار</p>
                  <p className="text-2xl font-bold text-purple-600">18.5%</p>
                  <p className="text-xs text-muted-foreground">+3.2% من العام الماضي</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">معدل النمو</p>
                  <p className="text-2xl font-bold text-orange-600">15.2%</p>
                  <p className="text-xs text-muted-foreground">+2.1% من العام الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>مقارنة الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الأداء الحالي</span>
                    <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">مقارنة بالمنافسين</span>
                    <Badge className="bg-blue-100 text-blue-800">أعلى من المتوسط</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التصنيف</span>
                    <Badge className="bg-purple-100 text-purple-800">A+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التوصية</span>
                    <span className="text-xs text-muted-foreground">استمر في الاستراتيجية الحالية</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التوقعات المستقبلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التوقع للربع القادم</span>
                    <span className="font-bold">$85,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">التوقع للعام</span>
                    <span className="font-bold">$400,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">معدل النمو المتوقع</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الاحتمالية</span>
                    <Badge className="bg-green-100 text-green-800">85%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            الرؤى والتوصيات
          </CardTitle>
          <CardDescription>تحليل ذكي وتوصيات لتحسين الأداء المالي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">نقاط القوة</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  معدل النمو يتجاوز الأهداف المحددة
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  التدفق النقدي إيجابي ومستقر
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  معدل التحصيل ممتاز (87%)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  المصروفات تحت السيطرة
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">التوصيات</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  زيادة الاستثمار في التطوير التقني
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  توسيع قاعدة العملاء
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  تحسين كفاءة العمليات
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  تطوير منتجات جديدة
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
