import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('admin@bayoumuscle.com');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(true);

	const onSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<section className="admin-login-page">
			<div className="admin-login-ambient admin-login-ambient--left" />
			<div className="admin-login-ambient admin-login-ambient--right" />

			<div className="admin-login-shell">
				<aside className="admin-login-info">
					<div className="admin-login-brand">
						<div className="admin-login-brand-mark" ></div>

					</div>

					<div className="admin-login-headline" style={{color:"white"}}>Secure access for admin operations</div>
					<div className="admin-login-copy">
						This page is UI-only for now. Once auth is integrated, the same layout can support real sign-in flow,
						validation, and role-based access.
					</div>

					<div className="admin-login-badges">
						<span className="admin-login-badge">Gold Theme</span>
						<span className="admin-login-badge">Responsive</span>
						<span className="admin-login-badge">UI Only</span>
					</div>
				</aside>

				<article className="admin-login-card">
					<div className="admin-login-kicker">Admin Login</div>
					<h1 className="admin-login-title">Welcome back</h1>
					<p className="admin-login-subtitle">Sign in to manage products, discounts, categories, and users.</p>

					<form className="admin-login-form" onSubmit={onSubmit}>
						<div className="admin-field-group">
							<label className="admin-field-label" htmlFor="adminEmail">Email</label>
							<input
								className="admin-field"
								id="adminEmail"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="admin@bayoumuscle.com"
							/>
						</div>

						<div className="admin-field-group">
							<label className="admin-field-label" htmlFor="adminPassword">Password</label>
							<div className="admin-inline-field admin-inline-field--password">
								<input
									className="admin-field"
									id="adminPassword"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
								/>
								<button
									className="admin-action-btn admin-action-btn--ghost"
									onClick={() => setShowPassword((prev) => !prev)}
									type="button"
								>
									{showPassword ? 'Hide' : 'Show'}
								</button>
							</div>
						</div>

						<div className="admin-login-row">
							<label className="admin-login-check">
								<input
									checked={rememberMe}
									onChange={(event) => setRememberMe(event.target.checked)}
									type="checkbox"
								/>
								<span>Remember me</span>
							</label>
							<button className="admin-login-link" type="button">Forgot password?</button>
						</div>

						<div className="admin-actions-row">
							<button className="admin-action-btn" type="submit">Sign In</button>
							<button className="admin-action-btn admin-action-btn--ghost" type="button" onClick={() => navigate('/home')}>
								Back to Site
							</button>
						</div>
					</form>

					<div className="admin-login-footer-note">
						Demo credentials are pre-filled for UI testing. No backend auth is connected yet.
					</div>
				</article>
			</div>
		</section>
	);
}
