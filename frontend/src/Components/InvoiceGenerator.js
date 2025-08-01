import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoiceGenerator = () => {
  const mockClient = {
    name: "Acme Corp",
    address: "123 Business Rd, Joburg",
    email: "contact@acme.co.za",
    hourlyRate: 500,
  };

  const mockTimesheets = [
    { date: "2025-07-01", hours: 4 },
    { date: "2025-07-03", hours: 5 },
    { date: "2025-07-07", hours: 3.5 },
    { date: "2025-07-15", hours: 6 },
  ];

  const totalHours = mockTimesheets.reduce((sum, entry) => sum + entry.hours, 0);
  const totalAmount = totalHours * mockClient.hourlyRate;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Client: ${mockClient.name}`, 14, 30);
    doc.text(`Email: ${mockClient.email}`, 14, 36);
    doc.text(`Address: ${mockClient.address}`, 14, 42);
    doc.text(`Hourly Rate: R${mockClient.hourlyRate}`, 14, 48);
    doc.text(`Month: July 2025`, 14, 54);

    doc.autoTable({
      startY: 60,
      head: [["Date", "Hours Worked"]],
      body: mockTimesheets.map(t => [t.date, t.hours]),
    });

    doc.text(`Total Hours: ${totalHours}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Amount: R${totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 18);

    doc.save(`Invoice_${mockClient.name}_July2025.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Generate Invoice</h2>
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Invoice PDF
      </button>
    </div>
  );
};

export default InvoiceGenerator;
