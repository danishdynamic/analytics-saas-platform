// Simple runtime type shapes for documentation and validation

export const User = {
  id: 0,
  email: '',
  created_at: '',
}

export const Token = {
  access_token: '',
  refresh_token: '',
  token_type: 'bearer',
}

export const Product = {
  id: 0,
  name: '',
  price: 0,
  emoji: '',
}

export const CartItem = {
  ...Product,
  qty: 1,
}

export const Order = {
  id: 0,
  user_id: 0,
  total_amount: 0,
  status: 'pending',
  items: [],
  created_at: '',
}

export const OrderItem = {
  product_id: 0,
  name: '',
  price: 0,
  quantity: 1,
}

export const Notification = {
  id: 0,
  user_id: 0,
  title: '',
  message: '',
  channel: 'in_app',
  status: 'pending',
  created_at: '',
  sent_at: null,
}

export const Event = {
  id: 0,
  user_id: null,
  event_type: '',
  properties: {},
  created_at: '',
}

export const DashboardStats = {
  total_events: 0,
  today_events: 0,
  weekly_events: 0,
  events_by_type: {},
}