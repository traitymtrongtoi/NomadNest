import React, { useState } from 'react';
import { User } from '../../types';

interface HostRevenueScreenProps {
  currentUser?: User | null;
  onBack: () => void;
}

interface TransactionItem {
  id: string;
  guestName: string;
  source: 'Homestay' | 'Workshop Làng nghề' | 'Dịch vụ địa phương';
  date: string;
  amount: number;
  amountFormatted: string;
  status: 'completed' | 'processing';
}

export const HostRevenueScreen: React.FC<HostRevenueScreenProps> = ({
  currentUser,
  onBack
}) => {
  const [activePeriod, setActivePeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const transactions: TransactionItem[] = [
    {
      id: 'tx_01',
      guestName: 'Alex Rivera (USA)',
      source: 'Homestay',
      date: '10/08/2026',
      amount: 2400000,
      amountFormatted: '+2.400.000 VNĐ',
      status: 'completed'
    },
    {
      id: 'tx_02',
      guestName: 'Sarah Jenkins (UK)',
      source: 'Workshop Làng nghề',
      date: '09/08/2026',
      amount: 650000,
      amountFormatted: '+650.000 VNĐ',
      status: 'completed'
    },
    {
      id: 'tx_03',
      guestName: 'Liam Walker (Australia)',
      source: 'Homestay',
      date: '05/08/2026',
      amount: 4200000,
      amountFormatted: '+4.200.000 VNĐ',
      status: 'completed'
    },
    {
      id: 'tx_04',
      guestName: 'Minh Tuấn (VN)',
      source: 'Dịch vụ địa phương',
      date: '02/08/2026',
      amount: 350000,
      amountFormatted: '+350.000 VNĐ',
      status: 'completed'
    },
    {
      id: 'tx_05',
      guestName: 'Elena Rostova (Germany)',
      source: 'Homestay',
      date: '28/07/2026',
      amount: 3800000,
      amountFormatted: '+3.800.000 VNĐ',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-32 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-extrabold text-base text-white">Quản lý Doanh thu & Tài chính</h1>
        <button
          onClick={() => alert('Đang tải xuống báo cáo sao kê doanh thu PDF...')}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          title="Xuất sao kê"
        >
          <span className="material-symbols-outlined text-xl">download</span>
        </button>
      </header>

      <main className="pt-20 px-4 sm:px-6 max-w-3xl mx-auto space-y-5">
        {/* Main Revenue Card */}
        <div className="bg-gradient-to-br from-emerald-900/60 via-[#002b1e] to-teal-950/80 border border-emerald-400/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Tổng thu nhập Tháng 8/2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              +18.4% tăng trưởng
            </span>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              58.800.000 <span className="text-xl font-bold text-emerald-300">VNĐ</span>
            </div>
            <p className="text-xs text-white/70 mt-1">
              Đã bao gồm doanh thu phòng lưu trú & workshop văn hóa làng nghề
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
              <span className="text-[10px] text-white/60 block">Doanh thu phòng Homestay</span>
              <span className="text-sm font-black text-white mt-0.5 block">46.500.000 VNĐ</span>
            </div>
            <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
              <span className="text-[10px] text-white/60 block">Workshop & Trải nghiệm</span>
              <span className="text-sm font-black text-amber-300 mt-0.5 block">12.300.000 VNĐ</span>
            </div>
          </div>
        </div>

        {/* Bank Account & Payout Status */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">account_balance</span>
              Tài khoản nhận chi trả tự động
            </h2>
            <button
              onClick={() => alert('Đang mở cài đặt chỉnh sửa tài khoản ngân hàng...')}
              className="text-xs text-emerald-300 hover:text-white underline cursor-pointer"
            >
              Thay đổi
            </button>
          </div>

          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xs border border-emerald-400/30">
                VCB
              </div>
              <div>
                <span className="font-bold text-sm text-white">Vietcombank - CN Đà Nẵng</span>
                <p className="text-xs text-white/60">Số TK: **** **** 8829 (Chủ TK: NGUYEN THI MAI)</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Đã xác thực
            </span>
          </div>

          <p className="text-[11px] text-white/50 italic">
            * Hệ thống tự động quyết toán vào ngày 05 và 20 hàng tháng về tài khoản ngân hàng đã đăng ký.
          </p>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-400">receipt_long</span>
              Lịch sử giao dịch gần đây
            </h3>
            <span className="text-[11px] text-white/60">5 giao dịch mới nhất</span>
          </div>

          <div className="space-y-2.5">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      {tx.source === 'Homestay' ? 'hotel' : tx.source === 'Workshop Làng nghề' ? 'palette' : 'storefront'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{tx.guestName}</h4>
                    <p className="text-xs text-white/60">{tx.source} • {tx.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-emerald-300 block">{tx.amountFormatted}</span>
                  <span className="text-[10px] text-emerald-400/80 font-semibold">Thành công</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
