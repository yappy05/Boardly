export const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 h-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-600">
            © {new Date().getFullYear()} Boardly. Все права защищены.
          </span>
        </div>
      </div>
    </footer>
  );
};
