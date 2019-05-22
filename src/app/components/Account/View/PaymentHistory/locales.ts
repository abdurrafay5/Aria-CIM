import LocalizedStrings from 'react-localization';

export default new LocalizedStrings({
  en: {
    header: "Payments",
    transactionID: "Transaction ID",
    date: "Date",
    source: "Source",
    status: "Status",
    amount: "Amount",
    applied: "Applied",
    unapplied: "Unapplied",
    voidPayment: "Void Payment"
  },
  nb: {
    header: "Betalinger",
    transactionID: "Transaksjons-ID",
    date: "Dato",
    source: "Kilde",
    status: "Status",
    amount: "Beløp",
    applied: "Aktivert or Anvendt",
    unapplied: "Ikke aktivert or Ikke anvendt",
    voidPayment: "Annullere betaling"
  }
});