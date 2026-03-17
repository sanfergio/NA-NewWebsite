export interface Product {
  description: string;
  quantity: number;
  price_unit: number;
}

export interface PaymentRequest {
  finger_print?: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  postal_code: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cupom: string;
  products: Product[];
}

export interface PaymentResponse {
  success: boolean;
  qrcode_path?: string;
  qrcode_original?: string;
  token_transaction?: string;
  email?: string;
  error?: string;
  details?: any;
}

export interface StatusResponse {
  status_id?: number;
  error?: string;
}