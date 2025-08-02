import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Settings as SettingsIcon, Download, Bell, User, Palette } from 'lucide-react';

const Settings = () => {
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('mindconnect_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setReminderFrequency(settings.reminderFrequency || 'daily');
      setNotificationsEnabled(settings.notificationsEnabled ?? true);
      setDataSharing(settings.dataSharing ?? false);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      reminderFrequency,
      notificationsEnabled,
      dataSharing,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('mindconnect_settings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  const exportData = () => {
    const moodEntries = JSON.parse(localStorage.getItem('mood_entries') || '[]');
    const journalEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
    const settings = JSON.parse(localStorage.getItem('mindconnect_settings') || '{}');
    
    const exportData = {
      moodEntries,
      journalEntries,
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    // Create downloadable file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindconnect-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported!",
      description: "Your wellness data has been downloaded successfully.",
    });
  };

  const exportAsText = () => {
    const moodEntries = JSON.parse(localStorage.getItem('mood_entries') || '[]');
    const journalEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
    
    let textContent = 'MindConnect Wellness Report\n';
    textContent += '================================\n\n';
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    textContent += 'MOOD TRACKING SUMMARY\n';
    textContent += '-------------------\n';
    if (moodEntries.length > 0) {
      textContent += `Total entries: ${moodEntries.length}\n`;
      const avgMood = moodEntries.reduce((sum: number, entry: any) => sum + entry.mood, 0) / moodEntries.length;
      textContent += `Average mood: ${avgMood.toFixed(1)}/5\n\n`;

      textContent += 'Recent Mood Entries:\n';
      moodEntries.slice(-10).forEach((entry: any) => {
        const moodLabels = ['', 'Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
        textContent += `${new Date(entry.date).toLocaleDateString()}: ${moodLabels[entry.mood]}`;
        if (entry.tags.length > 0) {
          textContent += ` (Tags: ${entry.tags.join(', ')})`;
        }
        textContent += '\n';
      });
    } else {
      textContent += 'No mood entries recorded yet.\n';
    }

    textContent += '\n\nJOURNAL ENTRIES\n';
    textContent += '-------------\n';
    if (journalEntries.length > 0) {
      journalEntries.slice(-5).forEach((entry: any) => {
        textContent += `\nDate: ${new Date(entry.date).toLocaleDateString()}\n`;
        if (entry.reflection) {
          textContent += `Reflection: ${entry.reflection}\n`;
        }
        if (entry.gratitude) {
          textContent += `Gratitude: ${entry.gratitude}\n`;
        }
        textContent += '---\n';
      });
    } else {
      textContent += 'No journal entries recorded yet.\n';
    }

    const textBlob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(textBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindconnect-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Report exported!",
      description: "Your wellness report has been downloaded as a text file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your MindConnect experience</p>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Reminder Settings
                </CardTitle>
                <CardDescription>
                  Set up reminders to help you maintain your wellness routine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Reminders</label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications to track your mood and journal
                    </p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reminder Frequency</label>
                  <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="every-other-day">Every Other Day</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control how your data is used and stored
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Anonymous Data Sharing</label>
                    <p className="text-xs text-muted-foreground">
                      Help improve MindConnect by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-tertiary" />
                  Export Your Data
                </CardTitle>
                <CardDescription>
                  Download your wellness data for personal records or analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={exportAsText}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export as Text
                  </Button>
                  <Button
                    variant="outline"
                    onClick={exportData}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export as JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your data includes mood entries, journal entries, and settings. 
                  All data is stored locally on your device.
                </p>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="text-center">
              <Button 
                variant="wellness" 
                size="lg"
                onClick={saveSettings}
                className="px-12"
              >
                <SettingsIcon className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;