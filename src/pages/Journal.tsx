import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { BookOpen, Heart, Lightbulb } from 'lucide-react';

const Journal = () => {
  const [reflection, setReflection] = useState('');
  const [gratitude, setGratitude] = useState('');
  const { toast } = useToast();

  const prompts = [
    "What are three things that went well today?",
    "How did I handle challenges today?",
    "What am I most grateful for right now?",
    "What would I like to improve about today?",
    "What made me smile today?",
    "What lesson did I learn today?",
    "How did I show kindness to myself or others today?",
    "What am I looking forward to tomorrow?"
  ];

  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  const handleSubmit = () => {
    if (!reflection.trim() && !gratitude.trim()) {
      toast({
        title: "Please write something",
        description: "Add either a reflection or gratitude entry before submitting.",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now().toString(),
      reflection: reflection.trim(),
      gratitude: gratitude.trim(),
      prompt: currentPrompt,
      date: new Date().toISOString(),
    };

    const existingEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
    existingEntries.push(entry);
    localStorage.setItem('journal_entries', JSON.stringify(existingEntries));

    toast({
      title: "Journal entry saved!",
      description: "Your thoughts have been recorded successfully.",
    });

    // Reset form
    setReflection('');
    setGratitude('');
  };

  const journalEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]');

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Guided Journaling</h1>
            <p className="text-muted-foreground">Reflect on your thoughts and practice gratitude</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Journaling Section */}
            <div className="space-y-6">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Daily Reflection
                  </CardTitle>
                  <CardDescription>
                    Today's prompt: "{currentPrompt}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your thoughts and reflections here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-40 resize-none"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    Gratitude Practice
                  </CardTitle>
                  <CardDescription>
                    What are you grateful for today?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="List three things you're grateful for today..."
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  variant="wellness" 
                  size="lg"
                  onClick={handleSubmit}
                  className="px-12"
                >
                  Save Journal Entry
                </Button>
              </div>
            </div>

            {/* Previous Entries */}
            <div>
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-tertiary" />
                    Recent Entries
                  </CardTitle>
                  <CardDescription>
                    Your journey of self-reflection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {journalEntries.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No journal entries yet. Start writing your first entry!
                      </p>
                    ) : (
                      journalEntries
                        .slice(-5)
                        .reverse()
                        .map((entry: any) => (
                          <div 
                            key={entry.id} 
                            className="p-4 bg-muted rounded-lg space-y-2"
                          >
                            <div className="text-xs text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </div>
                            {entry.reflection && (
                              <div>
                                <p className="font-medium text-sm text-primary">Reflection:</p>
                                <p className="text-sm text-foreground line-clamp-3">
                                  {entry.reflection}
                                </p>
                              </div>
                            )}
                            {entry.gratitude && (
                              <div>
                                <p className="font-medium text-sm text-secondary">Gratitude:</p>
                                <p className="text-sm text-foreground line-clamp-2">
                                  {entry.gratitude}
                                </p>
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;