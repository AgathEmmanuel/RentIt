export enum RentitStatus {
    // Rentit process started
    // but the initial payment is not done
    RentitCreated = 'created',
    RentitCancelled = 'cancelled',
    RentitAwaitingPayment = 'awaitingpayment',
    RentitComplete = 'complete'
}