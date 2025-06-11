import { Logo } from "./_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  justify-center items-center h-screen space-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
