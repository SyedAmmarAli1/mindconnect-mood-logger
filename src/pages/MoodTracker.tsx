import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState('');
  const { toast } = useToast();

  const moods = [
    { value: 1, emoji: '😭', label: 'Very Sad', color: 'mood-very-sad' },
    { value: 2, emoji: '😔', label: 'Sad', color: 'mood-sad' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'mood-neutral' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'mood-happy' },
    { value: 5, emoji: '😁', label: 'Very Happy', color: 'mood-very-happy' },
  ];

  const moodTags = [
    'Anxious', 'Motivated', 'Tired', 'Energetic', 'Stressed',
    'Calm', 'Excited', 'Overwhelmed', 'Peaceful', 'Frustrated',
    'Grateful', 'Lonely', 'Confident', 'Worried', 'Content'
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today before submitting.",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now().toString(),
      mood: selectedMood,
      tags: selectedTags,
      journal: journalEntry,
      date: new Date().toISOString(),
    };

    const existingEntries = JSON.parse(localStorage.getItem('mood_entries') || '[]');
    existingEntries.push(entry);
    localStorage.setItem('mood_entries', JSON.stringify(existingEntries));

    toast({
      title: "Mood recorded!",
      description: "Your mood has been successfully tracked for today.",
    });

    // Reset form
    setSelectedMood(null);
    setSelectedTags([]);
    setJournalEntry('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">How are you feeling today?</h1>
            <p className="text-muted-foreground">Track your mood and thoughts to better understand your mental wellness</p>
          </div>

          <Card className="shadow-card border-0 mb-6">
            <CardHeader>
              <CardTitle>Select Your Mood</CardTitle>
              <CardDescription>Choose the emoji that best represents how you feel right now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {moods.map((mood) => (
                  <Button
                    key={mood.value}
                    variant="mood"
                    className={`h-20 flex flex-col items-center gap-2 transition-all duration-300 ${
                      selectedMood === mood.value 
                        ? 'ring-2 ring-primary bg-primary/10 scale-105' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setSelectedMood(mood.value)}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs font-medium">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 mb-6">
            <CardHeader>
              <CardTitle>How are you feeling? (Optional)</CardTitle>
              <CardDescription>Select any tags that describe your current state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {moodTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <label
                      htmlFor={tag}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 mb-6">
            <CardHeader>
              <CardTitle>Journal Entry (Optional)</CardTitle>
              <CardDescription>Write about your day, thoughts, or anything on your mind</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's on your mind today? How did your day go? What are you grateful for?"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
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
              Save Today's Mood
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;