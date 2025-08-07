export default function AdBanner({ position = 'top', className = '' }) {
  const adStyles = {
    top: 'h-24 bg-muted border border-border',
    middle: 'h-32 bg-muted border border-border',
    bottom: 'h-20 bg-background/80 backdrop-blur-sm border-t border-border fixed bottom-0 left-0 right-0 z-40'
  };

  return (
    <div className={`${adStyles[position]} ${className} flex items-center justify-center rounded-lg`}>
      <div className="text-muted-foreground/60 text-sm font-medium">
        Advertisement Space - {position === 'top' ? '728x90' : position === 'middle' ? '728x90' : '728x90'}
      </div>
    </div>
  );
}