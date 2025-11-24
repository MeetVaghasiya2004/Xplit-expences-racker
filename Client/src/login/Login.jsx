import Form from "./Form.jsx";

export default function Login() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="max-w-md w-full space-y-8">
                <Form />
            </div>
        </div>
    );
}
