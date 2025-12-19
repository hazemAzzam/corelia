import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { AuthForm } from "../../components/AuthForm";
import { ControlledInput } from "@/components/ControlledInput";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "@/state/store";
import type { User } from "@/types/User";
import { signup } from "../../state/authSlice";
import { useAuth } from "@/components/AuthProvider";



export default function SignUpPage() {
  const user = useAuth();
  const { isError, error } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    defaultValues: {
      id: Date.now().toString(),
      name: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const onSubmit = (data: User) => {
    dispatch(signup(data));
  }

  return <div className="w-full min-h-screen flex items-center justify-center bg-muted">
    <Card className="w-full max-w-lg p-5">
      <CardHeader>
        <AuthForm.Logo />
      </CardHeader>
      <CardContent>
        <AuthForm.Form form={form} onSubmit={onSubmit}>
          {isError && <p className="text-red-500">{error}</p>}
          <AuthForm.Body>
            <ControlledInput name="name" placeholder="Full Name" />
            <ControlledInput name="email" placeholder="Email Address" />
            <ControlledInput name="password" placeholder="Password" type="password" />
          </AuthForm.Body>
          <AuthForm.SubmitArea>
            <Button type="submit" className="w-3/4 p-7 text-xl">Register</Button>
          </AuthForm.SubmitArea>
          <AuthForm.Footer>
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors">
              I have an Account Login
            </Link>
          </AuthForm.Footer>
        </AuthForm.Form>
      </CardContent>
    </Card>
  </div>

}
