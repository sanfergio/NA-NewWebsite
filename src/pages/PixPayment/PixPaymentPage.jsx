import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pixpayment.module.css';

const API_BASE = 'https://images.newandrews.com.br/pix-payment';
const TOKEN = '2156c0741f3e1a2'; // Your VINDI token

export default function PixPaymentPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCodePath, setQrCodePath] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [tokenTransaction, setTokenTransaction] = useState('');
  const [email, setEmail] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Read query params and initiate payment on mount
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // Build products array from params
    const products = [];
    let index = 1;
    while (true) {
      const nameKey = index === 1 ? 'productsName' : `productsName${index}`;
      const priceKey = index === 1 ? 'productsPrice' : `productsPrice${index}`;
      const qtyKey = index === 1 ? 'productsQuantity' : `productsQuantity${index}`;

      const name = params[nameKey];
      const price = params[priceKey];
      const quantity = params[qtyKey];

      if (!name && !price && !quantity) break;

      products.push({
        description: decodeURIComponent(name || ''),
        quantity: parseInt(quantity || '0', 10),
        price_unit: parseFloat(price || '0')
      });
      index++;
    }

    // Fallback for single product without index
    if (products.length === 0 && params.productsName) {
      products.push({
        description: decodeURIComponent(params.productsName),
        quantity: parseInt(params.productsQuantity || '0', 10),
        price_unit: parseFloat(params.productsPrice || '0')
      });
    }

    const payload = {
      email: params.email,
      name: decodeURIComponent(params.name || ''),
      cpf: params.cpf,
      phone: params.phone,
      postal_code: params.postal_code,
      street: decodeURIComponent(params.street || ''),
      number: params.number,
      neighborhood: decodeURIComponent(params.neighborhood || ''),
      city: decodeURIComponent(params.city || ''),
      state: params.state,
      cupom: params.cupom || 'NONE',
      products
    };

    initiatePayment(payload);
  }, [searchParams]);

  const initiatePayment = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/index.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Payment initiation failed');
      }
      setQrCodePath(result.qrcode_path);
      setPixKey(result.qrcode_original);
      setTokenTransaction(result.token_transaction);
      setEmail(result.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Poll payment status
  useEffect(() => {
    if (!tokenTransaction) return;

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/check_status.php?tokenTransaction=${tokenTransaction}&token=${TOKEN}`);
        const data = await res.json();
        if (data.status_id === 6) {
          clearInterval(intervalId);
          // Redirect to success page
          window.location.href = `https://newandrews.com.br/compraconfirmada/?email=${encodeURIComponent(email)}`;
        }
      } catch (err) {
        console.error('Status check error:', err);
      }
    }, 2000); // check every 2 seconds

    return () => clearInterval(intervalId);
  }, [tokenTransaction, email]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Gerando código PIX...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Erro ao processar pagamento</h3>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.paymentBox}>
        <h3 className={styles.title}>Escaneie o QR Code para pagar</h3>

        {qrCodePath && (
          <div className={styles.qrcodeWrapper}>
            <iframe
              src={qrCodePath}
              title="QR Code PIX"
              className={styles.qrcodeIframe}
            />
          </div>
        )}

        <div className={styles.pixKeySection}>
          <input
            type="text"
            value={pixKey}
            readOnly
            className={styles.pixKeyInput}
          />
          <button onClick={handleCopyPix} className={styles.copyButton}>
            Copiar
          </button>
        </div>

        {copySuccess && (
          <p className={styles.copySuccess}>Chave copiada!</p>
        )}

        <p className={styles.timer}>
          Código expira em: <span>{formatTime(timeLeft)}</span>
        </p>

        <p className={styles.instruction}>
          Após o pagamento, a página será redirecionada automaticamente.
        </p>
      </div>
    </div>
  );
}