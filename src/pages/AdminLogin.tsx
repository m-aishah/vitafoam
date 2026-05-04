import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.jpg";
import { adminLogin, isAdminAuthed } from "@/lib/admin";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setAuthed(isAdminAuthed()); }, []);
  if (authed) return <Navigate to="/admin/dashboard" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      toast({ title: "Welcome back", description: "Admin session started." });
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Invalid credentials", description: "Please check your username and password.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex bg-primary text-primary-foreground items-center justify-center p-12">
        <div className="max-w-md text-center">
          <img src={logo} alt="Multibiz.global Venture" className="mx-auto h-24 w-24 rounded-xl bg-white p-2" />
          <h1 className="mt-8 font-display text-4xl font-bold">Admin Console</h1>
          <p className="mt-3 text-primary-foreground/70">Manage your Multibiz.global catalog and pricing.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Sign In</h2>
            <p className="mt-1 text-sm text-muted-foreground">Authorized personnel only.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="u">Username</Label>
            <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)} className="h-11" autoComplete="username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p">Password</Label>
            <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" autoComplete="current-password" />
          </div>
          <Button type="submit" variant="navy" size="lg" className="w-full h-12">Sign In</Button>
          <p className="text-xs text-muted-foreground text-center">Default: admin / multibiz2026</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
