import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AuthForm } from "../components/AuthForm"
import { useForm } from "react-hook-form"
import { ControlledInput } from "@/components/ControlledInput";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/state/auth/authSlice";
import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import type { RootState } from "@/state/store";




export default function LoginPage() {
  const { user, isError, error } = useSelector((state: RootState) => state.auth);

  const form = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const onSubmit = (data: any) => {
    dispatch(login(data));
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
            <ControlledInput name="email" placeholder="Email Address" />
            <ControlledInput name="password" placeholder="Password" type="password" />
          </AuthForm.Body>
          <AuthForm.LoginControls />
          <AuthForm.SubmitArea>
            <Button type="submit" className="w-3/4 p-7 text-xl">Log in</Button>
          </AuthForm.SubmitArea>
          <AuthForm.Footer>
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors">
              Register
            </Link>
          </AuthForm.Footer>
        </AuthForm.Form>
      </CardContent>
    </Card>
  </div>

}
