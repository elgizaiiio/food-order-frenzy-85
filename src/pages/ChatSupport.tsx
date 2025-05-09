
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, UserRound, MessageCircle, Image, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  image?: string;
};

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'مرحباً بك، كيف يمكننا مساعدتك اليوم؟',
      sender: 'support',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && !selectedImage) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage || undefined
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setSelectedImage(null);
    
    // Simulate support response after a delay
    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: 'شكراً للتواصل معنا. سيقوم أحد أعضاء فريق الدعم بالرد عليك في أقرب وقت ممكن.',
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
      
      toast({
        title: "تم استلام رسالتك",
        description: "سيتم الرد عليك قريباً"
      });
    }, 1000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/settings" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">مركز المساعدة</h1>
          <div className="w-6"></div>
        </div>
        
        {/* Chat Messages Area */}
        <ScrollArea className="h-[calc(100vh-180px)] px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'support' ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium">
                          فريق الدعم
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium mr-auto">
                          أنت
                        </span>
                        <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
                          <UserRound className="w-4 h-4 text-white" />
                        </div>
                      </>
                    )}
                  </div>
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.image && (
                    <div className="mt-2">
                      <img 
                        src={message.image} 
                        alt="صورة مرفقة" 
                        className="rounded-md max-h-60 w-auto object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    } text-left`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Image Preview (if image is selected) */}
        {selectedImage && (
          <div className="sticky bottom-[140px] bg-white border-t border-gray-200 p-2">
            <div className="relative inline-block">
              <img 
                src={selectedImage} 
                alt="صورة مرفقة" 
                className="h-20 w-auto object-contain rounded-md border border-gray-300"
              />
              <button 
                onClick={removeSelectedImage} 
                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        
        {/* Message Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="min-h-[80px] border-blue-200 focus:border-blue-400 pr-10"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={triggerImageUpload}
                  className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700"
                  title="إرفاق صورة"
                >
                  <Image className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 h-[80px] px-4"
              disabled={!newMessage.trim() && !selectedImage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
