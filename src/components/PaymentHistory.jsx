const PaymentHistory = () => {
  const payments = [
    { date: "September 1, 2024", amount: "$50.00", status: "Paid" },
    { date: "August 1, 2024", amount: "$50.00", status: "Paid" },
    { date: "July 1, 2024", amount: "$50.00", status: "Paid" },
    { date: "June 1, 2024", amount: "$50.00", status: "Pending" },
    { date: "May 1, 2024", amount: "$50.00", status: "Paid" }
  ];

  return (
    <div className="bg-card rounded-lg shadow-sm p-4">
      <h3 className="font-heading font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{payment.date}</td>
                <td className="py-2">{payment.amount}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    payment.status === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;