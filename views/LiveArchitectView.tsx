
import React, { useState, useRef, useEffect } from 'react';
import { connectToLiveArchitect, decodeAudioData, decode, encode } from '../services/geminiService';
import { Card } from '../components/ui/Card';
import { 
  Mic, 
  MicOff, 
  Radio, 
  Activity, 
  Waves, 
  Zap, 
  ShieldCheck, 
  XCircle,
  Terminal,
  Layers,
  MessageSquare,
  User,
  Bot
} from 'lucide-react';

interface TranscriptionEntry {
  role: 'user' | 'model';
  text: string;
}

const LiveArchitectView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcriptions, setTranscriptions] = useState<TranscriptionEntry[]>([]);
  
  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    for (const source of sourcesRef.current.values()) {
      try { source.stop(); } catch (e) {}
    }
    sourcesRef.current.clear();
    setIsActive(false);
    setTranscriptions([]);
    currentInputTranscription.current = '';
    currentOutputTranscription.current = '';
  };

  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcriptions]);

  useEffect(() => {
    return () => cleanup();
  }, []);

  const startSession = async () => {
    setError(null);
    setTranscriptions([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });

      const sessionPromise = connectToLiveArchitect({
        onopen: () => {
          setIsActive(true);
          const source = audioContextRef.current!.createMediaStreamSource(stream);
          const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
          scriptProcessorRef.current = scriptProcessor;

          scriptProcessor.onaudioprocess = (e) => {
            if (isMuted) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const base64Data = encode(new Uint8Array(int16.buffer));
            
            sessionPromise.then(session => {
              session.sendRealtimeInput({
                media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
              });
            });
          };

          source.connect(scriptProcessor);
          scriptProcessor.connect(audioContextRef.current!.destination);
        },
        onmessage: async (message: any) => {
          // Transcription handling
          if (message.serverContent?.outputTranscription) {
            currentOutputTranscription.current += message.serverContent.outputTranscription.text;
          } else if (message.serverContent?.inputTranscription) {
            currentInputTranscription.current += message.serverContent.inputTranscription.text;
          }

          if (message.serverContent?.turnComplete) {
            const userText = currentInputTranscription.current;
            const modelText = currentOutputTranscription.current;
            
            if (userText) setTranscriptions(prev => [...prev, { role: 'user', text: userText }]);
            if (modelText) setTranscriptions(prev => [...prev, { role: 'model', text: modelText }]);
            
            currentInputTranscription.current = '';
            currentOutputTranscription.current = '';
          }

          // Audio handling
          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64Audio && outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            
            const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
            });
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
            for (const source of sourcesRef.current.values()) {
              try { source.stop(); } catch (e) {}
            }
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            currentOutputTranscription.current += ' [Interrupted]';
          }
        },
        onerror: (e: any) => {
          console.error("Live session error:", e);
          setError("Neural Uplink Error.");
          cleanup();
        },
        onclose: () => {
          cleanup();
        }
      });

    } catch (err: any) {
      console.error(err);
      setError("Microphone Link Failure.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <Card className="lg:w-1/3 flex flex-col p-8 justify-between" title="Live Consultant" subtitle="Real-time Voice Architecture">
          <div className="space-y-8">
            <div className={`w-32 h-32 mx-auto rounded-[3rem] flex items-center justify-center transition-all duration-700 relative ${
              isActive ? 'bg-indigo-600 shadow-2xl shadow-indigo-500/50' : 'bg-gray-50'
            }`}>
              {isActive && (
                <div className="absolute inset-0 rounded-[3rem] animate-ping bg-indigo-500/20" />
              )}
              <Waves className={`transition-all duration-500 ${isActive ? 'text-white scale-125' : 'text-gray-200'}`} size={48} />
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-gray-900">
                {isActive ? 'Consultation Active' : 'Uplink Standby'}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium px-4 leading-relaxed">
                {isActive 
                  ? 'The consultant is listening to your workflow requirements.' 
                  : 'Collaborate with the AI architect in a natural voice session.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-600 flex items-center gap-2">
                <XCircle size={14} /> {error}
              </div>
            )}
            
            {!isActive ? (
              <button
                onClick={startSession}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
              >
                <Radio size={18} />
                Start Live Consultation
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${
                    isMuted ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  {isMuted ? 'Microphone Muted' : 'Microphone Active'}
                </button>
                <button
                  onClick={cleanup}
                  className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  <XCircle size={16} />
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        </Card>

        <Card className="flex-1 flex flex-col h-full bg-[#0d0e12] border-gray-800" title="Consultation Transcript" subtitle="Live stream telemetry">
          <div ref={transcriptScrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {!isActive && transcriptions.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-10 gap-6 grayscale">
                <MessageSquare size={80} className="text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">No Active Transcript</span>
              </div>
            )}

            {transcriptions.map((entry, idx) => (
              <div key={idx} className={`flex gap-4 animate-in ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${entry.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    entry.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-indigo-400'
                  }`}>
                    {entry.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[11px] font-medium leading-relaxed ${
                    entry.role === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white/5 text-gray-300 border border-white/10'
                  }`}>
                    {entry.text}
                  </div>
                </div>
              </div>
            ))}

            {isActive && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                  <Activity size={14} className="text-indigo-400 animate-pulse" />
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Active Neural Link</span>
                    <div className="flex gap-1">
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-800 flex items-center justify-between text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500/50" />
              Secure Protocol
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-yellow-500/50" />
              Gemini 2.5 Native Audio
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LiveArchitectView;
