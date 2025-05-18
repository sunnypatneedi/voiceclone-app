/**
 * Shared type definitions for the Voice Clone Application
 * These types are shared between frontend and backend components
 * @module shared-types
 */

/**
 * Represents the possible states of a voice sample in the system
 */
export enum VoiceSampleStatus {
  /** Sample has been uploaded but not yet processed */
  PENDING = 'pending',
  /** Sample is currently being processed by Cartesia */
  PROCESSING = 'processing',
  /** Sample has been successfully processed and is ready for cloning */
  READY = 'ready',
  /** Sample processing failed */
  FAILED = 'failed'
}

/**
 * Represents the possible states of a voice clone job
 */
export enum CloneJobStatus {
  /** Job has been created and is waiting to be processed */
  QUEUED = 'queued',
  /** Job has completed successfully */
  SUCCEEDED = 'succeeded',
  /** Job processing failed */
  FAILED = 'failed'
}

/**
 * Interface representing a voice sample in the system
 */
export interface VoiceSample {
  /** Unique identifier for the voice sample */
  id: string;
  /** Identifier of the user who uploaded the sample */
  userId: string;
  /** URL where the voice sample file is stored */
  fileUrl: string;
  /** Current processing status of the sample */
  status: VoiceSampleStatus;
  /** Timestamp when the sample was created */
  createdAt: string;
}

/**
 * Interface representing a voice clone job in the system
 */
export interface CloneJob {
  /** Unique identifier for the clone job */
  jobId: string;
  /** Reference to the voice sample used for cloning */
  sampleId: string;
  /** Text to be converted to speech using the cloned voice */
  inputText: string;
  /** URL to the generated audio file (available when job succeeds) */
  audioUrl?: string;
  /** Current status of the clone job */
  status: CloneJobStatus;
  /** Timestamp when the job was created */
  createdAt: string;
}

/**
 * Generic API response wrapper
 * @template T - The type of data returned in the response
 */
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;
  /** The data returned by the API (when success is true) */
  data?: T;
  /** Error message (when success is false) */
  error?: string;
}

/**
 * Response for voice sample creation endpoint
 */
export interface VoiceSampleCreationResponse {
  /** ID of the created voice sample */
  sampleId: string;
}

/**
 * Response for voice sample status endpoint
 */
export interface VoiceSampleStatusResponse {
  /** Current status of the voice sample */
  status: VoiceSampleStatus;
}

/**
 * Response for clone job creation endpoint
 */
export interface CloneJobCreationResponse {
  /** ID of the created clone job */
  jobId: string;
}

/**
 * Response for clone job status endpoint
 */
export interface CloneJobStatusResponse {
  /** Current status of the clone job */
  status: CloneJobStatus;
}

/**
 * Response for clone job result endpoint
 */
export interface CloneJobResultResponse {
  /** URL to the generated audio file */
  audioUrl: string;
}
