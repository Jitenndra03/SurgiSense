import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Send, Mic, AlertTriangle, Shield, ChevronLeft, Volume2 } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "ai",
      content: "Hello Margaret! I'm your AI Recovery Assistant. I'm here to help with questions about your hip replacement recovery. How are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      type: "user",
      content: "I'm having some pain in my hip when I try to walk. Is this normal?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "3",
      type: "ai",
      content: "Some discomfort during the first few weeks after hip replacement surgery is normal, especially when walking. However, let me ask you a few questions to better understand your situation:\n\n• On a scale of 1-10, how would you rate the pain?\n• Is the pain sharp or dull?\n• Have you taken your prescribed pain medication today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response with safety layer
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Based on what you've described, mild to moderate pain is expected during recovery. Make sure to:\n\n✓ Take your pain medication as prescribed\n✓ Use ice packs for 15-20 minutes\n✓ Elevate your leg when resting\n✓ Avoid putting full weight on your leg\n\nIf your pain level exceeds 7/10 or you notice swelling, redness, or fever, please contact your doctor immediately.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("Can I start putting more weight on my leg?");
      }, 2000);
    }
  };

  const exampleQuestions = [
    "When can I shower?",
    "What exercises should I do?",
    "Is swelling normal?",
    "When can I drive again?",
  ];

  return (
    <div className="min-h-screen bg-[#D3D0BC] flex flex-col">
      {/* Header */}
      <header className="bg-[#3E435D] px-4 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-[#D3D0BC]">
              <ChevronLeft className="w-7 h-7" />
            </Link>
            <Heart className="w-7 h-7 text-[#CBC3A5]" />
            <div>
              <h1 className="text-[#D3D0BC] text-lg font-semibold">AI Recovery Assistant</h1>
              <p className="text-[#9AA7B1] text-sm">Always here to help</p>
            </div>
          </div>
          <button className="text-[#D3D0BC]">
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Safety Notice */}
      <div className="bg-[#3E435D] px-4 py-3 border-t border-[#D3D0BC]/20">
        <div className="max-w-4xl mx-auto flex items-start gap-2">
          <Shield className="w-5 h-5 text-[#CBC3A5] shrink-0 mt-0.5" />
          <p className="text-[#9AA7B1] text-sm">
            AI suggestions are educational only. For medical emergencies, call 911 or your healthcare provider.
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => {
            if (message.type === "user") {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-[#9AA7B1] text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%] shadow-sm">
                    <p className="text-lg leading-relaxed">{message.content}</p>
                    <p className="text-xs text-white/70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            } else if (message.type === "ai") {
              return (
                <div key={message.id} className="flex justify-start">
                  <div className="bg-[#CBC3A5] text-[#3E435D] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#3E435D] rounded-full"></div>
                      <span className="text-sm font-semibold">AI Assistant</span>
                    </div>
                    <p className="text-lg leading-relaxed whitespace-pre-line">{message.content}</p>
                    <p className="text-xs text-[#3E435D]/60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-[#3E435D] border-2 border-[#3E435D] text-[#D3D0BC] rounded-2xl px-5 py-4 max-w-[90%] shadow-md">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-[#CBC3A5] shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-2">⚠️ Safety Alert</p>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Question Suggestions */}
      {messages.length <= 3 && (
        <div className="px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#3E435D] text-sm font-medium mb-3">Common Questions:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="bg-white text-[#3E435D] px-4 py-2 rounded-full text-sm border border-[#3E435D]/20 hover:bg-[#3E435D] hover:text-[#D3D0BC] transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white px-4 py-4 border-t border-[#3E435D]/20 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <div className="flex-1 bg-[#D3D0BC] rounded-2xl px-4 py-3 flex items-center gap-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your recovery..."
              className="flex-1 bg-transparent text-[#3E435D] placeholder:text-[#9AA7B1] resize-none outline-none text-lg min-h-7 max-h-32"
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '28px'
              }}
              onInput={(e) => {
                const target = e.target;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-[#3E435D] text-[#D3D0BC] p-3 rounded-xl hover:bg-[#4a5070] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Voice Input Button */}
          <button
            onClick={toggleRecording}
            className={`p-4 rounded-2xl transition-all shrink-0 ${
              isRecording
                ? "bg-[#d4183d] text-white animate-pulse"
                : "bg-[#3E435D] text-[#D3D0BC] hover:bg-[#4a5070]"
            }`}
          >
            <Mic className="w-7 h-7" />
          </button>
        </div>
        
        {isRecording && (
          <div className="max-w-4xl mx-auto mt-3">
            <div className="bg-[#d4183d]/10 text-[#d4183d] px-4 py-2 rounded-xl text-center">
              <p className="text-sm font-medium">🎤 Listening... Tap to stop</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
