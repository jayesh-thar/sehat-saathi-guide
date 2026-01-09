import React, { useEffect } from 'react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onListeningChange?: (isListening: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onListeningChange,
  className,
  disabled = false,
}) => {
  const { language } = useLanguage();
  const {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition(language);

  // Send transcript to parent when it changes
  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  // Notify parent of listening state changes
  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  if (!isSupported) {
    return null; // Don't show button if not supported
  }

  return (
    <div className={cn('relative', className)}>
      <Button
        type="button"
        variant={isListening ? 'destructive' : 'outline'}
        size="icon"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative transition-all',
          isListening && 'animate-pulse ring-2 ring-destructive ring-offset-2'
        )}
        title={
          isListening
            ? language === 'hi'
              ? 'रिकॉर्डिंग बंद करें'
              : 'Stop recording'
            : language === 'hi'
            ? 'बोलकर लिखें'
            : 'Voice input'
        }
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        
        {/* Recording indicator */}
        {isListening && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        )}
      </Button>

      {/* Error tooltip */}
      {error && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded whitespace-nowrap z-50">
          {error}
        </div>
      )}

      {/* Listening indicator */}
      {isListening && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap z-50 flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          {language === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
