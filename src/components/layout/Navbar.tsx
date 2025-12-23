export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <span className="text-xl font-bold text-brand-dark">VISITEC</span>
        <div className="flex gap-6 text-sm font-medium">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
        </div>
      </div>
    </nav>
  );
}