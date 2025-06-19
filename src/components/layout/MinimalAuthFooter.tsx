import React from 'react';
import { Link } from 'react-router-dom';

const MinimalAuthFooter: React.FC = () => {
  console.log('MinimalAuthFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-background border-t mt-auto">
      <div className="container mx-auto text-center sm:flex sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
          &copy; {currentYear} AuthSystem Inc. All rights reserved.
        </p>
        <nav className="flex justify-center sm:justify-end gap-4 text-sm">
          {/* These links might lead to static pages or routes not defined in the core App.tsx */}
          <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default MinimalAuthFooter;