import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
interface TopBarProps {
  userName?: string;
  address?: string;
}
const TopBar: React.FC<TopBarProps> = ({
  userName = "محمد",
  address = "شارع مصطفى النحاس، مدينة نصر"
}) => {
  return;
};
export default TopBar;