import { useState, useRef, useEffect } from "react";
import { SiTrello } from "react-icons/si";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {useAuth} from "../../../features/auth/model/useAuth.ts";

export const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const {logout} = useAuth()
  const {user} = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    console.log("User logged out");
    await logout()
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="w-full min-w-screen bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Пустой блок для балансировки */}
          <div className="w-16"></div>

          {/* Центрированный логотип Trello и название */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            <SiTrello className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Boardly</h1>
          </div>

          {/* Профиль пользователя */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Открыть меню профиля"
            >
              <IoPersonCircleOutline className="w-8 h-8 text-gray-700" />
            </button>

            {/* Выпадающее меню профиля */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {/* Информация о пользователе */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user? user.name: 'null'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user? user.email: 'null'}
                    </p>
                  </div>

                  {/* Кнопка выхода */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <FiLogOut className="w-4 h-4 mr-3" />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
