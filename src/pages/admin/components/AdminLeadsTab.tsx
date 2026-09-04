import React, { useState, useMemo } from 'react';
import { useData } from '../../../context/DataContext';
import { InquiryItem, InquiryStatus } from '../../../types';
import {
  Users,
  Search,
  Download,
  Trash2,
  PhoneCall,
  Mail,
  Calendar,
  Building2,
  CheckCircle2,
  ExternalLink,
  Plus,
  Landmark,
  Shield,
  X,
  FileText,
  Clock,
  MapPin,
  Sparkles,
  Phone
} from 'lucide-react';

interface AdminLeadsTabProps {
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

const STATUS_OPTIONS: InquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({ onShowToast }) => {
  const { inquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry, addInquiry } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'redirect'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [notesInput, setNotesInput] = useState('');

  // Manual Add Lead Modal state
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Home Loan',
    itemTitle: 'Home Loan (Villas & Apartments)',
    itemCategory: 'Loan Product',
    paymentStatus: 'Paid (₹199)' as 'Paid (₹199)' | 'No Payment (Redirected)',
    loanAmount: '₹30,00,000',
    employmentType: 'Salaried Professional',
    city: 'Karimnagar',
    message: '',
    adminNotes: ''
  });

  const paidCount = inquiries.filter(i => i.paymentStatus === 'Paid (₹199)').length;
  const redirectCount = inquiries.filter(i => i.paymentStatus === 'No Payment (Redirected)').length;

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchSearch =
        inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.phone.includes(searchQuery) ||
        (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        inq.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inq.itemTitle && inq.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (inq.city && inq.city.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || inq.status === statusFilter;

      const matchPayment =
        paymentFilter === 'all' ||
        (paymentFilter === 'paid' && inq.paymentStatus === 'Paid (₹199)') ||
        (paymentFilter === 'redirect' && inq.paymentStatus === 'No Payment (Redirected)');

      return matchSearch && matchStatus && matchPayment;
    });
  }, [inquiries, searchQuery, statusFilter, paymentFilter]);

  const handleSelectInquiry = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setNotesInput(inq.adminNotes || '');
  };

  const handleSaveNotes = (id: string) => {
    updateInquiryNotes(id, notesInput);
    if (selectedInquiry) {
      setSelectedInquiry({ ...selectedInquiry, adminNotes: notesInput });
    }
    onShowToast('success', 'Admin internal notes updated.');
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    onShowToast('success', `Lead status updated to "${newStatus}".`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete lead entry for "${name}"?`)) {
      deleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      onShowToast('info', `Inquiry for "${name}" deleted.`);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }

    const headers = [
      'ID',
      'Date',
      'Full Name',
      'Phone',
      'Email',
      'Payment Status',
      'Lead Channel',
      'Category',
      'Enquired Item',
      'Service Type',
      'Amount',
      'Employment',
      'City',
      'Source',
      'Status',
      'Message',
      'Admin Notes'
    ];

    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.email || ''}"`,
      `"${i.paymentStatus || (i.source === 'Apply Modal' ? 'Paid (₹199)' : 'No Payment (Redirected)')}"`,
      `"${i.leadChannel || (i.source === 'Apply Modal' ? 'Website Form' : 'WhatsApp')}"`,
      `"${i.itemCategory || 'General'}"`,
      `"${(i.itemTitle || i.serviceType).replace(/"/g, '""')}"`,
      `"${i.serviceType.replace(/"/g, '""')}"`,
      `"${i.loanAmount || ''}"`,
      `"${i.employmentType || ''}"`,
      `"${i.city || ''}"`,
      `"${i.source}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prime_funds_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('success', 'Downloaded leads CSV export.');
  };

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.fullName || !newLeadForm.phone) {
      alert('Please fill in Name and Phone.');
      return;
    }

    addInquiry({
      fullName: newLeadForm.fullName,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      serviceType: newLeadForm.serviceType,
      itemTitle: newLeadForm.itemTitle,
      itemCategory: newLeadForm.itemCategory,
      paymentStatus: newLeadForm.paymentStatus,
      leadChannel: newLeadForm.paymentStatus === 'Paid (₹199)' ? 'Website Form' : 'Admin Entry',
      loanAmount: newLeadForm.loanAmount,
      employmentType: newLeadForm.employmentType,
      city: newLeadForm.city,
      message: newLeadForm.message,
      source: 'Direct Admin Entry',
      adminNotes: newLeadForm.adminNotes
    });

    setAddLeadOpen(false);
    setNewLeadForm({
      fullName: '',
      phone: '',
      email: '',
      serviceType: 'Home Loan',
      itemTitle: 'Home Loan (Villas & Apartments)',
      itemCategory: 'Loan Product',
      paymentStatus: 'Paid (₹199)',
      loanAmount: '₹30,00,000',
      employmentType: 'Salaried Professional',
      city: 'Karimnagar',
      message: '',
      adminNotes: ''
    });

    onShowToast('success', 'New lead registered in CRM.');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#F5822C]" />
            <span>Customer Inquiries & Leads CRM</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5822C]/15 text-[#F5822C] font-semibold">
              {inquiries.length} Total Leads
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time table tracking online paid applications (₹199) and free WhatsApp / Call button inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F5822C]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setAddLeadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-in Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        {/* Payment Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPaymentFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              paymentFilter === 'all'
                ? 'bg-[#12245C] text-white shadow-sm'
                : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:bg-slate-50'
            }`}
          >
            All Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setPaymentFilter('paid')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              paymentFilter === 'paid'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-[#151E32] text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Paid (₹199) Forms ({paidCount})</span>
          </button>
          <button
            onClick={() => setPaymentFilter('redirect')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              paymentFilter === 'redirect'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-[#151E32] text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-50/50'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>WhatsApp / Call Leads ({redirectCount})</span>
          </button>
        </div>

        {/* Search and Status Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by client name, mobile, service, enquired property, or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none cursor-pointer"
            >
              <option value="all">All Pipeline Statuses ({inquiries.length})</option>
              {STATUS_OPTIONS.map(st => (
                <option key={st} value={st}>
                  {st} ({inquiries.filter(i => i.status === st).length})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main CRM Table */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/70 dark:bg-[#0F1626] flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredInquiries.length} Inquiries
          </span>
          <span className="text-[11px] text-slate-400">
            Click any row to open full client notes & discussion dossier
          </span>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-2">
            <Users className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
            <p>No customer leads match the current search or filter combination.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-100/70 dark:bg-[#0B1220]/70 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">What They Selected</th>
                  <th className="py-3.5 px-4">Payment & Lead Type</th>
                  <th className="py-3.5 px-4">City / Profile</th>
                  <th className="py-3.5 px-4">Pipeline Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9F2] dark:divide-[#2A3550]">
                {filteredInquiries.map(inq => {
                  const isPaid = inq.paymentStatus === 'Paid (₹199)';
                  const category = inq.itemCategory || inq.serviceType;
                  const itemName = inq.itemTitle || inq.serviceType;
                  const isSelected = selectedInquiry?.id === inq.id;

                  return (
                    <tr
                      key={inq.id}
                      onClick={() => handleSelectInquiry(inq)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-orange-50/80 dark:bg-[#1E293B] border-l-4 border-l-[#F5822C]'
                          : 'hover:bg-slate-50 dark:hover:bg-[#121B2E]'
                      }`}
                    >
                      {/* Customer Details */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-sm text-[#12245C] dark:text-white">
                          {inq.fullName}
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{inq.phone}</span>
                        </div>
                        {inq.email && (
                          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[170px]">{inq.email}</span>
                          </div>
                        )}
                      </td>

                      {/* What They Selected */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            category.toLowerCase().includes('property') || category.toLowerCase().includes('estate')
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : category.toLowerCase().includes('insurance')
                              ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          }`}>
                            {category.toLowerCase().includes('property') || category.toLowerCase().includes('estate') ? (
                              <Building2 className="w-2.5 h-2.5" />
                            ) : category.toLowerCase().includes('insurance') ? (
                              <Shield className="w-2.5 h-2.5" />
                            ) : (
                              <Landmark className="w-2.5 h-2.5" />
                            )}
                            <span>{inq.itemCategory || 'Loan / Finance'}</span>
                          </span>

                          <div className="font-semibold text-slate-800 dark:text-slate-100 text-xs">
                            {itemName}
                          </div>

                          {inq.loanAmount && (
                            <div className="text-[11px] text-slate-400">
                              Amount: <strong className="text-slate-600 dark:text-slate-300">{inq.loanAmount}</strong>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Payment & Lead Type */}
                      <td className="py-3.5 px-4 align-top">
                        {isPaid ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Paid (₹199)</span>
                            </span>
                            <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 pl-1">
                              Online Form
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-extrabold text-[11px]">
                              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                              <span>No Payment</span>
                            </span>
                            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 pl-1">
                              {inq.leadChannel === 'Call' ? 'Redirected to Call' : 'Redirected to WhatsApp'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* City & Profile */}
                      <td className="py-3.5 px-4 align-top text-[11px] text-slate-600 dark:text-slate-300">
                        <div>{inq.city || 'Telangana'}</div>
                        {inq.employmentType && (
                          <div className="text-slate-400 text-[10px]">{inq.employmentType}</div>
                        )}
                      </td>

                      {/* Pipeline Status */}
                      <td className="py-3.5 px-4 align-top" onClick={e => e.stopPropagation()}>
                        <select
                          value={inq.status}
                          onChange={e => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                            inq.status === 'New'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900'
                              : inq.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900'
                              : inq.status === 'Converted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900'
                              : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {STATUS_OPTIONS.map(st => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 align-top text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSelectInquiry(inq)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Open Lead Notes & Dossier"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#F5822C]" />
                          </button>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(
                              inq.fullName
                            )}, this is Saikiran from Prime Funds Solutions regarding your inquiry about ${encodeURIComponent(
                              itemName
                            )}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-xs"
                            title="Chat on WhatsApp"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(inq.id, inq.fullName)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Lead Details Modal / Slide-over Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                    {selectedInquiry.fullName}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedInquiry.paymentStatus === 'Paid (₹199)'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {selectedInquiry.paymentStatus || 'No Payment (Redirected)'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Received on {new Date(selectedInquiry.createdAt).toLocaleString()} via {selectedInquiry.source}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(
                    selectedInquiry.fullName
                  )}, this is Saikiran from Prime Funds Solutions regarding your inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Pipeline Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Update Lead Pipeline Status
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {STATUS_OPTIONS.map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedInquiry.status === st
                          ? 'bg-[#12245C] text-white shadow-md'
                          : 'bg-slate-100 dark:bg-[#0B1220] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Customer Contact</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">📱 {selectedInquiry.phone}</div>
                  {selectedInquiry.email && (
                    <div className="text-slate-600 dark:text-slate-300">✉️ {selectedInquiry.email}</div>
                  )}
                  <div className="text-slate-500">📍 City: {selectedInquiry.city || 'Telangana'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Enquired Product / Service</span>
                  <div className="font-bold text-[#F5822C] text-sm">{selectedInquiry.itemTitle || selectedInquiry.serviceType}</div>
                  <div className="text-slate-500">Category: {selectedInquiry.itemCategory || selectedInquiry.serviceType}</div>
                  {selectedInquiry.loanAmount && (
                    <div className="text-slate-700 dark:text-slate-200">Budget / Amount: {selectedInquiry.loanAmount}</div>
                  )}
                </div>
              </div>

              {selectedInquiry.message && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Client Message / Requirement</span>
                  <p className="text-slate-700 dark:text-slate-300 italic text-xs leading-relaxed">
                    "{selectedInquiry.message}"
                  </p>
                </div>
              )}

              {/* Internal Notes Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                  Advisor Internal Notes & Follow-up Log
                </label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={e => setNotesInput(e.target.value)}
                  placeholder="Record bank file processing details, site visit date, customer discussion..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
                />
                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.fullName)}
                    className="text-xs text-rose-500 hover:underline font-semibold"
                  >
                    Delete This Inquiry
                  </button>
                  <button
                    onClick={() => handleSaveNotes(selectedInquiry.id)}
                    className="px-5 py-2 rounded-xl bg-[#12245C] hover:bg-[#1d3580] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {addLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5822C]" />
                <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                  Add Walk-in or Direct Customer Lead
                </h3>
              </div>
              <button
                onClick={() => setAddLeadOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Reddy"
                    value={newLeadForm.fullName}
                    onChange={e => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98480 12345"
                    value={newLeadForm.phone}
                    onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={newLeadForm.paymentStatus}
                    onChange={e => setNewLeadForm({ ...newLeadForm, paymentStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  >
                    <option value="Paid (₹199)">Paid (₹199) - Online Form</option>
                    <option value="No Payment (Redirected)">No Payment (Redirected to WhatsApp / Call)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Product / Service Category
                  </label>
                  <select
                    value={newLeadForm.itemCategory}
                    onChange={e => setNewLeadForm({ ...newLeadForm, itemCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  >
                    <option value="Loan Product">Loan Product</option>
                    <option value="Real Estate Property">Real Estate Property</option>
                    <option value="Insurance Plan">Insurance Plan</option>
                    <option value="Financial Service">Financial Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enquired Item / Loan Type
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.itemTitle}
                    onChange={e => setNewLeadForm({ ...newLeadForm, itemTitle: e.target.value, serviceType: e.target.value })}
                    placeholder="e.g. Home Loan or KUDA Plots"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Required Amount / Budget
                  </label>
                  <input
                    type="text"
                    placeholder="₹50,00,000"
                    value={newLeadForm.loanAmount}
                    onChange={e => setNewLeadForm({ ...newLeadForm, loanAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.city}
                    onChange={e => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Internal Advisor Notes
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.adminNotes}
                  onChange={e => setNewLeadForm({ ...newLeadForm, adminNotes: e.target.value })}
                  placeholder="Record initial discussion details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddLeadOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
