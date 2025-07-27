import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { StepFunctionsService } from '../services/stepFunctionsService';

const WorkflowMonitor = ({ executionArn, onStatusChange }) => {
  const [execution, setExecution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (executionArn) {
      fetchExecutionStatus();
      const interval = setInterval(fetchExecutionStatus, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [executionArn]);

  const fetchExecutionStatus = async () => {
    try {
      const result = await StepFunctionsService.getExecutionStatus(executionArn);
      if (result.success) {
        setExecution(result);
        if (onStatusChange) {
          onStatusChange(result.status);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch execution status');
    } finally {
      setLoading(false);
    }
  };

  const handleStopExecution = async () => {
    try {
      const result = await StepFunctionsService.stopExecution(executionArn);
      if (result.success) {
        fetchExecutionStatus();
      }
    } catch (err) {
      setError('Failed to stop execution');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RUNNING':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'SUCCEEDED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'TIMED_OUT':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ABORTED':
        return <Pause className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800';
      case 'SUCCEEDED':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'TIMED_OUT':
        return 'bg-orange-100 text-orange-800';
      case 'ABORTED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center text-red-600">
          <XCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!execution) {
    return null;
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Workflow Status</h3>
        {execution.status === 'RUNNING' && (
          <button
            onClick={handleStopExecution}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Stop
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getStatusIcon(execution.status)}
            <span className="ml-2 font-medium text-slate-700">Status</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(execution.status)}`}>
            {execution.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Started:</span>
            <div className="font-medium text-slate-700">
              {new Date(execution.startDate).toLocaleString()}
            </div>
          </div>
          {execution.stopDate && (
            <div>
              <span className="text-slate-500">Completed:</span>
              <div className="font-medium text-slate-700">
                {new Date(execution.stopDate).toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {execution.output && (
          <div className="mt-4">
            <span className="text-slate-500 text-sm">Output:</span>
            <div className="mt-2 bg-slate-50 rounded-lg p-3">
              <pre className="text-xs text-slate-700 overflow-x-auto">
                {JSON.stringify(execution.output, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {execution.status === 'RUNNING' && (
          <div className="mt-4">
            <div className="flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
              <span className="text-sm">Processing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowMonitor;