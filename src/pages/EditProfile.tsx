
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'أحمد محمد',
    username: 'ahmed_dam',
    profilePicture: undefined,
  });
  
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    profilePicture: user.profilePicture,
  });
  
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this to a database
    // For now, we'll just update the local state and navigate back
    setUser({
      name: formData.name,
      username: formData.username,
      profilePicture: formData.profilePicture,
    });
    
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم حفظ التغييرات بنجاح",
    });
    
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-blue-800">تعديل الملف الشخصي</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-8 animate-fade-in">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                {(imagePreview || formData.profilePicture) ? (
                  <AvatarImage 
                    src={imagePreview || formData.profilePicture} 
                    alt={formData.name} 
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer shadow-md transition-colors">
                <Upload className="w-4 h-4 text-white" />
              </label>
              <input 
                type="file" 
                id="profile-picture" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-sm text-blue-600">اضغط على الأيقونة لتغيير الصورة الشخصية</p>
          </div>

          {/* Name Input */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Label htmlFor="name" className="block mb-2 text-blue-800">الاسم</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-blue-200 focus:border-blue-400 focus:ring-blue-300"
              required
            />
          </div>

          {/* Username Input */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Label htmlFor="username" className="block mb-2 text-blue-800">اسم المستخدم</Label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">@</span>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pr-8 border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                required
              />
            </div>
            <p className="text-xs text-blue-500 mt-1">سيظهر اسم المستخدم في صفحتك الشخصية</p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-md animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            حفظ التغييرات
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
