'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Calendar, 
  FileText, 
  MessageSquare, 
  DollarSign, 
  Clock,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  Edit,
  Plus,
  Download,
  Send
} from 'lucide-react'

export default function TutrOS() {
  const [activeTab, setActiveTab] = useState('dashboard')
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
    workplace: ''
  })

  const [invoices, setInvoices] = useState([
    { id: '1', studentName: 'Ahmad Rahman', subject: 'Mathematics', amount: 150, status: 'pending', dueDate: '2024-01-15' },
    { id: '2', studentName: 'Siti Nurhaliza', subject: 'English', amount: 120, status: 'paid', dueDate: '2024-01-10' }
  ])

  const [schedules, setSchedules] = useState([
    { id: '1', studentName: 'Ahmad Rahman', subject: 'Mathematics', level: 'SPM', day: 'Monday', time: '2:00 PM - 3:00 PM', status: 'scheduled' },
    { id: '2', studentName: 'Siti Nurhaliza', subject: 'English', level: 'Form 4', day: 'Wednesday', time: '4:00 PM - 5:00 PM', status: 'scheduled' }
  ])

  const [messages, setMessages] = useState([
    { id: '1', subject: 'Profile Verification', content: 'Please submit your teaching certificates', status: 'open', type: 'verification' },
    { id: '2', subject: 'Account Update', content: 'Your profile has been approved', status: 'resolved', type: 'support' }
  ])

  const malaysiaStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 
    'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan Kuala Lumpur',
    'Wilayah Persekutuan Labuan', 'Wilayah Persekutuan Putrajaya'
  ]

  const createInvoice = () => {
    const newInvoice = {
      id: Date.now().toString(),
      studentName: 'New Student',
      subject: 'Subject',
      amount: 0,
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0]
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
      status: 'scheduled'
    }
    setSchedules([...schedules, newSchedule])
  }

  const sendMessage = () => {
    const newMessage = {
      id: Date.now().toString(),
      subject: 'New Support Request',
      content: 'Message content',
      status: 'open',
      type: 'support'
    }
    setMessages([...messages, newMessage])
  }

  const downloadInvoicePDF = (invoiceId: string) => {
    alert(`Downloading PDF for invoice ${invoiceId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">TutrOS</h1>
                <p className="text-xs text-blue-600">Your Tutor Operating System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Approved
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
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
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <User className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 2,450</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest invoice activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {invoices.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.studentName}</p>
                        <p className="text-sm text-gray-600">{invoice.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">RM {invoice.amount}</p>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedules.slice(0, 3).map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{schedule.studentName}</p>
                        <p className="text-sm text-gray-600">{schedule.subject} - {schedule.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{schedule.time}</p>
                        <Badge variant="outline">{schedule.day}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>Your identity and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={tutorProfile.fullName}
                      onChange={(e) => setTutorProfile({...tutorProfile, fullName: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={tutorProfile.contactEmail}
                      onChange={(e) => setTutorProfile({...tutorProfile, contactEmail: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={tutorProfile.phoneNumber}
                      onChange={(e) => setTutorProfile({...tutorProfile, phoneNumber: e.target.value})}
                      placeholder="+60 12-3456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State in Malaysia</Label>
                    <Select value={tutorProfile.state} onValueChange={(value) => setTutorProfile({...tutorProfile, state: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {malaysiaStates.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bio">Professional Introduction</Label>
                    <Textarea
                      id="bio"
                      value={tutorProfile.bio}
                      onChange={(e) => setTutorProfile({...tutorProfile, bio: e.target.value})}
                      placeholder="Tell us about yourself and your teaching approach..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Professional Credentials</span>
                  </CardTitle>
                  <CardDescription>Your qualifications and experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="education">Educational Background</Label>
                    <Textarea
                      id="education"
                      value={tutorProfile.education}
                      onChange={(e) => setTutorProfile({...tutorProfile, education: e.target.value})}
                      placeholder="e.g., Bachelor of Education in Mathematics, University of Malaya"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="certifications">Teaching Certifications</Label>
                    <Textarea
                      id="certifications"
                      value={tutorProfile.certifications}
                      onChange={(e) => setTutorProfile({...tutorProfile, certifications: e.target.value})}
                      placeholder="e.g., TESOL, IGCSE Certification, etc."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={tutorProfile.experience}
                      onChange={(e) => setTutorProfile({...tutorProfile, experience: e.target.value})}
                      placeholder="Number of years teaching/tutoring"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workplace">Workplace/School Affiliation</Label>
                    <Input
                      id="workplace"
                      value={tutorProfile.workplace}
                      onChange={(e) => setTutorProfile({...tutorProfile, workplace: e.target.value})}
                      placeholder="Optional: Current or previous workplace"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Create and manage your tutoring invoices</CardDescription>
                </div>
                <Button onClick={createInvoice} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium">{invoice.studentName}</h3>
                          <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{invoice.subject}</p>
                        <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold">RM {invoice.amount}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadInvoicePDF(invoice.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>Manage your tutoring schedule</CardDescription>
                </div>
                <Button onClick={addSchedule} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium">{schedule.studentName}</h3>
                          <Badge variant="outline">{schedule.level}</Badge>
                          <Badge variant={schedule.status === 'completed' ? 'default' : 'secondary'}>
                            {schedule.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{schedule.subject}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {schedule.day}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {schedule.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Admin Communication</CardTitle>
                  <CardDescription>Messages with support and verification team</CardDescription>
                </div>
                <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium">{message.subject}</h3>
                          <Badge variant={message.type === 'verification' ? 'default' : 'secondary'}>
                            {message.type}
                          </Badge>
                          <Badge variant={message.status === 'resolved' ? 'default' : 'destructive'}>
                            {message.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{message.content}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        {message.status !== 'resolved' && (
                          <Button variant="outline" size="sm">
                            Mark as Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}