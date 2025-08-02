import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  FileText, 
  Mail, 
  BarChart3,
  Download
} from 'lucide-react';

const AdminDashboard = () => {
  const [moodData, setMoodData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [emailTemplate, setEmailTemplate] = useState('wellness-check');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');

  useEffect(() => {
    // Load mock data
    const allUsers = JSON.parse(localStorage.getItem('mindconnect_users') || '[]');
    const allMoodEntries = JSON.parse(localStorage.getItem('mood_entries') || '[]');
    
    setUsers(allUsers);
    setMoodData(allMoodEntries);
  }, []);

  // Mock data for demonstration
  const courses = ['All Courses', 'Psychology 101', 'Computer Science', 'Biology', 'Mathematics'];
  
  const mockFeedback = [
    {
      id: 1,
      type: 'complaint',
      course: 'Psychology 101',
      message: 'The mood tracking interface could be more intuitive',
      date: '2024-01-15',
      status: 'open'
    },
    {
      id: 2,
      type: 'suggestion',
      course: 'Computer Science',
      message: 'Would love to see more guided meditation options',
      date: '2024-01-14',
      status: 'reviewed'
    },
    {
      id: 3,
      type: 'technical',
      course: 'Biology',
      message: 'App sometimes crashes when saving journal entries',
      date: '2024-01-13',
      status: 'in-progress'
    }
  ];

  const emailTemplates = {
    'wellness-check': {
      subject: 'Wellness Check-In from MindConnect',
      content: 'Hi there,\n\nWe noticed you haven\'t logged your mood in a few days. Your mental wellness is important to us.\n\nTake a moment to check in with yourself today.\n\nBest regards,\nMindConnect Team'
    },
    'encouragement': {
      subject: 'You\'re Doing Great! Keep Going',
      content: 'Hi,\n\nWe wanted to remind you of the progress you\'ve been making with your wellness journey.\n\nKeep up the great work!\n\nBest,\nMindConnect Team'
    },
    'resources': {
      subject: 'Helpful Wellness Resources',
      content: 'Hello,\n\nWe\'ve compiled some additional resources that might help you on your wellness journey.\n\nRemember, seeking help is a sign of strength.\n\nTake care,\nMindConnect Team'
    }
  };

  const handleTemplateChange = (template: string) => {
    setEmailTemplate(template);
    const selectedTemplate = emailTemplates[template as keyof typeof emailTemplates];
    setEmailSubject(selectedTemplate.subject);
    setEmailContent(selectedTemplate.content);
  };

  // Calculate mood trends
  const calculateMoodTrends = () => {
    if (moodData.length === 0) return [];
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayEntries = moodData.filter(entry => 
        new Date(entry.date).toDateString() === dateStr
      );
      
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length
        : 0;
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: avgMood
      });
    }
    
    return last7Days;
  };

  const flaggedUsers = users.filter(user => {
    const userMoods = moodData.filter(entry => entry.userId === user.id);
    const recentSadMoods = userMoods.filter(entry => 
      entry.mood <= 2 && 
      new Date(entry.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    return recentSadMoods.length >= 3;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor student wellness and manage the MindConnect platform</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Total Users</h3>
              <p className="text-2xl font-bold text-primary">{users.length}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Mood Entries</h3>
              <p className="text-2xl font-bold text-secondary">{moodData.length}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Flagged Users</h3>
              <p className="text-2xl font-bold text-warning">{flaggedUsers.length}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-tertiary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Avg Mood</h3>
              <p className="text-2xl font-bold text-tertiary">
                {moodData.length > 0 
                  ? (moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length).toFixed(1)
                  : '0'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Trends Chart */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                7-Day Mood Trends
              </CardTitle>
              <CardDescription>Average mood scores over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calculateMoodTrends().map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{day.date}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.mood / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{day.mood.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flagged Students */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Flagged Students
              </CardTitle>
              <CardDescription>Students with multiple low mood entries this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flaggedUsers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No flagged students at this time</p>
                ) : (
                  flaggedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feedback Table */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-tertiary" />
                Student Feedback
              </CardTitle>
              <CardDescription>
                Anonymous feedback and complaints from students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.slice(1).map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {mockFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {feedback.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                      <p className="text-sm text-foreground mb-1">{feedback.message}</p>
                      <p className="text-xs text-muted-foreground">Course: {feedback.course}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Template */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary" />
                Send Email
              </CardTitle>
              <CardDescription>Send wellness communications to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={emailTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wellness-check">Wellness Check-In</SelectItem>
                  <SelectItem value="encouragement">Encouragement</SelectItem>
                  <SelectItem value="resources">Resource Sharing</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              
              <Textarea
                placeholder="Email content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-32 resize-none"
              />
              
              <Button variant="secondary" className="w-full">
                Send Email (Demo)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card className="shadow-card border-0 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Generate Reports
            </CardTitle>
            <CardDescription>Export wellness data and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Weekly Report (PDF)
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Monthly Analytics (PDF)
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                User Data Export (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;