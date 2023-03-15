import React, { useState } from 'react';
import SpinnerLoader from '../../components/loaders/spinner';

export type AddUserFormProps = {
    onSubmit: (values: { username: string, email: string, password: string }) => void | Promise<void>
}

const AddUserForm = ({
    onSubmit
}: AddUserFormProps) => {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!email || !username || !password) {
            return;
        }
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({ email, password, username });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<SpinnerLoader loading={isSubmitting}>
        <form onSubmit={handleSubmit}>
            <div>
                <label id="username-label">Username*</label>
                <div>
                    <input
                        required
                        aria-labelledby="username-label"
                        type="text" value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)} />
                    <span id="username-required-label">Username is requried</span>
                </div>
            </div>
            <div>
                <label id="email-label">E-Mail*</label>
                <div>
                    <input
                        required
                        aria-labelledby="email-label"
                        type="email" value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)} />
                    <span id="email-required-label">Email is requried</span>
                    <span id="email-duplicate-label">Email already exists</span>
                </div>
            </div>
            <div>
                <label id="password-label">Password*</label>
                <div>
                    <input
                        required
                        aria-labelledby="password-label"
                        type="password" value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)} />
                    <span id="password-required-label">Email is requried</span>
                </div>
            </div>
            <div>
                {isSubmitting ? (<p>Saving...</p>) : (<>
                    <button type="button" disabled={isSubmitting}>Cancel</button>
                    <button type="submit" disabled={isSubmitting}>Save</button>
                </>)}
            </div>
        </form>
    </SpinnerLoader>);
};

export default AddUserForm;