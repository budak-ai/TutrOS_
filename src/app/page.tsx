'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { 
  User, 
  Calendar, 
  FileText, 
  BookOpen,
  Award,
  Edit,
  Plus,
  Download,
  Send,
  Users,
  CheckCircle,
  XCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  DollarSign,
  Settings,
  LogOut,
  PenTool,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  CalendarDays,
  BarChart3,
  Sun,
  Moon,
  Menu
} from 'lucide-react'

export default function TutrOS() {
  const [userType, setUserType] = useState<'tutor' | 'admin'>('tutor')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(true)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Tutor State
  const [tutorProfile, setTutorProfile] = useState({
    fullName: '',
    profilePhoto: '',
    contactEmail: '',
    phoneNumber: '',
    state: '',
    bio: '',
    education: '',
    certifications: '',
    experience: '',
    workplace: '',
    classLocation: ''
  })

  // Working Log State
  const [workingLogs, setWorkingLogs] = useState([
    { id: '1', date: '2024-01-15', studentName: 'Ahmad Rahman', subject: 'Mathematics', duration: '2 hours', earnings: 150, status: 'completed', time: '2:00 PM - 4:00 PM' },
    { id: '2', date: '2024-01-14', studentName: 'Siti Nurhaliza', subject: 'English', duration: '1.5 hours', earnings: 120, status: 'completed', time: '4:00 PM - 5:30 PM' },
    { id: '3', date: '2024-01-13', studentName: 'Muhammad Ali', subject: 'Science', duration: '2 hours', earnings: 100, status: 'completed', time: '10:00 AM - 12:00 PM' },
    { id: '4', date: '2024-01-12', studentName: 'Fatimah Ahmad', subject: 'History', duration: '1 hour', earnings: 80, status: 'completed', time: '3:00 PM - 4:00 PM' }
  ])

  // Invoice State
  const [invoices, setInvoices] = useState([
    { id: '1', studentName: 'Ahmad Rahman', subject: 'Mathematics', amount: 150, status: 'pending', dueDate: '2024-01-15', invoiceNumber: 'INV-001', createdDate: '2024-01-01' },
    { id: '2', studentName: 'Siti Nurhaliza', subject: 'English', amount: 120, status: 'paid', dueDate: '2024-01-10', invoiceNumber: 'INV-002', createdDate: '2024-01-02' }
  ])

  // Schedule State
  const [schedules, setSchedules] = useState([
    { id: '1', studentName: 'Ahmad Rahman', subject: 'Mathematics', level: 'SPM', day: 'Monday', time: '2:00 PM - 3:00 PM', status: 'scheduled', location: 'Kuala Lumpur' },
    { id: '2', studentName: 'Siti Nurhaliza', subject: 'English', level: 'Form 4', day: 'Wednesday', time: '4:00 PM - 5:00 PM', status: 'scheduled', location: 'Selangor' },
    { id: '3', studentName: 'Muhammad Ali', subject: 'Science', level: 'Form 3', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'completed', location: 'Kuala Lumpur' },
    { id: '4', studentName: 'Fatimah Ahmad', subject: 'History', level: 'Form 2', day: 'Thursday', time: '3:00 PM - 4:00 PM', status: 'scheduled', location: 'Putrajaya' },
    { id: '5', studentName: 'David Lee', subject: 'Physics', level: 'SPM', day: 'Friday', time: '1:00 PM - 2:00 PM', status: 'scheduled', location: 'Kuala Lumpur' },
    { id: '6', studentName: 'Sarah Johnson', subject: 'Chemistry', level: 'Form 5', day: 'Saturday', time: '10:00 AM - 11:30 AM', status: 'scheduled', location: 'Kuala Lumpur' },
    { id: '7', studentName: 'Ali Hassan', subject: 'Biology', level: 'Form 4', day: 'Sunday', time: '2:00 PM - 3:30 PM', status: 'scheduled', location: 'Selangor' }
  ])

  // Admin State
  const [pendingTutors, setPendingTutors] = useState([
    { id: '1', fullName: 'John Doe', email: 'john@example.com', experience: '5 years', subject: 'Mathematics', isApproved: false, appliedDate: '2024-01-15', qualifications: 'Bachelor of Education, TESOL Certified' },
    { id: '2', fullName: 'Jane Smith', email: 'jane@example.com', experience: '3 years', subject: 'English', isApproved: false, appliedDate: '2024-01-14', qualifications: 'Master of Arts, CELTA Certified' },
    { id: '3', fullName: 'Ahmad Hassan', email: 'ahmad@example.com', experience: '7 years', subject: 'Science', isApproved: false, appliedDate: '2024-01-13', qualifications: 'PhD in Physics, Teaching License' }
  ])

  const malaysiaStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 
    'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan Kuala Lumpur',
    'Wilayah Persekutuan Labuan', 'Wilayah Persekutuan Putrajaya'
  ]

  // Theme management
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true)
      setShowLoginDialog(false)
      // Determine user type based on email (simple logic for demo)
      if (loginEmail.includes('admin')) {
        setUserType('admin')
      } else {
        setUserType('tutor')
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLoginDialog(true)
    setUserType('tutor')
    setLoginEmail('')
    setLoginPassword('')
  }

  const createInvoice = () => {
    const newInvoice = {
      id: Date.now().toString(),
      studentName: 'New Student',
      subject: 'Subject',
      amount: 0,
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    }
    setInvoices([...invoices, newInvoice])
  }

  const addSchedule = () => {
    const newSchedule = {
      id: Date.now().toString(),
      studentName: 'New Student',
      subject: 'Subject',
      level: 'Level',
      day: 'Monday',
      time: '2:00 PM - 3:00 PM',
      status: 'scheduled',
      location: 'Kuala Lumpur'
    }
    setSchedules([...schedules, newSchedule])
  }

  const downloadInvoicePDF = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId)
    if (invoice) {
      // Simulate PDF download
      const pdfContent = `
INVOICE: ${invoice.invoiceNumber}
Student: ${invoice.studentName}
Subject: ${invoice.subject}
Amount: RM ${invoice.amount}
Due Date: ${invoice.dueDate}
Status: ${invoice.status}
      `
      const blob = new Blob([pdfContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoice.invoiceNumber}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const approveTutor = (tutorId: string) => {
    setPendingTutors(pendingTutors.map(tutor => 
      tutor.id === tutorId ? { ...tutor, isApproved: true } : tutor
    ))
  }

  const rejectTutor = (tutorId: string) => {
    setPendingTutors(pendingTutors.filter(tutor => tutor.id !== tutorId))
  }

  // Calculate dashboard statistics
  const totalEarnings = workingLogs.reduce((sum, log) => sum + log.earnings, 0)
  const totalHours = workingLogs.reduce((sum, log) => sum + parseFloat(log.duration), 0)
  const completedClasses = workingLogs.filter(log => log.status === 'completed').length
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length

  // Group schedules by week
  const getSchedulesByWeek = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return weekDays.map(day => ({
      day,
      schedules: schedules.filter(schedule => schedule.day === day)
    }))
  }

  // Login Dialog
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} flex items-center justify-center p-4`}>
        <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>TutrOS</h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-600'}`}>Your Tutor Operating System</p>
              </div>
            </div>
            <CardTitle className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome Back</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-200' : ''}>Email</Label>
              <Input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="password" className={theme === 'dark' ? 'text-gray-200' : ''}>Password</Label>
              <Input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''}
              />
            </div>
            <div className="space-y-2">
              <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
              <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                <p className="font-medium">Demo Access:</p>
                <p>• Use any email with "admin" for admin access</p>
                <p>• Use any other email for tutor access</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tutor View
  if (userType === 'tutor') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} flex flex-col`}>
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>TutrOS</h1>
                  <p className={`text-xs ${theme === 'dark' ? 'text-blue-200' : 'text-blue-600'}`}>Your Tutor Operating System</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Tutor
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{tutorProfile.fullName || 'Tutor'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={theme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : ''}
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={theme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : ''}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full grid-cols-5 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="invoices" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Invoices</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="working-log" className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4" />
                <span>Working Log</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Enhanced Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Total Students</CardTitle>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{schedules.length}</div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} flex items-center mt-1`}>
                      <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                      +{Math.floor(Math.random() * 5) + 1} from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Monthly Earnings</CardTitle>
                    <div className="p-2 bg-green-100 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>RM {totalEarnings.toLocaleString()}</div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} flex items-center mt-1`}>
                      <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Total Hours</CardTitle>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{totalHours.toFixed(1)}</div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} flex items-center mt-1`}>
                      <CalendarDays className="w-3 h-3 mr-1 text-blue-500" />
                      This month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Completion Rate</CardTitle>
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Award className="h-4 w-4 text-orange-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{Math.round((completedClasses / schedules.length) * 100)}%</div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'} flex items-center mt-1`}>
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      {completedClasses} completed
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Visual Analytics and Upcoming Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Enhanced Upcoming Schedule */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm lg:col-span-2`}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Upcoming Schedule</CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Your next classes with location details</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {schedules.filter(s => s.status === 'scheduled').length} Scheduled
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {schedules.filter(s => s.status === 'scheduled').slice(0, 6).map((schedule, index) => (
                        <div key={schedule.id} className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg transition-colors`}>
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>{schedule.studentName}</p>
                              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{schedule.subject} • {schedule.level}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                                  <CalendarDays className="w-3 h-3 mr-1" />
                                  {schedule.day}
                                </span>
                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                                  <Clock className="w-3 h-3 mr-1" />
                                  {schedule.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <MapPin className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium">{schedule.location}</span>
                            </div>
                            <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200 text-xs">
                              Scheduled
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Visual Analytics Card */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Visual Analytics</CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Performance overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Weekly Distribution */}
                    <div>
                      <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : ''}`}>Weekly Distribution</h4>
                      <div className="space-y-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                          const daySchedules = schedules.filter(s => s.day.toLowerCase().includes(day.toLowerCase())).length
                          const maxSchedules = Math.max(...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => 
                            schedules.filter(s => s.day === d).length
                          ))
                          const percentage = maxSchedules > 0 ? (daySchedules / maxSchedules) * 100 : 0
                          
                          return (
                            <div key={day} className="flex items-center space-x-2">
                              <span className={`text-xs w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{day}</span>
                              <div className={`flex-1 h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className={`text-xs w-4 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{daySchedules}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Subject Distribution */}
                    <div>
                      <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : ''}`}>Subject Distribution</h4>
                      <div className="space-y-2">
                        {['Mathematics', 'English', 'Science', 'History', 'Physics'].map(subject => {
                          const subjectCount = schedules.filter(s => s.subject === subject).length
                          const totalSchedules = schedules.length
                          const percentage = totalSchedules > 0 ? (subjectCount / totalSchedules) * 100 : 0
                          
                          return (
                            <div key={subject} className="flex items-center justify-between">
                              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{subject}</span>
                              <div className="flex items-center space-x-2">
                                <div className={`w-16 h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                  <div 
                                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className={`text-xs w-8 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{subjectCount}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{workingLogs.length}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sessions</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{invoices.length}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Invoices</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className={theme === 'dark' ? 'text-white' : ''}>Tutor Profile</span>
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Manage your personal and professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'} mb-4`}>Personal Information</h3>
                      <div>
                        <Label htmlFor="fullName" className={theme === 'dark' ? 'text-gray-200' : ''}>Full Name</Label>
                        <Input
                          id="fullName"
                          value={tutorProfile.fullName}
                          onChange={(e) => setTutorProfile({...tutorProfile, fullName: e.target.value})}
                          placeholder="Enter your full name"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail" className={theme === 'dark' ? 'text-gray-200' : ''}>Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={tutorProfile.contactEmail}
                          onChange={(e) => setTutorProfile({...tutorProfile, contactEmail: e.target.value})}
                          placeholder="your.email@example.com"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber" className={theme === 'dark' ? 'text-gray-200' : ''}>Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={tutorProfile.phoneNumber}
                          onChange={(e) => setTutorProfile({...tutorProfile, phoneNumber: e.target.value})}
                          placeholder="+60 12-3456789"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className={theme === 'dark' ? 'text-gray-200' : ''}>State in Malaysia</Label>
                        <Select value={tutorProfile.state} onValueChange={(value) => setTutorProfile({...tutorProfile, state: value})}>
                          <SelectTrigger className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {malaysiaStates.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'} mb-4`}>Professional Information</h3>
                      <div>
                        <Label htmlFor="education" className={theme === 'dark' ? 'text-gray-200' : ''}>Education</Label>
                        <Input
                          id="education"
                          value={tutorProfile.education}
                          onChange={(e) => setTutorProfile({...tutorProfile, education: e.target.value})}
                          placeholder="Your educational background"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="certifications" className={theme === 'dark' ? 'text-gray-200' : ''}>Certifications</Label>
                        <Input
                          id="certifications"
                          value={tutorProfile.certifications}
                          onChange={(e) => setTutorProfile({...tutorProfile, certifications: e.target.value})}
                          placeholder="Teaching certifications"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience" className={theme === 'dark' ? 'text-gray-200' : ''}>Experience</Label>
                        <Input
                          id="experience"
                          value={tutorProfile.experience}
                          onChange={(e) => setTutorProfile({...tutorProfile, experience: e.target.value})}
                          placeholder="Years of experience"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workplace" className={theme === 'dark' ? 'text-gray-200' : ''}>Workplace</Label>
                        <Input
                          id="workplace"
                          value={tutorProfile.workplace}
                          onChange={(e) => setTutorProfile({...tutorProfile, workplace: e.target.value})}
                          placeholder="Current workplace"
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="bio" className={theme === 'dark' ? 'text-gray-200' : ''}>Bio</Label>
                      <Textarea
                        id="bio"
                        value={tutorProfile.bio}
                        onChange={(e) => setTutorProfile({...tutorProfile, bio: e.target.value})}
                        placeholder="Tell us about yourself and your teaching philosophy"
                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="classLocation" className={theme === 'dark' ? 'text-gray-200' : ''}>Preferred Class Location</Label>
                      <Input
                        id="classLocation"
                        value={tutorProfile.classLocation}
                        onChange={(e) => setTutorProfile({...tutorProfile, classLocation: e.target.value})}
                        placeholder="Where you prefer to conduct classes"
                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span className={theme === 'dark' ? 'text-white' : ''}>Invoices</span>
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Manage your billing and invoices</CardDescription>
                  </div>
                  <Button onClick={createInvoice} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Invoice
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Invoice #</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Student</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Subject</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Amount</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Due Date</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{invoice.invoiceNumber}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{invoice.studentName}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{invoice.subject}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>RM {invoice.amount}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadInvoicePDF(invoice.id)}
                              >
                                <Download className="w-4 h-4" />
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

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className={theme === 'dark' ? 'text-white' : ''}>Weekly Schedule</span>
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Manage your teaching schedule</CardDescription>
                  </div>
                  <Button onClick={addSchedule} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Schedule
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {getSchedulesByWeek().map(({ day, schedules: daySchedules }) => (
                      <div key={day} className="space-y-3">
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>{day}</h3>
                        <div className="grid gap-3">
                          {daySchedules.map((schedule) => (
                            <div key={schedule.id} className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{schedule.studentName}</p>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{schedule.subject} • {schedule.level}</p>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{schedule.time}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-blue-600" />
                                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>{schedule.location}</span>
                                  <Badge variant={schedule.status === 'completed' ? 'default' : 'secondary'}>
                                    {schedule.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Working Log Tab */}
            <TabsContent value="working-log" className="space-y-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarDays className="w-5 h-5" />
                    <span className={theme === 'dark' ? 'text-white' : ''}>Working Log</span>
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Track your tutoring sessions and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Date</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Student</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Subject</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Duration</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Time</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Earnings</TableHead>
                        <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workingLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{log.date}</TableCell>
                          <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{log.studentName}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{log.subject}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{log.duration}</TableCell>
                          <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{log.time}</TableCell>
                          <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>RM {log.earnings}</TableCell>
                          <TableCell>
                            <Badge variant={log.status === 'completed' ? 'default' : 'secondary'}>
                              {log.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'} mt-8`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* About TutrOS Section */}
            <div className={`mb-8 p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>About TutrOS</h2>
              <div className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  <strong>TutrOS</strong>, developed by <strong>Technovo Enterprise</strong>, is a comprehensive virtual digital office designed to enhance workflow, productivity, and operational efficiency of tutors. The platform integrates essential teaching, management, and digital tools into a unified environment to support modern education delivery.
                </p>
                <p>
                  Founded in <strong>2015</strong>, Technovo Enterprise has evolved from its origins in engineering parts sales and trading into a diversified organisation operating within education and technology sectors. The company now provides a wide range of solutions aimed at advancing learning and digital capability across Malaysia.
                </p>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Our core services include:</h3>
                  <ul className={`list-disc list-inside space-y-1 ml-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li><strong>Tutoring services</strong> for secondary and tertiary education levels</li>
                    <li><strong>Educational seminars</strong> focused on academic development and skills enhancement</li>
                    <li><strong>Technology and IT workshops</strong>, including artificial intelligence awareness and digital literacy programs</li>
                  </ul>
                </div>
                <p>
                  Leveraging a strong technical foundation and growing expertise in education industry, Technovo Enterprise continues to deliver innovative training, digital platforms, and tailored solutions for Malaysian market.
                </p>
                <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-blue-200'}`}>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>For further information, please contact:</p>
                  <p className={`flex items-center mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    📧 <a href="mailto:muhaimin901227@gmail.com" className="ml-2 hover:underline">muhaimin901227@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Original Footer */}
            <div className="text-center">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2024 TutrOS - Your Tutor Operating System. All rights reserved.
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                Company Registration No: 1234567-M | SST No: SST-123456789
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Admin View
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} flex flex-col`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>TutrOS Admin</h1>
                <p className={`text-xs ${theme === 'dark' ? 'text-blue-200' : 'text-blue-600'}`}>Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Admin
              </Badge>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={theme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : ''}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className={theme === 'dark' ? 'text-white' : ''}>Tutor Approval Management</span>
            </CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Review and approve tutor applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Email</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Subject</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Experience</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Applied Date</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Qualifications</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{tutor.fullName}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{tutor.email}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{tutor.subject}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{tutor.experience}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{tutor.appliedDate}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{tutor.qualifications}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => approveTutor(tutor.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => rejectTutor(tutor.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'} mt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* About TutrOS Section */}
          <div className={`mb-8 p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>About TutrOS</h2>
            <div className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                <strong>TutrOS</strong>, developed by <strong>Technovo Enterprise</strong>, is a comprehensive virtual digital office designed to enhance workflow, productivity, and operational efficiency of tutors. The platform integrates essential teaching, management, and digital tools into a unified environment to support modern education delivery.
              </p>
              <p>
                Founded in <strong>2015</strong>, Technovo Enterprise has evolved from its origins in engineering parts sales and trading into a diversified organisation operating within education and technology sectors. The company now provides a wide range of solutions aimed at advancing learning and digital capability across Malaysia.
              </p>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Our core services include:</h3>
                <ul className={`list-disc list-inside space-y-1 ml-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li><strong>Tutoring services</strong> for secondary and tertiary education levels</li>
                  <li><strong>Educational seminars</strong> focused on academic development and skills enhancement</li>
                  <li><strong>Technology and IT workshops</strong>, including artificial intelligence awareness and digital literacy programs</li>
                </ul>
              </div>
              <p>
                Leveraging a strong technical foundation and growing expertise in education industry, Technovo Enterprise continues to deliver innovative training, digital platforms, and tailored solutions for Malaysian market.
              </p>
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-blue-200'}`}>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>For further information, please contact:</p>
                <p className={`flex items-center mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  📧 <a href="mailto:muhaimin901227@gmail.com" className="ml-2 hover:underline">muhaimin901227@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Original Footer */}
          <div className="text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 TutrOS - Your Tutor Operating System. All rights reserved.
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
              Company Registration No: 1234567-M | SST No: SST-123456789
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}