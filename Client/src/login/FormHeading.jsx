export default function FormHeading({ text }) {
    return (
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[color:var(--text-color)]">
                {text}
            </h1>
            <p className="mt-2 text-sm text-[color:var(--nav-text)]">
                Please enter your details to continue
            </p>
        </div>
    );
}
