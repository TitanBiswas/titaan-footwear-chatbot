import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [tab, setTab] = useState<'men' | 'women' | 'kids'>('men');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { uk: '6', us: '7', eu: '40', cm: '24.5' },
    { uk: '7', us: '8', eu: '41', cm: '25.4' },
    { uk: '8', us: '9', eu: '42', cm: '26.0' },
    { uk: '9', us: '10', eu: '43', cm: '27.0' },
    { uk: '10', us: '11', eu: '44', cm: '27.9' },
    { uk: '11', us: '12', eu: '45', cm: '28.6' },
    { uk: '12', us: '13', eu: '46', cm: '29.4' }
  ];

  const womenSizes = [
    { uk: '3', eu: '36', us: '5', cm: '22.0' },
    { uk: '4', eu: '37', us: '6', cm: '22.9' },
    { uk: '5', eu: '38', us: '7', cm: '23.7' },
    { uk: '6', eu: '39', us: '8', cm: '24.6' },
    { uk: '7', eu: '40', us: '9', cm: '25.4' },
    { uk: '8', eu: '41', us: '10', cm: '26.2' }
  ];

  const kidsSizes = [
    { uk: '10', eu: '28', cm: '16.5', age: '3-4 Yrs' },
    { uk: '11', eu: '29', cm: '17.3', age: '4-5 Yrs' },
    { uk: '12', eu: '30', cm: '18.1', age: '5-6 Yrs' },
    { uk: '13', eu: '31', cm: '19.0', age: '6-7 Yrs' },
    { uk: '1', eu: '32', cm: '19.8', age: '7-8 Yrs' },
    { uk: '2', eu: '33', cm: '20.6', age: '8-9 Yrs' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
      >
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-lg">Footwear Size Guide</h3>
              <p className="text-xs text-neutral-500">Titaan & Metro standard UK / Indian sizing conversion</p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Tab Selector */}
          <div className="flex bg-neutral-100 p-1 rounded-xl">
            <button
              onClick={() => setTab('men')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'men' ? 'bg-white text-red-600 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Men's Footwear
            </button>
            <button
              onClick={() => setTab('women')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'women' ? 'bg-white text-red-600 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Women's Footwear
            </button>
            <button
              onClick={() => setTab('kids')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'kids' ? 'bg-white text-red-600 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Kids / Junior
            </button>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-neutral-900 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">UK / IND</th>
                  <th className="p-3">{tab === 'kids' ? 'Age' : 'US Size'}</th>
                  <th className="p-3">EU Size</th>
                  <th className="p-3">Length (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
                {tab === 'men' &&
                  menSizes.map((row) => (
                    <tr key={row.uk} className="hover:bg-neutral-50">
                      <td className="p-3 font-bold text-red-600">UK {row.uk}</td>
                      <td className="p-3">{row.us}</td>
                      <td className="p-3">{row.eu}</td>
                      <td className="p-3">{row.cm} cm</td>
                    </tr>
                  ))}

                {tab === 'women' &&
                  womenSizes.map((row) => (
                    <tr key={row.uk} className="hover:bg-neutral-50">
                      <td className="p-3 font-bold text-red-600">UK {row.uk}</td>
                      <td className="p-3">{row.us}</td>
                      <td className="p-3">{row.eu}</td>
                      <td className="p-3">{row.cm} cm</td>
                    </tr>
                  ))}

                {tab === 'kids' &&
                  kidsSizes.map((row) => (
                    <tr key={row.uk} className="hover:bg-neutral-50">
                      <td className="p-3 font-bold text-red-600">UK {row.uk}</td>
                      <td className="p-3">{row.age}</td>
                      <td className="p-3">{row.eu}</td>
                      <td className="p-3">{row.cm} cm</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-950">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
              <HelpCircle className="w-4 h-4" /> How to Measure Your Foot Length:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-amber-900/80">
              <li>Place a sheet of paper on the floor against a wall.</li>
              <li>Stand with your heel touching the wall and mark your longest toe with a pencil.</li>
              <li>Measure the distance from the wall to the pencil mark in centimeters (CM).</li>
              <li>Compare with the table above. If between two sizes, choose the larger size.</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
