import { Chrome } from 'lucide-react';
import { SocialButton } from './SocialButton';

interface GoogleLoginButtonProps {
    onLogin: () => void;
}

export function GoogleLoginButton({ onLogin }: GoogleLoginButtonProps) {
    return (
        <SocialButton
            icon={Chrome}
            provider="Google"
            onClick={() => {
                console.log('Google login clicked');
                onLogin();
            }}
        />
    );
}