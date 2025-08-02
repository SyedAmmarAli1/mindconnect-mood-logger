import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  BookOpen, 
  Lightbulb, 
  Settings, 
  LogOut,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Track Your Mood',
      description: 'Record how you\'re feeling today',
      icon: Heart,
      path: '/mood-tracker',
      variant: 'secondary' as const
    },
    {
      title: 'Journal',
      description: 'Reflect and write your thoughts',
      icon: BookOpen,
      path: '/journal',
      variant: 'tertiary' as const
    },
    {
      title: 'Wellness Tips',
      description: 'Discover helpful suggestions',
      icon: Lightbulb,
      path: '/suggestions',
      variant: 'wellness' as const
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: Settings,
      path: '/settings',
      variant: 'outline' as const
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {getGreeting()}, {user?.name}! 👋
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Welcome to your mental wellness dashboard
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="shadow-card border-0">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Days Tracked</h3>
                <p className="text-2xl font-bold text-primary">
                  {JSON.parse(localStorage.getItem('mood_entries') || '[]').length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Current Streak</h3>
                <p className="text-2xl font-bold text-secondary">3</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-tertiary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Avg Mood</h3>
                <p className="text-2xl font-bold text-tertiary">😊</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {menuItems.map((item) => (
            <Card key={item.path} className="shadow-card border-0 hover:shadow-soft transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-calm">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={item.variant} 
                  className="w-full group-hover:-translate-y-1 transition-transform duration-300"
                  onClick={() => navigate(item.path)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Need to take a break?</p>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="mx-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;