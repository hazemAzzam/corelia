import { FormProvider } from "react-hook-form"
import coreliaLogo from "@/assets/corelia.png"
import { ControlledCheckbox } from "@/components/ControlledCheckbox"
import { Link } from "react-router-dom"

export const AuthForm = {
    Form: ({ children, form, onSubmit }: { children: React.ReactNode, form: any, onSubmit: (data: any) => void }) => {
        return <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {children}
            </form>
        </FormProvider>
    },
    Logo: () => {
        return <div className="h-16 w-full">
            <img
                src={coreliaLogo}
                alt="Corelia Logo"
                className="h-full w-full object-contain"
            />
        </div>
    },
    Body: ({ children }: { children: React.ReactNode }) => {
        return <div className="space-y-5">
            {children}
        </div>
    },
    LoginControls: () => {
        return <div className="flex flex-col">
            <div className="flex justify-between">
                <ControlledCheckbox name="rememberMe" label="Remember me" />
                <Link to="#">Forgot Password?</Link>
            </div>
        </div>
    },
    SubmitArea: ({ children }: { children: React.ReactNode }) => {
        return <div className="flex items-center justify-center w-full space-y-5">
            {children}
        </div>
    },
    Footer: ({ children }: { children: React.ReactNode }) => {
        return <div className="flex items-center justify-center w-full">
            <div className="text-center">{children}</div>
        </div>
    }
}