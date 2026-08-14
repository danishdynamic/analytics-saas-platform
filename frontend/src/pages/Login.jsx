import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLogin, useSignup } from '../hooks/useAuth.js'
import { LogIn, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loginMutation = useLogin()
  const signupMutation = useSignup()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const mutation = isSignup ? signupMutation : loginMutation

    mutation.mutate(
      { email, password },
      {
        onSuccess: () => navigate('/shop'),
        onError: (err) => setError(err.response?.data?.detail || 'Something went wrong'),
      }
    )
  }

  const loading = loginMutation.isPending || signupMutation.isPending

  return (
    <div className="max-w-sm mx-auto mt-12">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <LogIn className="w-10 h-10 text-primary mx-auto mb-2" />
            <h2 className="card-title justify-center">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          </div>

          {error && (
            <div className="alert alert-error alert-sm mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? <Loader2 className="animate-spin" size={16} /> : isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60 mt-4">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignup(!isSignup)} className="link link-primary">
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}