
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRestaurants, fetchRestaurantDetails, fetchRestaurantMenu, Restaurant, MenuItem } from '@/services/restaurantService';
import { useState, useEffect, useMemo } from 'react';

// استخدام الذاكرة المؤقتة المُحسّنة وتحسينات الأداء
export function useRestaurants() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    // تحسين أداء الذاكرة المؤقتة
    staleTime: 1000 * 60 * 5, // 5 دقائق
    // إعادة استخدام البيانات المخزنة مؤقتًا لتحسين الأداء
    placeholderData: () => {
      // التحقق من وجود بيانات سابقة في ذاكرة التخزين المؤقت
      return queryClient.getQueryData(['restaurants']) as any[] || [];
    },
    // تحسين استراتيجية الإعادة
    retry: (failureCount, error) => {
      // إعادة المحاولة فقط للأخطاء المؤقتة
      if (error instanceof Error && error.message.includes('network')) {
        return failureCount < 3;
      }
      return false;
    }
  });
}

export function useRestaurantById(id: string | undefined) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantDetails(id!),
    // منع الاستدعاء إذا كان المعرف غير متوفر
    enabled: !!id,
    // تحسين أداء الذاكرة المؤقتة
    staleTime: 1000 * 60 * 5,
    // استخدام البيانات المخزنة مؤقتًا إذا كانت موجودة
    placeholderData: () => {
      // البحث عن بيانات المطعم في نتائج قائمة المطاعم
      const restaurants = queryClient.getQueryData<any[]>(['restaurants']);
      if (restaurants) {
        return restaurants.find(r => r.id === id);
      }
      return undefined;
    }
  });
}

export function useRestaurantMenu(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['restaurantMenu', restaurantId],
    queryFn: () => fetchRestaurantMenu(restaurantId!),
    enabled: !!restaurantId,
    // تحسين أداء الذاكرة المؤقتة
    staleTime: 1000 * 60 * 5
  });
}

export function useMenuCategories(restaurantId: string | undefined) {
  const { data: menuItems } = useRestaurantMenu(restaurantId);
  
  // استخدام useMemo لمنع إعادة الحساب غير الضرورية
  const categories = useMemo(() => {
    if (!menuItems) return [];
    
    // استخراج الفئات الفريدة
    const uniqueCategories = [...new Set(menuItems.map(item => item.category))];
    return uniqueCategories;
  }, [menuItems]);

  return categories;
}

export function useMenuItemsByCategory(restaurantId: string | undefined, category: string) {
  const { data: menuItems } = useRestaurantMenu(restaurantId);
  
  // استخدام useMemo لتصفية العناصر حسب الفئة
  const filteredItems = useMemo(() => {
    if (!menuItems) return [];
    return menuItems.filter(item => item.category === category);
  }, [menuItems, category]);
  
  return {
    data: filteredItems,
    isLoading: !menuItems
  };
}
