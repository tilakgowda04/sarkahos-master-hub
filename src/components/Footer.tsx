const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Sarka Hospital. All rights reserved.
        </p>
        <p className="text-xs opacity-60 mt-2">
          Excellence in Healthcare | Committed to Your Wellbeing
        </p>
      </div>
    </footer>
  );
};

export default Footer;
