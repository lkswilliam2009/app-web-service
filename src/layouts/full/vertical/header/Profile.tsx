'use client';

import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import { useNavigate, Link } from 'react-router';
import profileimg from 'src/assets/images/profile/user-1.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Button } from 'src/components/ui/button';
import { useAuth } from 'src/context/AuthContext/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // clear token + state
    navigate('/auth/auth2/login', { replace: true });
  };

  return (
    <div className="relative group/menu ps-1 sm:ps-15 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <img
              src={profileimg}
              alt="profile"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-screen sm:w-[220px] pb-4 pt-4 rounded-sm border border-ld"
        >
          {/* USER INFO */}
          <div className="px-4 pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-500 capitalize">
              Role: {user?.role}
            </p>
          </div>

          {/* MENU */}
          <SimpleBar className="max-h-[200px] mt-2">
            <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
              <Link to="/user-profile" className="flex gap-3 items-center">
                <Icon icon="solar:user-outline" className="text-lg" />
                <span className="text-sm">My Profile</span>
              </Link>
            </DropdownMenuItem>
          </SimpleBar>

          {/* LOGOUT */}
          <div className="pt-3 px-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full rounded-md py-0 border-primary text-primary hover:bg-lightprimary hover:text-primary"
            >
              Logout
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
