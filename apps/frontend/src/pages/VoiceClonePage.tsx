import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  VoiceSampleStatus, 
  CloneJobStatus 
} from 'shared-types';
import VoiceUploader from '../components/voice-clone/VoiceUploader';
import ProcessingStatus from '../components/voice-clone/ProcessingStatus';
import TextInput from '../components/voice-clone/TextInput';
import AudioPlayer from '../components/voice-clone/AudioPlayer';
import ErrorDisplay from '../components/voice-clone/ErrorDisplay';

/**
 * VoiceClonePage - Main component for the voice cloning functionality
 * Manages the entire voice cloning flow from sample upload to playback
 * 
 * @returns {JSX.Element} The voice clone page
 */
const VoiceClonePage: React.FC = (): JSX.Element => {
  // Get URL parameters and navigation function
  const { sampleId } = useParams<{ sampleId: string }>();
  const navigate = useNavigate();
  
  // Access the global app context
  const { 
    currentSample, 
    currentJob, 
    isLoading: _isLoading, // Prefix with _ to indicate it's intentionally unused
    error, 
    setCurrentSample,
    setCurrentJob,
    setError
  } = useAppContext();

  // Local state for polling status - prefixed with _ to indicate they're intentionally unused
  const [_pollingSample, setPollingStatus] = useState<boolean>(false);
  const [_pollingJob, setPollingJob] = useState<boolean>(false);

  // If a sampleId is provided in the URL, fetch the sample on component mount
  useEffect(() => {
    if (sampleId && !currentSample) {
      fetchSample(sampleId);
    }
  }, [sampleId, currentSample]); // Add currentSample to dependency array

  /**
   * Fetch a voice sample by ID
   * @param sampleId The ID of the sample to fetch
   */
  const fetchSample = async (sampleId: string) => {
    // This would typically call an API service to fetch the sample
    console.log(`Fetching sample with ID: ${sampleId}`);
    // For now, we'll simulate fetching by setting a mock sample
    setCurrentSample({
      id: sampleId,
      userId: 'user123', // Add required userId
      fileUrl: `https://example.com/samples/${sampleId}.wav`, // Add required fileUrl
      status: VoiceSampleStatus.PROCESSING,
      createdAt: new Date().toISOString()
    });
    setPollingStatus(true);
    // In a real implementation, this would periodically call the API
    // to check the sample processing status until it's ready or failed
  };

  /**
   * Start polling for job status updates
   * @param jobId The ID of the job to poll for
   */
  const startJobPolling = (jobId: string) => {
    setPollingJob(true);
    // In a real implementation, this would periodically call the API
    // to check the job status until it's complete or failed
    console.log(`Starting job polling for job ID: ${jobId}`);
  };

  /**
   * Handle successful sample upload
   * @param sampleId The ID of the newly uploaded sample
   */
  const handleSampleUploaded = (sampleId: string) => {
    // Navigate to the sample-specific URL
    navigate(`/voice-clone/${sampleId}`, { replace: true });
    // In a real implementation, we would start polling for the sample status
    console.log(`Sample uploaded with ID: ${sampleId}`);
  };

  /**
   * Handle clone job creation
   * @param jobId The ID of the newly created job
   */
  const handleJobCreated = (jobId: string) => {
    setCurrentJob({
      jobId,
      sampleId: currentSample?.id || '',
      inputText: '',
      status: CloneJobStatus.QUEUED,
      createdAt: new Date().toISOString()
    });
    startJobPolling(jobId);
  };

  // Render different UI components based on the current state
  const renderContent = () => {
    // If there's an error, show the error display
    if (error) {
      return <ErrorDisplay error={error} onRetry={() => setError(null)} />;
    }

    // If no sample exists or it failed, show the uploader
    if (!currentSample || currentSample.status === VoiceSampleStatus.FAILED) {
      return <VoiceUploader onSampleUploaded={handleSampleUploaded} />;
    }

    // If sample is being processed, show processing status
    if (
      currentSample.status === VoiceSampleStatus.PENDING || 
      currentSample.status === VoiceSampleStatus.PROCESSING
    ) {
      return <ProcessingStatus status={currentSample.status} />;
    }

    // If sample is ready and no job exists, show text input
    if (
      currentSample.status === VoiceSampleStatus.READY && 
      (!currentJob || currentJob.status === CloneJobStatus.FAILED)
    ) {
      return (
        <TextInput 
          sampleId={currentSample.id} 
          onJobCreated={handleJobCreated} 
        />
      );
    }

    // If job is in progress, show processing status
    if (currentJob?.status === CloneJobStatus.QUEUED) {
      return <ProcessingStatus status="synthesis" />;
    }

    // If job succeeded, show audio player
    if (currentJob?.status === CloneJobStatus.SUCCEEDED && currentJob.audioUrl) {
      return <AudioPlayer audioUrl={currentJob.audioUrl} />;
    }

    // Fallback
    return <div>Something went wrong. Please try again.</div>;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Voice Clone</h1>
      <div className="card">
        {renderContent()}
      </div>
    </div>
  );
};

export default VoiceClonePage;
