import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/ui/TextInput';
import Button from '../components/ui/Button';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="flex items-start p-8 justify-center w-full">
            <div className="flex flex-col w-96 rounded-box bg-base-200 p-6 gap-4">
                <h1 className="text-3xl font-bold self-center">Log in</h1>
                {/* <span className="self-center flex gap-2">
                    Don't have an account?
                    <a className="link link-secondary" onClick={() => navigate('/register')}>Register</a>
                </span>
                <a className="btn btn-neutral">
                    <i className="fa-brands fa-google text-primary"></i>
                    Log in with Google
                </a>
                <div className="divider">OR</div> */}
                <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
                    <TextInput
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                            <a className="label-text link link-accent">Forgot password?</a>
                        </div>
                        <TextInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="form-control">
                        <label className="cursor-pointer label self-start gap-2">
                            <input type="checkbox" className="checkbox" />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                    <Button type="submit">Log in</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
