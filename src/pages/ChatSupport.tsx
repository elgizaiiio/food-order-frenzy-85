
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, UserRound, MessageCircle, Image, X, PaperclipIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
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
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate support response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const supportResponses = [
        'شكراً للتواصل معنا. سيقوم أحد أعضاء فريق الدعم بالرد عليك قريباً.',
        'تم استلام رسالتك، وسنعمل على الرد في أقرب وقت ممكن.',
        'نشكرك على تواصلك، فريق الدعم الفني سيتواصل معك خلال ساعات العمل.'
      ];
      
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      
      const supportMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
      
      toast({
        title: "تم استلام رسالتك",
        description: "سيتم الرد عليك قريباً"
      });
    }, 1500);
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

  const openImagePreview = (image: string) => {
    setPreviewImage(image);
    setShowImagePreview(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-b-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl shadow-md z-10">
          <Link to="/settings" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h1 className="text-lg font-bold">مركز المساعدة</h1>
          </div>
          <div className="w-6"></div>
        </div>
        
        {/* Chat Messages Area */}
        <ScrollArea className="h-[calc(100vh-180px)] px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
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
                        <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center">
                          <UserRound className="w-4 h-4 text-white" />
                        </div>
                      </>
                    )}
                  </div>
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.image && (
                    <div className="mt-2 cursor-pointer" onClick={() => openImagePreview(message.image!)}>
                      <img 
                        src={message.image} 
                        alt="صورة مرفقة" 
                        className="rounded-md max-h-60 w-auto object-contain hover:opacity-90 transition-opacity"
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
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-1" />
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
                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                aria-label="حذف الصورة"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        
        {/* Message Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-xl">
          <Card className="border-blue-100 shadow-sm">
            <CardContent className="p-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="min-h-[80px] border-blue-200 focus:border-blue-400 pr-10 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={triggerImageUpload}
                      className="absolute bottom-3 right-3 text-blue-500 hover:text-blue-700 transition-colors"
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
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-[80px] px-4 rounded-lg shadow-sm transition-all"
                  disabled={!newMessage.trim() && !selectedImage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full-screen image preview dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
          {previewImage && (
            <div className="relative">
              <img 
                src={previewImage} 
                alt="معاينة الصورة" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 rounded-full"
                onClick={() => setShowImagePreview(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatSupport;
