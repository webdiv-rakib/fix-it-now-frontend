import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Header Texts */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join FixItNow to hire trusted pros or offer your services
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;