import { Github } from 'lucide-react';
import { SocialButton } from './SocialButton';

interface GithubLoginButtonProps {
    onLogin: () => void;
}

export function GithubLoginButton({ onLogin }: GithubLoginButtonProps) {
    return (
        <SocialButton
            icon={Github}
            provider="GitHub"
            onClick={() => {
                console.log('GitHub login clicked');
                onLogin();
            }}
        />
    );
}