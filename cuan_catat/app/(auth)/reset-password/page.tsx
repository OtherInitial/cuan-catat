import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ResetPasswordForm from './reset-password-form'; 

function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordForm /> 
        </Suspense>
    );
}