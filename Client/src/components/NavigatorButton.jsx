export default function NavigatorButton({ src, alt, className = '' }){
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img 
                className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300" 
                src={src} 
                alt={alt}
            />
        </div>
    )
}