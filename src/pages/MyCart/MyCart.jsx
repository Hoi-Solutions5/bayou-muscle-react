import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useCart from '../../hooks/useCart';

const promoOptions = ['FIRST10', 'SAVE15', 'BAYOU20'];

function formatMoney(value) {
	return `$${value.toFixed(2)}`;
}

export default function MyCart() {
	const { cartItems, isLoading, error, loadCartItems } = useCart({ autoLoad: false });
	const [items, setItems] = useState([]);
	const [promo, setPromo] = useState('');
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoError, setPromoError] = useState('');

	useEffect(() => {
		loadCartItems().catch(() => {});
	}, [loadCartItems]);

	useEffect(() => {
		setItems(
			cartItems.map((item) => ({
				id: item.id,
				name: item.productName,
				variant: item.productSlug ? `Product · ${item.productSlug}` : 'Product',
				price: Number(item.unitPrice || 0),
				qty: Number(item.quantity || 0),
				img: item.image || '/supplements/p1.png',
				total: Number(item.total || 0),
			})),
		);
	}, [cartItems]);

	const updateQty = (id, delta) => {
		setItems((previous) =>
			previous.map((item) =>
				item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
			),
		);
	};

	const removeItem = (id) => {
		setItems((previous) => previous.filter((item) => item.id !== id));
	};

	const subtotal = useMemo(
		() => items.reduce((sum, item) => sum + (Number(item.total) || item.price * item.qty), 0),
		[items],
	);
	const discount = promoApplied ? subtotal * 0.1 : 0;
	const shipping = subtotal > 100 ? 0 : 5.99;
	const total = subtotal - discount + shipping;

	const applyPromo = () => {
		if (promoOptions.includes(promo.trim().toUpperCase())) {
			setPromoApplied(true);
			setPromoError('');
			return;
		}

		setPromoApplied(false);
		setPromoError('Invalid promo code. Try FIRST10');
	};

	return (
		<>
			<Header />

			<div className="pd-breadcrumb">
				<a href="/home" onClick={(event) => { event.preventDefault(); window.__navigate && window.__navigate('home'); }}>Home</a>
				<span className="pd-bc-sep">›</span>
				<span>Cart</span>
			</div>

			<section className="cart-section">
				<div className="cart-inner">
					<div className="cart-left">
						<div className="cart-header-row">
							<h1 className="cart-title">Shopping Cart</h1>
							<span className="cart-count">{items.length} items</span>
						</div>

						{isLoading && items.length === 0 ? (
							<div className="cart-empty">
								<h3>Loading cart...</h3>
							</div>
						) : items.length === 0 ? (
							<div className="cart-empty">
								<div className="cart-empty-icon">🛒</div>
								<h3>Your cart is empty</h3>
								<p>Looks like you haven&apos;t added anything yet.</p>
								<button className="cart-shop-btn" onClick={() => window.__navigate && window.__navigate('shop')}>
									Browse Products
								</button>
							</div>
						) : (
							<div className="cart-items-list">
								<div className="cart-col-header">
									<span style={{ flex: 3 }}>Product</span>
									<span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
									<span style={{ flex: 1, textAlign: 'right' }}>Total</span>
									<span style={{ width: 32 }} />
								</div>

								{items.map((item) => (
									<div key={item.id} className="cart-item">
										<div className="cart-item-img">
											<img src={item.img} alt={item.name} />
										</div>
										<div className="cart-item-info">
											<p className="cart-item-name">{item.name}</p>
											<p className="cart-item-variant">{item.variant}</p>
											  <p className="cart-item-unit-price">{formatMoney(item.price)} each</p>
										</div>
										<div className="cart-qty-ctrl">
											<button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
											<span className="cart-qty-val">{item.qty}</span>
											<button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
										</div>
										<div className="cart-item-total">{formatMoney(item.price * item.qty)}</div>
										<button className="cart-remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
												<line x1="18" y1="6" x2="6" y2="18" />
												<line x1="6" y1="6" x2="18" y2="18" />
											</svg>
										</button>
									</div>
								))}
							</div>
						)}

						<div className="cart-promo">
							<p className="cart-promo-label">Have a promo code?</p>
							<div className="cart-promo-row">
								<input
									type="text"
									placeholder="Enter code (e.g. FIRST10)"
									value={promo}
									onChange={(event) => setPromo(event.target.value)}
									className={`cart-promo-input${promoApplied ? ' success' : promoError ? ' error' : ''}`}
								/>
								<button className="cart-promo-btn" onClick={applyPromo}>Apply</button>
							</div>
							{promoApplied ? <p className="cart-promo-success">✓ 10% discount applied!</p> : null}
							{promoError ? <p className="cart-promo-error">{promoError}</p> : null}
						</div>

						<div className="cart-continue">
							<button className="cart-back-btn" onClick={() => window.__navigate && window.__navigate('shop')}>
								← Continue Shopping
							</button>
						</div>
					</div>

					<div className="cart-right">
						<div className="cart-summary">
							<h2 className="cart-summary-title">Order Summary</h2>

							<div className="cart-summary-lines">
								<div className="summary-line">
									<span>Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} items)</span>
									<span>{formatMoney(subtotal)}</span>
								</div>
								{promoApplied ? (
									<div className="summary-line discount">
										<span>Promo discount (10%)</span>
										<span>−{formatMoney(discount)}</span>
									</div>
								) : null}
								<div className="summary-line">
									<span>Shipping</span>
									<span>{shipping === 0 ? <span className="free-ship">FREE</span> : formatMoney(shipping)}</span>
								</div>
								{shipping > 0 ? (
									<p className="free-ship-nudge">Add {formatMoney(100 - subtotal)} more for free shipping!</p>
								) : null}
							</div>

							<div className="cart-summary-total">
								<span>Total</span>
								<span>{formatMoney(total)}</span>
							</div>

							<button className="cart-checkout-btn" onClick={() => window.__navigate && window.__navigate('checkout')}>
								Proceed to Checkout
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
									<line x1="5" y1="12" x2="19" y2="12" />
									<polyline points="12 5 19 12 12 19" />
								</svg>
							</button>

							<div className="cart-secure">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0 1 10 0v4" />
								</svg>
								Secure checkout — SSL encrypted
							</div>

							<div className="cart-payment-icons">
								{['VISA', 'MC', 'AMEX', 'PayPal'].map((payment) => (
									<span key={payment} className="payment-badge">{payment}</span>
								))}
							</div>

							<div className="cart-upsell">
								<p className="cart-upsell-label">You might also like</p>
								<div className="cart-upsell-item" onClick={() => window.__navigate && window.__navigate('product')}>
									<img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=80&q=80" alt="Creatine" />
									<div>
										<p className="upsell-name">Creatine Monohydrate Pure 500g</p>
										<p className="upsell-price">$16.95</p>
									</div>
									<button className="upsell-add">+ Add</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			  {error ? <div className="cart-empty" style={{ marginTop: '20px' }}><h3>{error}</h3></div> : null}

			  <Footer />
		</>
	);
}
