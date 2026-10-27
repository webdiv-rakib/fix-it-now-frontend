import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-lg">
                {/* FORM GENERIC TEXTS */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;