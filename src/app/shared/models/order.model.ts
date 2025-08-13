import { User } from './user.model';

export interface Order {
  id: number;
  orderNumber: string;
  status:
    | 'CREATED'
    | 'CANCELLED'
    | 'PAID'
    | 'PENDING_PAYMENT'
    | 'TICKETED'
    | 'TICKETING_FAILED'
    | 'TICKETING_IN_PROGRESS';
  amount: number;
  creationDate: string;
  userId: number | null;
}
