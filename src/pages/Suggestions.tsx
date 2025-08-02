import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { 
  Flower2, 
  Dumbbell, 
  Heart, 
  Brain, 
  Coffee, 
  Music, 
  Sun, 
  BookOpen,
  Wind,
  Smile
} from 'lucide-react';

const Suggestions = () => {
  const suggestions = [
    {
      category: 'Breathing Exercises',
      icon: Wind,
      color: 'text-blue-500',
      tips: [
        {
          title: '4-7-8 Breathing',
          description: 'Inhale for 4 counts, hold for 7, exhale for 8. Repeat 3-4 times.',
          benefit: 'Reduces anxiety and promotes relaxation'
        },
        {
          title: 'Box Breathing',
          description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat.',
          benefit: 'Improves focus and reduces stress'
        },
        {
          title: 'Deep Belly Breathing',
          description: 'Place one hand on chest, one on belly. Focus on breathing into your belly.',
          benefit: 'Activates the relaxation response'
        }
      ]
    },
    {
      category: 'Physical Wellness',
      icon: Dumbbell,
      color: 'text-green-500',
      tips: [
        {
          title: '10-Minute Walk',
          description: 'Take a brief walk outside or around your home.',
          benefit: 'Boosts endorphins and improves mood'
        },
        {
          title: 'Gentle Stretching',
          description: 'Stretch your neck, shoulders, and back for 5 minutes.',
          benefit: 'Releases physical tension and stress'
        },
        {
          title: 'Progressive Muscle Relaxation',
          description: 'Tense and release each muscle group from toes to head.',
          benefit: 'Reduces physical and mental tension'
        }
      ]
    },
    {
      category: 'Mindfulness',
      icon: Brain,
      color: 'text-purple-500',
      tips: [
        {
          title: '5-4-3-2-1 Grounding',
          description: 'Notice 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.',
          benefit: 'Brings you back to the present moment'
        },
        {
          title: 'Mindful Observation',
          description: 'Choose an object and observe it for 2-3 minutes without judgment.',
          benefit: 'Improves focus and awareness'
        },
        {
          title: 'Body Scan Meditation',
          description: 'Notice sensations in each part of your body from head to toe.',
          benefit: 'Increases body awareness and relaxation'
        }
      ]
    },
    {
      category: 'Positive Affirmations',
      icon: Heart,
      color: 'text-pink-500',
      tips: [
        {
          title: 'Self-Compassion',
          description: '"I am worthy of love and kindness, especially from myself."',
          benefit: 'Builds self-esteem and reduces self-criticism'
        },
        {
          title: 'Strength Reminder',
          description: '"I have overcome challenges before, and I can do it again."',
          benefit: 'Reinforces resilience and confidence'
        },
        {
          title: 'Present Moment',
          description: '"This feeling is temporary, and I am safe in this moment."',
          benefit: 'Provides perspective during difficult times'
        }
      ]
    },
    {
      category: 'Self-Care Activities',
      icon: Flower2,
      color: 'text-emerald-500',
      tips: [
        {
          title: 'Warm Bath or Shower',
          description: 'Take 15-20 minutes for a relaxing bath with calming scents.',
          benefit: 'Soothes muscles and calms the mind'
        },
        {
          title: 'Listen to Music',
          description: 'Play your favorite calming or uplifting songs.',
          benefit: 'Regulates emotions and improves mood'
        },
        {
          title: 'Creative Expression',
          description: 'Draw, write, or create something for 10-15 minutes.',
          benefit: 'Provides emotional outlet and stress relief'
        }
      ]
    },
    {
      category: 'Quick Mood Boosters',
      icon: Sun,
      color: 'text-yellow-500',
      tips: [
        {
          title: 'Gratitude List',
          description: 'Write down 3 things you\'re grateful for right now.',
          benefit: 'Shifts focus to positive aspects of life'
        },
        {
          title: 'Reach Out to Someone',
          description: 'Send a message to a friend or family member.',
          benefit: 'Builds connection and reduces isolation'
        },
        {
          title: 'Accomplish Something Small',
          description: 'Tidy up a small area or complete a simple task.',
          benefit: 'Provides sense of accomplishment and control'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Wellness Suggestions</h1>
            <p className="text-muted-foreground">Discover helpful tips and techniques to support your mental wellness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((category, index) => (
              <Card key={index} className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-calm">
                      <category.icon className={`w-6 h-6 text-white`} />
                    </div>
                    {category.category}
                  </CardTitle>
                  <CardDescription>
                    Evidence-based techniques for {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                        <div className="flex items-center gap-2">
                          <Smile className="w-4 h-4 text-secondary" />
                          <p className="text-xs text-secondary font-medium">{tip.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="shadow-card border-0 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These suggestions are meant to complement, not replace, professional mental health care. 
                  If you're experiencing persistent or severe symptoms, please reach out to a mental health professional 
                  or crisis hotline.
                </p>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Crisis Support: If you're in immediate danger, call 988 (Suicide & Crisis Lifeline) or your local emergency services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;