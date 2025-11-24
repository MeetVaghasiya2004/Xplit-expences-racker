import Form from "./Form.jsx";

export default function SignUp() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl overflow-hidden">
                    <Form />
                </div>
            </div>
        </div>
    );
}
