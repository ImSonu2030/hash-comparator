import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { LoadingSpinner } from './LoadingSpinner'

export const Result = () => {
  const { hashValues, isHashGeneratorRunning } = useContext(AppContext);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Results
      </h2>

      {isHashGeneratorRunning && <LoadingSpinner />}
      {!isHashGeneratorRunning && (!hashValues || hashValues.length === 0) && (
        <p className="text-center text-gray-500">
          Submit an input to see the hash results here.
        </p>
      )}

      <AnimatePresence>
        {!isHashGeneratorRunning && hashValues && hashValues.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hashValues.map((hashObj, index) => (
              <motion.div
                key={hashObj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white shadow-md rounded-md p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                    {hashObj.id}
                  </h3>

                  {hashObj.values.map((value, i) => (
                    <div key={i} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Input {i + 1}:
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-2 text-sm font-medium text-gray-800 break-all select-all">
                        {value || '—'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time section */}
                <div className="mt-4 text-sm bg-green-500 rounded-sm px-2 py-1 text-gray-800 border-t border-gray-200 pt-2">
                  <span className="font-medium text-black">Time:</span>{' '}
                  {hashObj.times ? `${hashObj.times.toFixed(2)} ms` : '0'}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
