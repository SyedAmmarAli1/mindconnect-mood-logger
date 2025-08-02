import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/home');
    } else if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Monitor your emotional wellbeing with daily mood logs and insights.'
    },
    {
      icon: BookOpen,
      title: 'Guided Journaling',
      description: 'Reflect on your thoughts with structured prompts and gratitude practices.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visualize your wellness journey with comprehensive mood trends.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays private with local storage and no external tracking.'
    }
  ];

  const benefits = [
    'Track your mood with intuitive emoji-based rating',
    'Practice gratitude and mindful reflection',
    'Access evidence-based wellness suggestions',
    'Export your data for personal records',
    'Set personalized reminder frequencies',
    'Completely private and secure'
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-wellness rounded-full mb-8 shadow-wellness animate-float">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Mental Wellness
            <span className="bg-gradient-wellness bg-clip-text text-transparent"> Journey</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            MindConnect helps you track your mood, practice mindful journaling, and build healthy mental wellness habits. 
            Start your journey to better mental health today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="wellness" 
              size="xl"
              onClick={() => navigate('/signup')}
              className="group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need for mental wellness
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to support your mental health journey with evidence-based practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card border-0 hover:shadow-soft transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-calm rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why choose MindConnect?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/signup')}
                >
                  Start Your Journey
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-card border-0 bg-gradient-wellness text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    For Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track your daily mood, practice gratitude, and access wellness resources designed specifically for your mental health journey.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card border-0 bg-gradient-calm text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    For Administrators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitor student wellbeing trends, identify students who may need support, and manage wellness resources effectively.</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/admin/login')}
                    className="mt-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    Admin Access
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="shadow-card border-0 bg-gradient-subtle">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to prioritize your mental wellness?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using MindConnect to build healthier mental wellness habits.
            </p>
            <Button 
              variant="wellness" 
              size="xl"
              onClick={() => navigate('/signup')}
              className="group"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
