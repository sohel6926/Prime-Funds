import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { BRAND_DETAILS } from '../data/contentData';
import { WhatsAppIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  CalculatorBackgroundArt,
  ServicesBackgroundArt,
  ArchitecturalGridPattern,
  ContactBackgroundArt,
  DotGridPattern,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  PieChart,
  CheckCircle2
} from 'lucide-react';

interface CalculatorPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApply: (serviceName?: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigate, onOpenApply }) => {
  // EMI Calculator Inputs
  const [loanAmount, setLoanAmount] = useState<number>(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years

  // Expandable year in amortization
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  // Eligibility Checker Inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [existingEmis, setExistingEmis] = useState<number>(10000);
  const [eligibilityTenure, setEligibilityTenure] = useState<number>(20);
  const [eligibilityRate, setEligibilityRate] = useState<number>(8.5);

  // Formatting helpers
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  // EMI Math Calculation
  const { emi, totalInterest, totalPayable, principalPercent, interestPercent, schedule } =
    useMemo(() => {
      const P = loanAmount;
      const r = interestRate / 12 / 100;
      const n = tenureYears * 12;

      let monthlyEmi = 0;
      if (r > 0) {
        monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthlyEmi = P / n;
      }

      const totalPay = monthlyEmi * n;
      const totalInt = Math.max(0, totalPay - P);

      const pPercent = totalPay > 0 ? (P / totalPay) * 100 : 100;
      const iPercent = totalPay > 0 ? (totalInt / totalPay) * 100 : 0;

      // Amortization Schedule Calculation
      let currentBalance = P;
      const yearlySchedule: Array<{
        year: number;
        openingBalance: number;
        principalPaid: number;
        interestPaid: number;
        totalEmi: number;
        closingBalance: number;
        months: Array<{
          month: number;
          openingBalance: number;
          emi: number;
          principal: number;
          interest: number;
          closingBalance: number;
        }>;
      }> = [];

      let monthCounter = 1;
      for (let y = 1; y <= tenureYears; y++) {
        let yearPrincipal = 0;
        let yearInterest = 0;
        const yearOpening = currentBalance;
        const monthBreakdowns = [];

        for (let m = 1; m <= 12; m++) {
          if (currentBalance <= 0) break;
          const monthInterest = currentBalance * r;
          let monthPrincipal = monthlyEmi - monthInterest;
          if (monthPrincipal > currentBalance) {
            monthPrincipal = currentBalance;
          }
          const monthClosing = Math.max(0, currentBalance - monthPrincipal);

          monthBreakdowns.push({
            month: monthCounter++,
            openingBalance: currentBalance,
            emi: monthPrincipal + monthInterest,
            principal: monthPrincipal,
            interest: monthInterest,
            closingBalance: monthClosing
          });

          yearPrincipal += monthPrincipal;
          yearInterest += monthInterest;
          currentBalance = monthClosing;
        }

        yearlySchedule.push({
          year: y,
          openingBalance: yearOpening,
          principalPaid: yearPrincipal,
          interestPaid: yearInterest,
          totalEmi: yearPrincipal + yearInterest,
          closingBalance: currentBalance,
          months: monthBreakdowns
        });
      }

      return {
        emi: monthlyEmi,
        totalInterest: totalInt,
        totalPayable: totalPay,
        principalPercent: pPercent,
        interestPercent: iPercent,
        schedule: yearlySchedule
      };
    }, [loanAmount, interestRate, tenureYears]);

  // Eligibility Calculation
  const { maxEligibleLoan, disposableEmi } = useMemo(() => {
    // 50% FOIR (Fixed Obligation to Income Ratio)
    const maxAllowedEmi = monthlyIncome * 0.5;
    const disposable = Math.max(0, maxAllowedEmi - existingEmis);
    const r = eligibilityRate / 12 / 100;
    const n = eligibilityTenure * 12;

    let maxLoan = 0;
    if (disposable > 0 && r > 0) {
      maxLoan = (disposable * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    return {
      maxEligibleLoan: maxLoan,
      disposableEmi: disposable
    };
  }, [monthlyIncome, existingEmis, eligibilityTenure, eligibilityRate]);

  // Donut SVG circumference calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <div className="w-full">
      {/* 1. Page Header & Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-14 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <CalculatorBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold shadow-sm backdrop-blur-sm">
                <Calculator className="w-3.5 h-3.5" />
                <span>Real-Time Repayment Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
                <TypewriterHeading
                  phrases={[
                    "Interactive Loan EMI & Eligibility Calculator",
                    "Accurate Repayment Forecasts for All Indian Banks",
                    "Check Your Maximum Borrowing Power Instantly"
                  ]}
                  highlightWords={['EMI & Eligibility Calculator', 'All Indian Banks', 'Borrowing Power Instantly']}
                  highlightClassName="text-[#F5822C]"
                  typingSpeed={45}
                  deletingSpeed={25}
                  pauseDuration={2800}
                />
              </h1>
              {/* One short sentence */}
              <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                Estimate your monthly repayments, view detailed year-by-year amortization schedules, and check your maximum borrowing power instantly.
              </p>
            </div>

            {/* Supporting Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#151E32]">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                  alt="Loan Planning and Calculator"
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12245C]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                  Accurate amortization calculations customized for all Indian bank interest benchmarks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main EMI Calculator Section */}
      <section
        id="emi-calculator"
        className="py-14 bg-white dark:bg-[#0B1220] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      >
        <CalculatorBackgroundArt />
        <DotGridPattern size={1.5} gap={32} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-30 dark:opacity-20" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-8 bg-slate-50/95 dark:bg-[#151E32]/95 p-6 sm:p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-md md:hover:shadow-2xl md:hover:border-[#F5822C]/70 md:dark:hover:border-[#F5822C]/70 transition-all duration-300">
              <h3 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#F5822C]" />
                Loan Parameters
              </h3>

              {/* Slider 1: Loan Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Loan Amount (₹)
                  </label>
                  <div className="flex items-center border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#12245C] dark:text-[#4FC3E0]">
                    <span>₹</span>
                    <input
                      type="number"
                      min={50000}
                      max={50000000}
                      step={50000}
                      value={loanAmount}
                      onChange={e => setLoanAmount(Number(e.target.value) || 50000)}
                      className="w-28 text-right bg-transparent focus:outline-none ml-1 font-bold"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={20000000}
                  step={50000}
                  value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F5822C]"
                />
                <div className="flex justify-between text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">
                  <span>₹50,000</span>
                  <span>₹1 Crore</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Interest Rate (% per annum)
                  </label>
                  <div className="flex items-center border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#12245C] dark:text-[#4FC3E0]">
                    <input
                      type="number"
                      min={6}
                      max={25}
                      step={0.1}
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value) || 6)}
                      className="w-16 text-right bg-transparent focus:outline-none mr-1 font-bold"
                    />
                    <span>%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={6}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F5822C]"
                />
                <div className="flex justify-between text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">
                  <span>6% (Govt / Subsidized)</span>
                  <span>8.5% (Home Avg)</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Slider 3: Tenure */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Loan Tenure (Years)
                  </label>
                  <div className="flex items-center border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#12245C] dark:text-[#4FC3E0]">
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={tenureYears}
                      onChange={e => setTenureYears(Number(e.target.value) || 1)}
                      className="w-12 text-right bg-transparent focus:outline-none mr-1 font-bold"
                    />
                    <span>Years</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={tenureYears}
                  onChange={e => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F5822C]"
                />
                <div className="flex justify-between text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Right Outputs + Donut Chart (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Calculated Summary Card */}
              <div className="p-6 rounded-2xl bg-[#12245C] dark:bg-[#151E32] text-white shadow-xl border-2 border-[#2A3550] hover:border-[#3FB6D3]/60 dark:hover:border-[#4FC3E0]/60 hover:shadow-2xl hover:shadow-[#3FB6D3]/15 transition-all duration-300 space-y-6">
                <div>
                  <div className="text-xs font-semibold text-[#4FC3E0] uppercase tracking-wider">
                    Monthly Equated Installment
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F5822C] mt-1">
                    {formatINR(emi)} <span className="text-xs text-slate-300 font-normal">/ month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-xs text-slate-300">Principal Amount</div>
                    <div className="text-base font-bold text-white mt-0.5">{formatINR(loanAmount)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">Total Interest Payable</div>
                    <div className="text-base font-bold text-[#4FC3E0] mt-0.5">{formatINR(totalInterest)}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Total Amount Payable:</span>
                  <span className="text-lg font-extrabold text-white">{formatINR(totalPayable)}</span>
                </div>

                {/* Donut Chart: Principal vs Interest */}
                <div className="pt-4 border-t border-slate-700 flex flex-col items-center">
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                      {/* Principal Arc */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#F5822C"
                        strokeWidth="20"
                        fill="transparent"
                        strokeDasharray={`${principalStroke} ${circumference}`}
                        className="transition-all duration-300"
                      />
                      {/* Interest Arc */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#3FB6D3"
                        strokeWidth="20"
                        fill="transparent"
                        strokeDasharray={`${interestStroke} ${circumference}`}
                        strokeDashoffset={-principalStroke}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-[10px] text-slate-400">Principal</span>
                      <span className="text-xs font-bold text-white">{principalPercent.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#F5822C]"></span>
                      <span className="text-slate-200">Principal ({principalPercent.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#3FB6D3]"></span>
                      <span className="text-slate-200">Interest ({interestPercent.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onOpenApply(`Loan Calculation: ${formatINR(loanAmount)}`)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Apply for this EMI Amount</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Amortization Schedule (Year-by-Year expandable to Monthly) */}
      <section className="py-14 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#12245C] dark:text-white">
                Detailed Amortization Schedule
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                Click any year to expand and inspect the exact 12-month balance and interest breakdown.
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-[#151E32] border border-[#E5E9F2] dark:border-[#2A3550] text-[#12245C] dark:text-[#4FC3E0]">
              Total Loan Period: {tenureYears} Years ({tenureYears * 12} Months)
            </div>
          </div>

          <div className="bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-[#12245C] dark:text-white border-b border-[#E5E9F2] dark:border-[#2A3550] font-bold">
                    <th className="p-3.5 sm:p-4">Period</th>
                    <th className="p-3.5 sm:p-4">Opening Balance</th>
                    <th className="p-3.5 sm:p-4">EMI Paid</th>
                    <th className="p-3.5 sm:p-4 text-emerald-600 dark:text-emerald-400">Principal Paid</th>
                    <th className="p-3.5 sm:p-4 text-[#F5822C]">Interest Paid</th>
                    <th className="p-3.5 sm:p-4">Closing Balance</th>
                    <th className="p-3.5 sm:p-4 text-center">Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9F2] dark:divide-[#2A3550]">
                  {schedule.map(row => {
                    const isExpanded = expandedYear === row.year;
                    return (
                      <React.Fragment key={row.year}>
                        <tr
                          onClick={() => setExpandedYear(isExpanded ? null : row.year)}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer font-medium transition-colors"
                        >
                          <td className="p-3.5 sm:p-4 font-bold text-[#12245C] dark:text-white">
                            Year {row.year}
                          </td>
                          <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                            {formatINR(row.openingBalance)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                            {formatINR(row.totalEmi)}
                          </td>
                          <td className="p-3.5 sm:p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatINR(row.principalPaid)}
                          </td>
                          <td className="p-3.5 sm:p-4 font-semibold text-[#F5822C]">
                            {formatINR(row.interestPaid)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                            {formatINR(row.closingBalance)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Monthly Rows */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={7} className="p-0 bg-slate-50/70 dark:bg-slate-900/60">
                              <div className="p-4 overflow-x-auto">
                                <div className="text-[11px] font-bold text-[#F5822C] mb-2 uppercase tracking-wider">
                                  Month-By-Month Breakdown for Year {row.year}
                                </div>
                                <table className="w-full text-left text-[11px]">
                                  <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                      <th className="py-1.5 px-2">Month</th>
                                      <th className="py-1.5 px-2">Opening</th>
                                      <th className="py-1.5 px-2">Monthly EMI</th>
                                      <th className="py-1.5 px-2 text-emerald-600">Principal</th>
                                      <th className="py-1.5 px-2 text-[#F5822C]">Interest</th>
                                      <th className="py-1.5 px-2">Closing</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
                                    {row.months.map(m => (
                                      <tr key={m.month} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40">
                                        <td className="py-1.5 px-2 font-semibold">Month {m.month}</td>
                                        <td className="py-1.5 px-2 text-slate-600 dark:text-slate-400">{formatINR(m.openingBalance)}</td>
                                        <td className="py-1.5 px-2 font-medium">{formatINR(m.emi)}</td>
                                        <td className="py-1.5 px-2 text-emerald-600 dark:text-emerald-400">{formatINR(m.principal)}</td>
                                        <td className="py-1.5 px-2 text-[#F5822C]">{formatINR(m.interest)}</td>
                                        <td className="py-1.5 px-2 text-slate-600 dark:text-slate-400">{formatINR(m.closingBalance)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Eligibility Checker */}
      <section className="py-14 bg-white dark:bg-[#0B1220] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <ServicesBackgroundArt />
        <DotGridPattern size={1.5} gap={32} maskRadial />
        <GlowAura position="center" variant="mixed" opacity="opacity-25 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Instant Loan Eligibility Estimator
            </h3>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
              Check your potential borrowing capacity based on your current earnings and ongoing financial liabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 dark:bg-[#151E32] p-6 sm:p-8 rounded-3xl border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm">
            {/* Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Net Monthly In-Hand Income (₹)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm font-bold text-[#12245C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Existing Monthly EMIs / Liabilities (₹)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={existingEmis}
                  onChange={e => setExistingEmis(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm font-bold text-[#12245C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Desired Tenure (Years)
                  </label>
                  <select
                    value={eligibilityTenure}
                    onChange={e => setEligibilityTenure(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value={5}>5 Years</option>
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Expected Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={eligibilityRate}
                    onChange={e => setEligibilityRate(Number(e.target.value) || 8.5)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-xs font-bold text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Eligibility Output Card */}
            <div className="lg:col-span-5 bg-[#12245C] dark:bg-[#0F1626] rounded-2xl p-6 text-white flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-bold text-[#4FC3E0] uppercase tracking-wider">
                  Estimated Maximum Loan Eligibility
                </div>
                <div className="text-3xl font-extrabold text-[#F5822C] mt-2">
                  {formatINR(maxEligibleLoan)}
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  Estimated Available Monthly EMI Capacity: <strong>{formatINR(disposableEmi)}</strong>
                </div>
              </div>

              {/* One-Line Disclaimer sentence */}
              <div className="p-3 rounded-xl bg-white/10 text-[11px] text-slate-300 flex items-start gap-2 leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Eligibility is indicative and subject to individual bank credit assessment and credit bureau clearance.</span>
              </div>

              <button
                onClick={() => onOpenApply(`Eligible Loan: ${formatINR(maxEligibleLoan)}`)}
                className="w-full py-3 px-4 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Apply for Pre-Approved Limit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA (Apply Now / WhatsApp) */}
      <section className="py-14 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <ContactBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="center" variant="mixed" opacity="opacity-30 dark:opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h3 className="text-2xl font-extrabold text-[#12245C] dark:text-white">
            Need Expert Help Negotiating Your Loan Interest Rate?
          </h3>
          <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-xl mx-auto leading-relaxed">
            Our facilitator Saikiran.V works directly with bank branch managers to secure the lowest possible rates and fee waivers for your loan.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenApply()}
              className="px-6 py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              Apply Online
            </button>
            <a
              href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I calculated my loan EMI and would like to discuss my application.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <WhatsAppIcon size={16} />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
