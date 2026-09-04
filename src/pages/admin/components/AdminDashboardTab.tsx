import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { PageId } from '../../../types';
import {
  Building2,
  Coins,
  Shield,
  Users,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Clock,
  ExternalLink,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface AdminDashboardTabProps {
  onSelectTab: (tab: string) => void;
  onNavigateToStorefront: (page: PageId) => void;
  onOpenAddProperty: () => void;
  onOpenAddLoan: () => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  onSelectTab,
  onNavigateToStorefront,
  onOpenAddProperty,
  onOpenAddLoan
}) => {
  const { properties, loans, lifeInsurances, generalInsurances, inquiries, brandDetails } = useData();

  const totalInsurances = lifeInsurances.length + generalInsurances.length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const inProgressInquiriesCount = inquiries.filter(i => i.status === 'In Progress').length;
  const convertedInquiriesCount = inquiries.filter(i => i.status === 'Converted').length;

  const statCards = [
    {
      title: 'Listed Properties',
      value: properties.length,
      sub: 'Verified Real Estate Assets',
      icon: Building2,
      color: 'from-blue-600 to-indigo-600',
      tabKey: 'properties'
    },
    {
      title: 'Active Loan Products',
      value: loans.length,
      sub: 'Multi-Bank Facilitation Lines',
      icon: Coins,
      color: 'from-amber-500 to-orange-600',
      tabKey: 'loans'
    },
    {
      title: 'Insurance Plans',
      value: totalInsurances,
      sub: `${lifeInsurances.length} Life + ${generalInsurances.length} General`,
      icon: Shield,
      color: 'from-emerald-500 to-teal-600',
      tabKey: 'insurances'
    },
    {
      title: 'Customer Leads',
      value: inquiries.length,
      sub: `${newInquiriesCount} Pending Action`,
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      tabKey: 'leads'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12245C] via-[#1A2E6E] to-[#243A8C] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#F5822C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prime Funds Management Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {brandDetails.contactPerson || 'Saikiran'}!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Manage your real estate listings, loan packages, insurance plans, customer inquiries, and storefront branding with instant real-time synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddProperty}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/30 transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
            <button
              onClick={onOpenAddLoan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Loan Service</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#F5822C]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/2 -top-10 w-48 h-48 bg-[#3FB6D3]/15 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(stat.tabKey)}
              className="group bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs hover:shadow-lg hover:border-[#F5822C]/40 dark:hover:border-[#F5822C]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#12245C] dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{stat.sub}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#F5822C] transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upper Cards: Pipeline Summary & Real Estate Hub Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pipeline Summary Card */}
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 sm:p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F5822C]" />
                <span>Lead Pipeline Summary</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current status across active customer lead pipeline</p>
            </div>
            <button
              onClick={() => onSelectTab('leads')}
              className="text-xs font-bold text-[#F5822C] hover:underline flex items-center gap-1"
            >
              <span>Full CRM ({inquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-center">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 block mb-0.5">New Leads</span>
              <span className="text-xl font-extrabold text-rose-800 dark:text-rose-200">{newInquiriesCount}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-center">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 block mb-0.5">In Progress</span>
              <span className="text-xl font-extrabold text-amber-800 dark:text-amber-200">{inProgressInquiriesCount}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-center">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">Converted</span>
              <span className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200">{convertedInquiriesCount}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('leads')}
            className="w-full py-2.5 rounded-xl border border-[#F5822C]/40 text-[#F5822C] hover:bg-[#F5822C]/10 text-xs font-bold transition-all text-center cursor-pointer"
          >
            Open Full Leads CRM & Notes Editor →
          </button>
        </div>

        {/* Real Estate Hub Status Card */}
        <div className="bg-gradient-to-br from-[#12245C] to-[#0A132C] text-white rounded-2xl p-5 sm:p-6 border border-[#2A3550] shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F5822C]/20 text-[#F5822C] text-[11px] font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Real Estate Inventory</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              {properties.length} Active Real Estate Listings
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Serving verified assets across Karimnagar, Mancherial, Peddapalli, Siricilla, Siddipet, and Hanamkonda with instant buyer loan sanctioning.
            </p>
          </div>
          <div className="pt-1 flex gap-3">
            <button
              onClick={() => onSelectTab('properties')}
              className="flex-1 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Manage Properties
            </button>
            <button
              onClick={() => onNavigateToStorefront('realestate')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
              title="View Real Estate Page"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table: Recent Customer Inquiries */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-5 border-b border-[#E5E9F2] dark:border-[#2A3550] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60 dark:bg-[#0F1626]/80">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                Recent Customer Inquiries & Leads
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5822C]/15 text-[#F5822C] font-bold">
                {inquiries.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live tracking showing who submitted paid forms vs who clicked WhatsApp/Call buttons without payment.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectTab('leads')}
              className="px-3.5 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Open CRM Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No customer inquiries logged yet. Test by submitting a form or clicking WhatsApp on the website!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-100/70 dark:bg-[#0B1220]/70 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">What They Selected</th>
                  <th className="py-3.5 px-4">Payment & Lead Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9F2] dark:divide-[#2A3550]">
                {inquiries.slice(0, 6).map(inq => {
                  const isPaid = inq.paymentStatus === 'Paid (₹199)';
                  const category = inq.itemCategory || inq.serviceType;
                  const itemName = inq.itemTitle || inq.serviceType;

                  return (
                    <tr 
                      key={inq.id}
                      className="hover:bg-slate-50 dark:hover:bg-[#121B2E] transition-colors"
                    >
                      {/* 1. User Details */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-sm text-[#12245C] dark:text-white">
                          {inq.fullName}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{inq.phone}</span>
                        </div>
                        {inq.email && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[180px]">{inq.email}</span>
                          </div>
                        )}
                      </td>

                      {/* 2. What They Selected */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
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
                          </div>

                          <div className="font-semibold text-slate-800 dark:text-slate-100 text-xs">
                            {itemName}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            {inq.loanAmount && <span>Budget/Amount: <strong className="text-slate-600 dark:text-slate-300">{inq.loanAmount}</strong></span>}
                            {inq.city && <span>• City: {inq.city}</span>}
                          </div>
                        </div>
                      </td>

                      {/* 3. Payment & Lead Type */}
                      <td className="py-3.5 px-4 align-top">
                        {isPaid ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Paid (₹199)</span>
                            </span>
                            <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 pl-1">
                              Online Form Submission
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-extrabold text-[11px]">
                              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                              <span>No Payment</span>
                            </span>
                            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 pl-1">
                              {inq.leadChannel === 'Call' ? 'Redirected to Call' : 'Redirected to WhatsApp'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* 4. Pipeline Status */}
                      <td className="py-3.5 px-4 align-top">
                        <span
                          className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            inq.status === 'New'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                              : inq.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : inq.status === 'Converted'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>

                      {/* 5. Date */}
                      <td className="py-3.5 px-4 align-top text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* 6. Action */}
                      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(
                            inq.fullName
                          )}, this is Saikiran from Prime Funds Solutions regarding your inquiry about ${encodeURIComponent(
                            itemName
                          )}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                          title="Chat with client on WhatsApp"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
